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
}
