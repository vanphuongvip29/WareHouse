import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ImportwarehouseService } from './importwarehouse.service';
import { CreateImportwarehouseDto } from './dto/create-importwarehouse.dto';
import { UpdateImportwarehouseDto } from './dto/update-importwarehouse.dto';
import { Public } from 'src/decorator/customize';

@Controller('importwarehouse')
export class ImportwarehouseController {
  constructor(
    private readonly importwarehouseService: ImportwarehouseService,
  ) {}

  @Post()
  @Public()
  create(@Body() createImportwarehouseDto: CreateImportwarehouseDto) {
    return this.importwarehouseService.create(createImportwarehouseDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.importwarehouseService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.importwarehouseService.findID(+id);
  }

  @Patch(':id')
  @Public()
  update(
    @Param('id') id: string,
    @Body() updateImportwarehouseDto: UpdateImportwarehouseDto,
  ) {
    return this.importwarehouseService.update(+id, updateImportwarehouseDto);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.importwarehouseService.remove(+id);
  }
}
