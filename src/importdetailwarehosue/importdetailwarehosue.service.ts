import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateImportdetailwarehosueDto } from './dto/create-importdetailwarehosue.dto';
import { UpdateImportdetailwarehosueDto } from './dto/update-importdetailwarehosue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Importdetailwarehosue } from './entities/importdetailwarehosue.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { ImportwarehouseService } from 'src/importwarehouse/importwarehouse.service';

@Injectable()
export class ImportdetailwarehosueService {
  constructor(
    @InjectRepository(Importdetailwarehosue)
    private importDetailRepository: Repository<Importdetailwarehosue>,
    private productsService: ProductsService,
    private importsService: ImportwarehouseService,
  ) {}

  async create(createImportdetailwarehosueDto: CreateImportdetailwarehosueDto) {
    const findImportID = await this.importsService.findID(
      +createImportdetailwarehosueDto.importID,
    );

    const findProID = await this.productsService.findID(
      +createImportdetailwarehosueDto.productID,
    );

    const createImportDetail = this.importDetailRepository.create({
      ...createImportdetailwarehosueDto,
      importID: findImportID,
      productID: findProID,
    });

    return await this.importDetailRepository.save(createImportDetail);
  }

  async findAll() {
    return await this.importDetailRepository.find();
  }

  async findID(id: number) {
    const findImportDetail = await this.importDetailRepository.findOne({
      where: { ImportDetailID: id },
    });

    if (!findImportDetail) {
      throw new BadGatewayException('không tìm thấy');
    }

    return findImportDetail;
  }

  async update(
    id: number,
    updateImportdetailwarehosueDto: UpdateImportdetailwarehosueDto,
  ) {
    const findImportDetail = await this.findID(id);

    let importID = findImportDetail.importID;

    // Kiểm tra nếu supplierID được cung cấp
    if (updateImportdetailwarehosueDto.importID) {
      importID = await this.importsService.findID(
        +updateImportdetailwarehosueDto.importID,
      );
    }

    let productID = findImportDetail.productID;
    if (updateImportdetailwarehosueDto.productID) {
      productID = await this.productsService.findID(
        +updateImportdetailwarehosueDto.productID,
      );
    }
    const updateImportDetail = await this.importDetailRepository.create({
      ...findImportDetail,
      quantity: updateImportdetailwarehosueDto.quantity,
      importPrice: updateImportdetailwarehosueDto.importPrice,
      importID: importID,
      productID: productID,
    });
    return await this.importDetailRepository.save(updateImportDetail);
  }

  async remove(id: number) {
    const importDetail = await this.findID(id);
    if (!importDetail) {
      throw new BadRequestException(`không tồn tại `);
    }
    const result = await this.importDetailRepository.remove(importDetail);
    return result;
  }
}
