import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Put,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Public } from 'src/decorator/customize';
import { Request } from 'express';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  @Public()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  @Public()
  async findAll(@Req() req: Request) {
    const builder = await this.suppliersService.queryBuilder('suppliers');

    if (req.query.s) {
      builder.where('suppliers.supplierName LIKE :s', {
        s: `%${req.query.s}%`,
      });
    }

    const sort: any = req.query.sort;

    if (sort) {
      builder.orderBy('customers.categoryName', sort.toUpperCase());
    }

    // const page: number = parseInt(req.query.page as any) || 1;
    // const perPage = 10;
    const total = await builder.getCount();

    // builder.offset((page - 1) * perPage).limit(perPage);

    return {
      suppliers: await builder.getMany(),
      total,
      // page,
      // last_page: Math.ceil(total / perPage),
    };
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.suppliersService.findID(+id);
  }

  @Patch(':id')
  @Public()
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.suppliersService.update(+id, updateSupplierDto);
  }

  @Put(':id')
  @Public()
  updatePut(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.suppliersService.update(+id, updateSupplierDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Public()
  async remove(@Param('id') id: string) {
    const isDeleted = await this.suppliersService.remove(+id);
    if (!isDeleted) {
      throw new HttpException(
        `Supplier with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
