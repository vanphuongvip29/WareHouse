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
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    private readonly eventsGateway: EventsGateway,
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

    const savedSupplier = await this.supplierRepository.save(createSupplierDto);

    this.eventsGateway.emitMysqlDataChanged({
      message: 'Dữ liệu items đã thay đổi!',
      data: savedSupplier,
    });

    return savedSupplier;
  }

  findAll() {
    return this.supplierRepository.find();
  }

  async queryBuilder(alias: string) {
    return this.supplierRepository.createQueryBuilder(alias);
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

    const updateSupplier = await this.supplierRepository.save({
      ...findSupp,
      ...updateSupplierDto,
    });

    this.eventsGateway.emitMysqlDataChanged({
      message: `Dữ liệu nhà cung cấp ID ${id} đã thay đổi!`,
      id: id,
      action: updateSupplier,
    });

    return updateSupplier;
  }

  async remove(id: number) {
    const findSup = await this.findID(id);
    const deleted = await this.supplierRepository.remove(findSup);

    // Emit sự kiện sau khi xoá thành công
    this.eventsGateway.emitMysqlDataChanged({
      message: `Supplier ID ${id} đã bị xoá`,
      id,
      action: 'delete',
    });

    return deleted;
  }
}
