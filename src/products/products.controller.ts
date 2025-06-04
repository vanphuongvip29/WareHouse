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
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from 'src/decorator/customize';
import { Request } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Public()
  @Get()
  async findAll() {
    const dataCate = await this.productsService.findAll();
    return {
      products: dataCate,
    };
  }

  // @Get()
  // @Public()
  // async findAll(@Req() req: Request) {
  //   const builder = await this.productsService.queryBuilder('products');

  //   if (req.query.s) {
  //     builder.where('products.productName LIKE :s', {
  //       s: `%${req.query.s}%`,
  //     });
  //   }

  //   const sort: any = req.query.sort;

  //   if (sort) {
  //     builder.orderBy('products.productName', sort.toUpperCase());
  //   }

  //   const page: number = parseInt(req.query.page as any) || 1;
  //   const perPage = 2;
  //   const total = await builder.getCount();

  //   builder.offset((page - 1) * perPage).limit(perPage);

  //   return {
  //     products: await builder.getMany(),
  //     total,
  //     page,
  //     last_page: Math.ceil(total / perPage),
  //   };
  // }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findID(+id);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
