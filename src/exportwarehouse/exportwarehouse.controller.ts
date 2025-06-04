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
  BadRequestException,
} from '@nestjs/common';
import { ExportwarehouseService } from './exportwarehouse.service';
import {
  CreateExportwarehouseDto,
  ExportWithDetails,
} from './dto/create-exportwarehouse.dto';
import {
  CkeckBanking,
  UpdateDtoExport,
  UpdateExportwarehouseDto,
} from './dto/update-exportwarehouse.dto';
import { Public } from 'src/decorator/customize';

@Controller('exportwarehouse')
export class ExportwarehouseController {
  constructor(
    private readonly exportwarehouseService: ExportwarehouseService,
  ) {}

  @Get('export-stats')
  @Public()
  async getImportStats() {
    return await this.exportwarehouseService.getDailyExportStats();
  }

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

  // @Public()
  // @Post('check-banking')
  // async checkCode(@Body() ckeckBanking: CkeckBanking) {
  //   return this.exportwarehouseService.handleCheckBanking(ckeckBanking);
  // }

  @Public()
  @Post('check-banking')
  parseTransaction(@Body('notification') notification: any) {
    if (typeof notification !== 'string') {
      throw new BadRequestException('notification must be a string');
    }

    const amountRegex = /\+ ([\d,]+)/;
    const transactionRegex = /GD: (.+?) \d{6}-\d{6}/;

    const amountMatch = notification.match(amountRegex);
    const transactionMatch = notification.match(transactionRegex);

    const amount = amountMatch
      ? parseInt(amountMatch[1].replace(/,/g, ''), 10)
      : 0;
    const transactionContent = transactionMatch
      ? transactionMatch[1].trim()
      : '';

    // return {
    //   amount,
    //   transactionContent,
    // };
    return this.exportwarehouseService.handleCheckBanking(
      amount,
      transactionContent,
    );
  }
}
