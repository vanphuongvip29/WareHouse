import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImportwarehouseService } from './importwarehouse.service';
import { CreateImportwarehouseDto } from './dto/create-importwarehouse.dto';
import { UpdateImportwarehouseDto } from './dto/update-importwarehouse.dto';

@Controller('importwarehouse')
export class ImportwarehouseController {
  constructor(private readonly importwarehouseService: ImportwarehouseService) {}

  @Post()
  create(@Body() createImportwarehouseDto: CreateImportwarehouseDto) {
    return this.importwarehouseService.create(createImportwarehouseDto);
  }

  @Get()
  findAll() {
    return this.importwarehouseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.importwarehouseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImportwarehouseDto: UpdateImportwarehouseDto) {
    return this.importwarehouseService.update(+id, updateImportwarehouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.importwarehouseService.remove(+id);
  }
}
