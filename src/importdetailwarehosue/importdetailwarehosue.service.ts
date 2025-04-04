import { Injectable } from '@nestjs/common';
import { CreateImportdetailwarehosueDto } from './dto/create-importdetailwarehosue.dto';
import { UpdateImportdetailwarehosueDto } from './dto/update-importdetailwarehosue.dto';

@Injectable()
export class ImportdetailwarehosueService {
  create(createImportdetailwarehosueDto: CreateImportdetailwarehosueDto) {
    return 'This action adds a new importdetailwarehosue';
  }

  findAll() {
    return `This action returns all importdetailwarehosue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} importdetailwarehosue`;
  }

  update(id: number, updateImportdetailwarehosueDto: UpdateImportdetailwarehosueDto) {
    return `This action updates a #${id} importdetailwarehosue`;
  }

  remove(id: number) {
    return `This action removes a #${id} importdetailwarehosue`;
  }
}
