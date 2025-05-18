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
import {
  CreateExportwarehouseDto,
  ExportWithDetails,
} from './dto/create-exportwarehouse.dto';
import {
  UpdateDtoExport,
  UpdateExportwarehouseDto,
} from './dto/update-exportwarehouse.dto';
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

  @Get('detail/:id')
  @Public()
  async findDetail(@Param('id') id: number) {
    return this.exportwarehouseService.findExportDetail(id);
  }

  @Post('create-export-detail')
  @Public()
  async creatExportDetail(@Body() exportWithDetails: ExportWithDetails) {
    return this.exportwarehouseService.createExportWithDetail(
      exportWithDetails,
    );
  }

  @Patch('update-export-detail/:id')
  @Public()
  async updateExportDetail(
    @Param('id') id: number,
    @Body() updateDtoExport: UpdateDtoExport,
  ) {
    return this.exportwarehouseService.updateExportWithDetails(
      id,
      updateDtoExport,
    );
  }

  @Delete('delete-export-detail/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Public()
  async deleteExportWithDetails(@Param('id') id: number) {
    return this.exportwarehouseService.deleteExportWithDetails(id);
  }
}
