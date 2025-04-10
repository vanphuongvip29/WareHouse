import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  findAll() {
    return this.importdetailwarehosueService.findAll();
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
  @Public()
  remove(@Param('id') id: string) {
    return this.importdetailwarehosueService.remove(+id);
  }
}
