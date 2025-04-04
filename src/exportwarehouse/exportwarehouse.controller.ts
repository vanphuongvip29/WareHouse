import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExportwarehouseService } from './exportwarehouse.service';
import { CreateExportwarehouseDto } from './dto/create-exportwarehouse.dto';
import { UpdateExportwarehouseDto } from './dto/update-exportwarehouse.dto';

@Controller('exportwarehouse')
export class ExportwarehouseController {
  constructor(private readonly exportwarehouseService: ExportwarehouseService) {}

  @Post()
  create(@Body() createExportwarehouseDto: CreateExportwarehouseDto) {
    return this.exportwarehouseService.create(createExportwarehouseDto);
  }

  @Get()
  findAll() {
    return this.exportwarehouseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exportwarehouseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExportwarehouseDto: UpdateExportwarehouseDto) {
    return this.exportwarehouseService.update(+id, updateExportwarehouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exportwarehouseService.remove(+id);
  }
}
