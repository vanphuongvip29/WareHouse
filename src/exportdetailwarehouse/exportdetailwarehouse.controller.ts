import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExportdetailwarehouseService } from './exportdetailwarehouse.service';
import { CreateExportdetailwarehouseDto } from './dto/create-exportdetailwarehouse.dto';
import { UpdateExportdetailwarehouseDto } from './dto/update-exportdetailwarehouse.dto';

@Controller('exportdetailwarehouse')
export class ExportdetailwarehouseController {
  constructor(private readonly exportdetailwarehouseService: ExportdetailwarehouseService) {}

  @Post()
  create(@Body() createExportdetailwarehouseDto: CreateExportdetailwarehouseDto) {
    return this.exportdetailwarehouseService.create(createExportdetailwarehouseDto);
  }

  @Get()
  findAll() {
    return this.exportdetailwarehouseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exportdetailwarehouseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExportdetailwarehouseDto: UpdateExportdetailwarehouseDto) {
    return this.exportdetailwarehouseService.update(+id, updateExportdetailwarehouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exportdetailwarehouseService.remove(+id);
  }
}
