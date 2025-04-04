import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImportdetailwarehosueService } from './importdetailwarehosue.service';
import { CreateImportdetailwarehosueDto } from './dto/create-importdetailwarehosue.dto';
import { UpdateImportdetailwarehosueDto } from './dto/update-importdetailwarehosue.dto';

@Controller('importdetailwarehosue')
export class ImportdetailwarehosueController {
  constructor(private readonly importdetailwarehosueService: ImportdetailwarehosueService) {}

  @Post()
  create(@Body() createImportdetailwarehosueDto: CreateImportdetailwarehosueDto) {
    return this.importdetailwarehosueService.create(createImportdetailwarehosueDto);
  }

  @Get()
  findAll() {
    return this.importdetailwarehosueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.importdetailwarehosueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImportdetailwarehosueDto: UpdateImportdetailwarehosueDto) {
    return this.importdetailwarehosueService.update(+id, updateImportdetailwarehosueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.importdetailwarehosueService.remove(+id);
  }
}
