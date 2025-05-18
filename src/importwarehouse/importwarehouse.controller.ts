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
  Query,
  Req,
  Put,
} from '@nestjs/common';
import { ImportwarehouseService } from './importwarehouse.service';
import {
  CreateImportwarehouseDto,
  ImportWithDetails,
} from './dto/create-importwarehouse.dto';
import {
  UpdateDto,
  UpdateImportwarehouseDto,
} from './dto/update-importwarehouse.dto';
import { Public } from 'src/decorator/customize';
import { Request } from 'express';

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
  async findAll() {
    const dataImport = await this.importwarehouseService.findAll();
    return {
      imports: dataImport,
    };
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
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.importwarehouseService.remove(+id);
  }

  @Get('detail/:id')
  @Public()
  findDetail(@Param('id') id: string) {
    return this.importwarehouseService.findDetail(+id);
  }

  @Post('create-import-detail')
  @Public()
  async creatImportDetail(@Body() importWithDetails: ImportWithDetails) {
    return this.importwarehouseService.createImportWithDetails(
      importWithDetails,
    );
  }

  @Patch('update-import-detail/:id')
  @Public()
  async updateImportDetail(
    @Param('id') id: number,
    @Body() updateImportDto: UpdateDto,
  ) {
    return this.importwarehouseService.updateImportWithDetails(
      id,
      updateImportDto,
    );
  }

  @Delete('delete-import-detail/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Public()
  async deleteImportWithDetails(@Param('id') id: number) {
    return this.importwarehouseService.deleteImportWithDetails(id);
  }
}
