import { Injectable } from '@nestjs/common';
import { CreateImportwarehouseDto } from './dto/create-importwarehouse.dto';
import { UpdateImportwarehouseDto } from './dto/update-importwarehouse.dto';

@Injectable()
export class ImportwarehouseService {
  create(createImportwarehouseDto: CreateImportwarehouseDto) {
    return 'This action adds a new importwarehouse';
  }

  findAll() {
    return `This action returns all importwarehouse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} importwarehouse`;
  }

  update(id: number, updateImportwarehouseDto: UpdateImportwarehouseDto) {
    return `This action updates a #${id} importwarehouse`;
  }

  remove(id: number) {
    return `This action removes a #${id} importwarehouse`;
  }
}
