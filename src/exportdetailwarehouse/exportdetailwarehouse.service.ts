import { Injectable } from '@nestjs/common';
import { CreateExportdetailwarehouseDto } from './dto/create-exportdetailwarehouse.dto';
import { UpdateExportdetailwarehouseDto } from './dto/update-exportdetailwarehouse.dto';

@Injectable()
export class ExportdetailwarehouseService {
  create(createExportdetailwarehouseDto: CreateExportdetailwarehouseDto) {
    return 'This action adds a new exportdetailwarehouse';
  }

  findAll() {
    return `This action returns all exportdetailwarehouse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exportdetailwarehouse`;
  }

  update(id: number, updateExportdetailwarehouseDto: UpdateExportdetailwarehouseDto) {
    return `This action updates a #${id} exportdetailwarehouse`;
  }

  remove(id: number) {
    return `This action removes a #${id} exportdetailwarehouse`;
  }
}
