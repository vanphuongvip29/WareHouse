import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateImportwarehouseDto,
  ImportWithDetails,
} from './dto/create-importwarehouse.dto';
import {
  UpdateDto,
  UpdateImportwarehouseDto,
} from './dto/update-importwarehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Importwarehouse } from './entities/importwarehouse.entity';
import { Repository } from 'typeorm';
import { SuppliersService } from 'src/suppliers/suppliers.service';
import { Product } from 'src/products/entities/product.entity';
import { Importdetailwarehosue } from 'src/importdetailwarehosue/entities/importdetailwarehosue.entity';

@Injectable()
export class ImportwarehouseService {
  constructor(
    @InjectRepository(Importwarehouse)
    private importRepository: Repository<Importwarehouse>,
    private suppliersService: SuppliersService,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Importdetailwarehosue)
    private importDetailWarehouseRepository: Repository<Importdetailwarehosue>,
  ) {}

  async create(createImportwarehouseDto: CreateImportwarehouseDto) {
    const findSupplier = await this.suppliersService.findID(
      +createImportwarehouseDto.supplierID,
    );

    // Tạo đối tượng Product
    const createImport = this.importRepository.create({
      ...createImportwarehouseDto,
      supplierID: findSupplier,
    });
    return await this.importRepository.save(createImport);
  }

  async findAll() {
    return await this.importRepository.find({
      relations: [
        'supplierID',
        'importDetailWarehosueID',
        'importDetailWarehosueID.productID',
      ],
    });
    // return await this.importRepository.find();
  }

  async findID(id: number) {
    const findSup = await this.importRepository.findOne({
      where: { importID: id },
      relations: ['supplierID'],
    });

    if (!findSup) {
      throw new BadGatewayException('không tìm thấy nhập kho');
    }

    return findSup;
  }

  async update(id: number, updateImportwarehouseDto: UpdateImportwarehouseDto) {
    const findImport = await this.findID(id);

    let supID = findImport.supplierID; // Giữ nguyên nhà cung cấp hiện tại nếu không có supplierID mới

    // Kiểm tra nếu supplierID được cung cấp
    if (updateImportwarehouseDto.supplierID) {
      supID = await this.suppliersService.findID(
        +updateImportwarehouseDto.supplierID,
      );
    }

    const createProduct = await this.importRepository.create({
      ...findImport,
      totalAmount: updateImportwarehouseDto.totalAmount,
      importDate: updateImportwarehouseDto.importDate,
      supplierID: supID,
    });

    return await this.importRepository.save(createProduct);
  }

  async remove(id: number) {
    const importWarehous = await this.findID(id);

    const result = await this.importRepository.remove(importWarehous);
    return result;
  }

  async findDetail(id: number) {
    const findSup = await this.importRepository.findOne({
      where: { importID: id },
      relations: [
        'supplierID',
        'importDetailWarehosueID',
        'importDetailWarehosueID.productID',
      ],
    });

    if (!findSup) {
      throw new BadGatewayException('không tìm thấy nhập kho');
    }

    return findSup;
  }

  async createImportWithDetails(importWithDetails: ImportWithDetails) {
    const { importData, importDetails } = importWithDetails;

    // Bắt đầu transaction để đảm bảo tính toàn vẹn dữ liệu
    const queryRunner =
      this.importRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Tạo phiếu nhập kho
      const supplier = await this.suppliersService.findID(
        +importData.supplierID,
      );

      if (!supplier) {
        throw new BadRequestException('Supplier not found');
      }
      const importWarehouse = this.importRepository.create({
        ...importData,
        supplierID: supplier,
      });

      const savedImportWarehouse =
        await queryRunner.manager.save(importWarehouse);

      // 2. Tạo chi tiết nhập kho
      const importDetailsPromises = importDetails.map(async (detail) => {
        // Find products

        const products = await this.productRepository.findOne({
          where: { productID: detail.productID },
        });

        if (!products) {
          throw new BadRequestException(`One or more products not found`);
        }
        const importDetail = this.importDetailWarehouseRepository.create({
          quantity: detail.quantity,
          importPrice: detail.importPrice,
          importID: savedImportWarehouse,
          productID: products,
        });
        return queryRunner.manager.save(importDetail);
      });
      const allImportDetails = await Promise.all(importDetailsPromises);

      // Commit transaction nếu mọi thứ thành công
      await queryRunner.commitTransaction();

      return {
        message: 'Import warehouse and details created successfully',
        importWarehouse: savedImportWarehouse,
        importDetails: allImportDetails,
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
      // Giải phóng query runner
      await queryRunner.release();
    }
  }

  async updateImportWithDetails(id: number, dto: UpdateDto) {
    const importRecord = await this.importRepository.findOne({
      where: { importID: id },
      relations: ['importDetailWarehosueID'],
    });

    if (!importRecord) throw new NotFoundException('Không tìm thấy phiếu nhập');

    // 1. Cập nhật thông tin phiếu nhập chính
    importRecord.supplierID = { supplierID: dto.supplierID } as any;
    importRecord.totalAmount = dto.totalAmount;
    importRecord.importDate = dto.importDate;

    // 2. Chuẩn bị danh sách các importDetailID từ client gửi lên
    const incomingDetailIDs = dto.products
      .filter((p) => p.importDetailID)
      .map((p) => p.importDetailID);

    // 3. Xóa các chi tiết không còn trong danh sách mới
    const toDelete = importRecord.importDetailWarehosueID.filter(
      (d) => !incomingDetailIDs.includes(d.importDetailID),
    );
    for (const d of toDelete) {
      await this.importDetailWarehouseRepository.delete(d.importDetailID);
    }

    // 4. Xử lý cập nhật hoặc tạo mới
    const updatedDetails: Importdetailwarehosue[] = [];

    for (const product of dto.products) {
      if (product.importDetailID) {
        // Cập nhật chi tiết đã tồn tại
        const existing = await this.importDetailWarehouseRepository.findOneBy({
          importDetailID: product.importDetailID,
        });

        if (existing) {
          existing.quantity = product.quantity;
          existing.importPrice = product.importPrice;
          existing.productID = { productID: product.productID } as any;
          await this.importDetailWarehouseRepository.save(existing);
          updatedDetails.push(existing);
        }
      } else {
        // Tạo chi tiết mới
        const newDetail = this.importDetailWarehouseRepository.create({
          quantity: product.quantity,
          importPrice: product.importPrice,
          productID: { productID: product.productID } as any,
          importID: { importID: id },
        });
        await this.importDetailWarehouseRepository.save(newDetail);
        updatedDetails.push(newDetail);
      }
    }

    importRecord.importDetailWarehosueID = updatedDetails;
    await this.importRepository.save(importRecord);

    return { message: 'Cập nhật thành công' };
  }

  async deleteImportWithDetails(id: number) {
    // 1. Tìm phiếu nhập và các chi tiết liên quan
    const importRecord = await this.importRepository.findOne({
      where: { importID: id },
      relations: ['importDetailWarehosueID'],
    });

    if (!importRecord) throw new NotFoundException('Không tìm thấy phiếu nhập');

    // 2. Lấy danh sách chi tiết cần xóa
    const detailIDs = importRecord.importDetailWarehosueID.map(
      (d) => d.importDetailID,
    );

    // 3. Xóa chi tiết trước (nếu có)
    if (detailIDs.length > 0) {
      await this.importDetailWarehouseRepository.delete(detailIDs);
    }

    // 4. Xóa phiếu nhập chính
    await this.importRepository.delete(id);

    return { message: 'Xóa phiếu nhập và chi tiết thành công' };
  }

  async getDailyImportStats() {
    // console.log('Call getDailyImportStats');
    try {
      const result = await this.importRepository
        .createQueryBuilder('importwarehouse')
        .select("DATE_FORMAT(importwarehouse.importDate, '%Y-%m')", 'month')
        .addSelect('SUM(importwarehouse.totalAmount)', 'total')
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
