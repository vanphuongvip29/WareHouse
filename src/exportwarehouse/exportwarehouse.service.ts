import {
  BadGatewayException,
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateExportwarehouseDto,
  ExportWithDetails,
} from './dto/create-exportwarehouse.dto';
import {
  CkeckBanking,
  UpdateDtoExport,
  UpdateExportwarehouseDto,
} from './dto/update-exportwarehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ExportStatus,
  ExportWarehouse,
} from './entities/exportwarehouse.entity';
import { Repository } from 'typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { ProductsService } from 'src/products/products.service';
import { ExportDetailWarehouse } from 'src/exportdetailwarehouse/entities/exportdetailwarehouse.entity';
import { v4 as uuidv4 } from 'uuid';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class ExportwarehouseService {
  constructor(
    @InjectRepository(ExportWarehouse)
    private exportRepository: Repository<ExportWarehouse>,
    private customerService: CustomersService,
    private productService: ProductsService,
    @InjectRepository(ExportDetailWarehouse)
    private exportDetailWarehouseRepository: Repository<ExportDetailWarehouse>,

    private readonly eventsGateway: EventsGateway,
  ) {}

  async create(createExportwarehouseDto: CreateExportwarehouseDto) {
    const findCustomer = await this.customerService.findID(
      +createExportwarehouseDto.customerID,
    );
    const code = uuidv4();
    // 2. Loại bỏ các dấu gạch ngang
    const uuidWithoutHyphens = code.replace(/-/g, '');
    // Tạo đối tượng Product
    const createExport = await this.exportRepository.create({
      ...createExportwarehouseDto,
      code: uuidWithoutHyphens,
      customerID: findCustomer,
    });
    console.log('create Export code', createExport);
    return await this.exportRepository.save(createExport);
  }

  async findAll() {
    return await this.exportRepository.find({
      relations: ['customerID', 'exportDetailID', 'exportDetailID.productID'],
    });
  }

  async findID(id: number) {
    const findExp = await this.exportRepository.findOne({
      where: { exportID: id },
      relations: ['customerID'],
    });

    if (!findExp) {
      throw new NotFoundException('Không tìm thấy phiếu xuất');
    }
    return findExp;
  }

  async update(id: number, updateExportwarehouseDto: UpdateExportwarehouseDto) {
    const findExport = await this.findID(id);

    let cusID = findExport.customerID; // Giữ nguyên nhà cung cấp hiện tại nếu không có supplierID mới

    // Kiểm tra nếu supplierID được cung cấp
    if (updateExportwarehouseDto.customerID) {
      cusID = await this.customerService.findID(
        +updateExportwarehouseDto.customerID,
      );
    }

    const createExport = await this.exportRepository.create({
      ...findExport,
      exportDate: updateExportwarehouseDto.exportDate,
      totalAmount: updateExportwarehouseDto.totalAmount,
      customerID: cusID,
    });
    return await this.exportRepository.save(createExport);
  }

  async remove(id: number) {
    const exp = await this.findID(id);

    const result = await this.exportRepository.remove(exp);
    return { status: HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
  }

  async findExportDetail(id: number) {
    const findexport = await this.exportRepository.findOne({
      where: { exportID: id },
      relations: ['customerID', 'exportDetailID', 'exportDetailID.productID'],
    });

    if (!findexport) {
      throw new BadGatewayException('Không tìm thấy xuất kho');
    }

    return findexport;
  }

  async createExportWithDetail(exportWithDetails: ExportWithDetails) {
    const { exportData, exportDetails } = exportWithDetails;
    const queryRunner =
      this.exportRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const code = uuidv4();
    // 2. Loại bỏ các dấu gạch ngang
    const uuidWithoutHyphens = code.replace(/-/g, '');

    try {
      const customer = await this.customerService.findID(
        +exportData.customerID,
      );
      const exportWare = this.exportRepository.create({
        ...exportData,
        code: uuidWithoutHyphens,
        customerID: customer,
      });
      const saveExport = await queryRunner.manager.save(exportWare);
      const exportDetailsPromises = exportDetails.map(async (detail) => {
        const products = await this.productService.findID(detail.productID);
        const exportDetail = this.exportDetailWarehouseRepository.create({
          quantity: detail.quantity,
          salePrice: detail.salePrice,
          exportID: saveExport,
          productID: products,
        });
        return queryRunner.manager.save(exportDetail);
      });
      const allExportDetails = await Promise.all(exportDetailsPromises);
      await queryRunner.commitTransaction();
      return {
        message: 'Export warehouse and details created successfully',
        exportData: saveExport,
        exportDetails: allExportDetails,
      };
    } catch (error) {
      // Rollback transaction nếu có lỗi
      await queryRunner.rollbackTransaction();
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        'Failed to create import warehouse and details: ' + error.message,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async updateExportWithDetails(id: number, updateDtoExport: UpdateDtoExport) {
    const exportRecord = await this.exportRepository.findOne({
      where: { exportID: id },
      relations: ['exportDetailID'],
    });

    if (!exportRecord) throw new NotFoundException('Không tìm thấy phiếu xuất');

    exportRecord.customerID = { customerID: updateDtoExport.customerID } as any;
    exportRecord.totalAmount = updateDtoExport.totalAmount;
    exportRecord.exportDate = updateDtoExport.exportDate;

    // 2. Chuẩn bị danh sách các importDetailID từ client gửi lên
    const incomingDetailIDs = updateDtoExport.products
      .filter((p) => p.exportDetailID)
      .map((p) => p.exportDetailID);

    // 3. Xóa các chi tiết không còn trong danh sách mới
    const toDelete = exportRecord.exportDetailID.filter(
      (d) => !incomingDetailIDs.includes(d.exportDetailID),
    );
    for (const d of toDelete) {
      await this.exportDetailWarehouseRepository.delete(d.exportDetailID);
    }

    // 4. Xử lý cập nhật hoặc tạo mới
    const updatedDetails: ExportDetailWarehouse[] = [];

    for (const product of updateDtoExport.products) {
      if (product.exportDetailID) {
        // Cập nhật chi tiết đã tồn tại
        const existing = await this.exportDetailWarehouseRepository.findOneBy({
          exportDetailID: product.exportDetailID,
        });

        if (existing) {
          existing.quantity = product.quantity;
          existing.salePrice = product.salePrice;
          existing.productID = { productID: product.productID } as any;
          await this.exportDetailWarehouseRepository.save(existing);
          updatedDetails.push(existing);
        }
      } else {
        // Tạo chi tiết mới
        const newDetail = this.exportDetailWarehouseRepository.create({
          quantity: product.quantity,
          salePrice: product.salePrice,
          productID: { productID: product.productID } as any,
          exportID: { exportID: id },
        });
        await this.exportDetailWarehouseRepository.save(newDetail);
        updatedDetails.push(newDetail);
      }
    }
    exportRecord.exportDetailID = updatedDetails;
    await this.exportRepository.save(exportRecord);

    return { message: 'Cập nhật thành công' };
  }

  async deleteExportWithDetails(id: number) {
    // 1. Tìm phiếu nhập và các chi tiết liên quan
    const exportRecord = await this.exportRepository.findOne({
      where: { exportID: id },
      relations: ['exportDetailID'],
    });

    if (!exportRecord) throw new NotFoundException('Không tìm thấy phiếu nhập');

    // 2. Lấy danh sách chi tiết cần xóa
    const detailIDs = exportRecord.exportDetailID.map((d) => d.exportDetailID);

    // 3. Xóa chi tiết trước (nếu có)
    if (detailIDs.length > 0) {
      await this.exportDetailWarehouseRepository.delete(detailIDs);
    }

    // 4. Xóa phiếu nhập chính
    await this.exportRepository.delete(id);

    return { message: 'Xóa phiếu nhập và chi tiết thành công' };
  }

  async handleCheckBanking(amount: number, transactionContent: string) {
    const exportBank = await this.exportRepository.findOne({
      where: {
        totalAmount: amount,
        code: transactionContent,
      },
    });
    if (!exportBank) {
      throw new BadRequestException('Thông tin exportBank không tìm thấy');
    }
    const updateExport = await this.exportRepository.save({
      ...exportBank,
      status: ExportStatus.Paid,
    });

    this.eventsGateway.emitMysqlDataChanged({
      message: `Bạn đã thanh toán thành công : ${amount}!`,
      action: updateExport.status,
    });
    return updateExport;
  }

  async getDailyExportStats() {
    try {
      const result = await this.exportRepository
        .createQueryBuilder('exportwarehouse')
        .select("DATE_FORMAT(exportwarehouse.exportDate, '%Y-%m')", 'month')
        .addSelect('SUM(exportwarehouse.totalAmount)', 'total')
        .groupBy('month')
        .orderBy('month')
        .getRawMany();

      // console.log('Stats result:', result);
      // return result.map((row) => ({
      //   date: row.month,
      //   total: Number(row.total),
      // }));
      return result;
    } catch (error) {
      // Handle any potential errors here
      console.error('Error fetching total imports by date:', error);
      throw error;
    }
  }
}
