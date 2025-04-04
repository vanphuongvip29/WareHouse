import { Injectable } from '@nestjs/common';
import { CreateExportwarehouseDto } from './dto/create-exportwarehouse.dto';
import { UpdateExportwarehouseDto } from './dto/update-exportwarehouse.dto';

@Injectable()
export class ExportwarehouseService {
  create(createExportwarehouseDto: CreateExportwarehouseDto) {
    return 'This action adds a new exportwarehouse';
  }

  findAll() {
    return `This action returns all exportwarehouse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exportwarehouse`;
  }

  update(id: number, updateExportwarehouseDto: UpdateExportwarehouseDto) {
    return `This action updates a #${id} exportwarehouse`;
  }

  remove(id: number) {
    return `This action removes a #${id} exportwarehouse`;
  }
}
