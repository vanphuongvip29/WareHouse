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
import { ExportdetailwarehouseService } from './exportdetailwarehouse.service';
import { CreateExportdetailwarehouseDto } from './dto/create-exportdetailwarehouse.dto';
import { UpdateExportdetailwarehouseDto } from './dto/update-exportdetailwarehouse.dto';
import { Public } from 'src/decorator/customize';

@Controller('exportdetailwarehouse')
export class ExportdetailwarehouseController {
  constructor(
    private readonly exportdetailwarehouseService: ExportdetailwarehouseService,
  ) {}

  @Post()
  @Public()
  create(
    @Body() createExportdetailwarehouseDto: CreateExportdetailwarehouseDto,
  ) {
    return this.exportdetailwarehouseService.create(
      createExportdetailwarehouseDto,
    );
  }

  @Get()
  @Public()
  async findAll() {
    const data = await this.exportdetailwarehouseService.findAll();
    return {
      exportdetails: data,
    };
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.exportdetailwarehouseService.findID(+id);
  }

  @Patch(':id')
  @Public()
  update(
    @Param('id') id: string,
    @Body() updateExportdetailwarehouseDto: UpdateExportdetailwarehouseDto,
  ) {
    return this.exportdetailwarehouseService.update(
      +id,
      updateExportdetailwarehouseDto,
    );
  }

  @Delete(':id')
  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.exportdetailwarehouseService.remove(+id);
  }
}
