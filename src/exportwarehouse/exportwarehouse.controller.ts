import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ExportwarehouseService } from './exportwarehouse.service';
import { CreateExportwarehouseDto } from './dto/create-exportwarehouse.dto';
import { UpdateExportwarehouseDto } from './dto/update-exportwarehouse.dto';
import { Public } from 'src/decorator/customize';

@Controller('exportwarehouse')
export class ExportwarehouseController {
  constructor(
    private readonly exportwarehouseService: ExportwarehouseService,
  ) {}

  @Post()
  @Public()
  create(@Body() createExportwarehouseDto: CreateExportwarehouseDto) {
    return this.exportwarehouseService.create(createExportwarehouseDto);
  }

  @Get()
  @Public()
  async findAll() {
    const data = await this.exportwarehouseService.findAll();
    return {
      exports: data,
    };
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.exportwarehouseService.findID(+id);
  }

  @Patch(':id')
  @Public()
  update(
    @Param('id') id: string,
    @Body() updateExportwarehouseDto: UpdateExportwarehouseDto,
  ) {
    return this.exportwarehouseService.update(+id, updateExportwarehouseDto);
  }

  @Delete(':id')
  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.exportwarehouseService.remove(+id);
  }
}
