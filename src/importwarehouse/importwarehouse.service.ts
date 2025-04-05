import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateImportwarehouseDto } from './dto/create-importwarehouse.dto';
import { UpdateImportwarehouseDto } from './dto/update-importwarehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Importwarehouse } from './entities/importwarehouse.entity';
import { Repository } from 'typeorm';
import { SuppliersService } from 'src/suppliers/suppliers.service';

@Injectable()
export class ImportwarehouseService {
  constructor(
    @InjectRepository(Importwarehouse)
    private importRepository: Repository<Importwarehouse>,
    private suppliersService: SuppliersService,
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
    return await this.importRepository.find();
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

    if (!findImport) {
      throw new NotFoundException('Không tìm thấy tồn kho để cập nhật');
    }

    let supID = findImport.supplierID; // Giữ nguyên nhà cung cấp hiện tại nếu không có supplierID mới

    // Kiểm tra nếu supplierID được cung cấp
    if (updateImportwarehouseDto.supplierID) {
      supID = await this.suppliersService.findID(
        +updateImportwarehouseDto.supplierID,
      );

      if (!supID) {
        throw new BadRequestException(
          `nhà cung cấp with ID ${updateImportwarehouseDto.supplierID} does not exist`,
        );
      }
    }

    const createProduct = await this.importRepository.create({
      ...findImport,
      totalAmount: updateImportwarehouseDto.totalAmount,
      supplierID: supID,
    });

    return await this.importRepository.save(createProduct);
  }

  async remove(id: number) {
    const importWarehous = await this.findID(id);
    if (!importWarehous) {
      throw new BadRequestException(`nhập khô không tồn tại `);
    }
    const result = await this.importRepository.remove(importWarehous);
    return result;
  }
}
