import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}
  async checkSupplierName(name: string) {
    return await this.supplierRepository.exists({
      where: { supplierName: name },
    });
  }

  async create(createSupplierDto: CreateSupplierDto) {
    const checkName = await this.checkSupplierName(
      createSupplierDto.supplierName,
    );

    if (checkName) {
      throw new BadRequestException('Tên nhà cung cấp đã tồn tại');
    }

    return await this.supplierRepository.save(createSupplierDto);
  }

  findAll() {
    return this.supplierRepository.find();
  }

  async findID(id: number) {
    const findSupp = await this.supplierRepository.findOne({
      where: { supplierID: id },
      relations: ['importwarehouseID'],
    });

    if (!findSupp) {
      throw new NotFoundException('Không tìm thấy nhà cung cấp');
    }

    return findSupp;
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const findSupp = await this.findID(id);

    if (!findSupp) {
      throw new NotFoundException('Không tìm thấy nhà cung cấp');
    }

    if (
      updateSupplierDto.supplierName &&
      findSupp.supplierName != updateSupplierDto.supplierName
    ) {
      const isNameExist = await this.checkSupplierName(
        updateSupplierDto.supplierName,
      );

      if (isNameExist) {
        throw new BadRequestException(
          `Tên nhà cung cấp đã tồn tại bạn vui lòng cập nhật tên khác: ${updateSupplierDto.supplierName}`,
        );
      }
    }

    return await this.supplierRepository.save({
      ...findSupp,
      ...updateSupplierDto,
    });
  }

  async remove(id: number) {
    const findSup = await this.findID(id);
    return await this.supplierRepository.remove(findSup);
  }
}
