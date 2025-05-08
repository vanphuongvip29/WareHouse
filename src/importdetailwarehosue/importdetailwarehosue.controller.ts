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
import { ImportdetailwarehosueService } from './importdetailwarehosue.service';
import { CreateImportdetailwarehosueDto } from './dto/create-importdetailwarehosue.dto';
import { UpdateImportdetailwarehosueDto } from './dto/update-importdetailwarehosue.dto';
import { Public } from 'src/decorator/customize';

@Controller('importdetailwarehosue')
export class ImportdetailwarehosueController {
  constructor(
    private readonly importdetailwarehosueService: ImportdetailwarehosueService,
  ) {}

  @Post()
  @Public()
  create(
    @Body() createImportdetailwarehosueDto: CreateImportdetailwarehosueDto,
  ) {
    return this.importdetailwarehosueService.create(
      createImportdetailwarehosueDto,
    );
  }

  @Get()
  @Public()
  async findAll() {
    const data = await this.importdetailwarehosueService.findAll();
    return {
      importdeatils: data,
    };
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.importdetailwarehosueService.findID(+id);
  }

  @Patch(':id')
  @Public()
  update(
    @Param('id') id: string,
    @Body() updateImportdetailwarehosueDto: UpdateImportdetailwarehosueDto,
  ) {
    return this.importdetailwarehosueService.update(
      +id,
      updateImportdetailwarehosueDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Public()
  remove(@Param('id') id: string) {
    return this.importdetailwarehosueService.remove(+id);
  }
}
