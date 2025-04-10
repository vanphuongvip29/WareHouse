import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExportdetailwarehouseDto } from './dto/create-exportdetailwarehouse.dto';
import { UpdateExportdetailwarehouseDto } from './dto/update-exportdetailwarehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExportDetailWarehouse } from './entities/exportdetailwarehouse.entity';
import { Repository } from 'typeorm';
import { ExportwarehouseService } from 'src/exportwarehouse/exportwarehouse.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ExportdetailwarehouseService {
  constructor(
    @InjectRepository(ExportDetailWarehouse)
    private exportDetailRepository: Repository<ExportDetailWarehouse>,
    private exportService: ExportwarehouseService,
    private productsService: ProductsService,
  ) {}
  async create(createExportdetailwarehouseDto: CreateExportdetailwarehouseDto) {
    const findProID = await this.productsService.findID(
      +createExportdetailwarehouseDto.productID,
    );

    const findExportID = await this.exportService.findID(
      +createExportdetailwarehouseDto.exportID,
    );
    const createExportDetail = this.exportDetailRepository.create({
      ...createExportdetailwarehouseDto,
      exportID: findExportID,
      productID: findProID,
    });
    return await this.exportDetailRepository.save(createExportDetail);
  }

  async findAll() {
    return await this.exportDetailRepository.find();
  }

  async findID(id: number) {
    const findExpDetail = await this.exportDetailRepository.findOne({
      where: { exportDetailID: id },
    });

    if (!findExpDetail) {
      throw new NotFoundException('Không tìm thấy phiếu xuất chi tiết');
    }
    return findExpDetail;
  }

  async update(
    id: number,
    updateExportdetailwarehouseDto: UpdateExportdetailwarehouseDto,
  ) {
    const findExportDetail = await this.findID(id);
    let exportID = findExportDetail.exportID;

    // Kiểm tra nếu supplierID được cung cấp
    if (updateExportdetailwarehouseDto.exportID) {
      exportID = await this.exportService.findID(
        +updateExportdetailwarehouseDto.exportID,
      );
    }

    let productID = findExportDetail.productID;
    if (updateExportdetailwarehouseDto.productID) {
      productID = await this.productsService.findID(
        +updateExportdetailwarehouseDto.productID,
      );
    }

    const updateExxportDetail = await this.exportDetailRepository.create({
      ...findExportDetail,
      exportID: exportID,
      quantity: updateExportdetailwarehouseDto.quantity,
      salePrice: updateExportdetailwarehouseDto.salePrice,
      productID: productID,
    });

    return await this.exportDetailRepository.save(updateExxportDetail);
  }

  async remove(id: number) {
    const expDetail = await this.findID(id);
    const result = await this.exportDetailRepository.remove(expDetail);
    return { status: HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
  }
}
