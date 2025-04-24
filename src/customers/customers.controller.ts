import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Public } from 'src/decorator/customize';
import { Request } from 'express';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @Public()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @Public()
  async findAll(@Req() req: Request) {
    const builder = await this.customersService.queryBuilder('customers');

    if (req.query.s) {
      builder.where('customers.customerName LIKE :s', {
        s: `%${req.query.s}%`,
      });
    }

    const sort: any = req.query.sort;

    if (sort) {
      builder.orderBy('customers.categoryName', sort.toUpperCase());
    }

    // const page: number = parseInt(req.query.page as any) || 1;
    // const perPage = 5;
    const total = await builder.getCount();

    // builder.offset((page - 1) * perPage).limit(perPage);

    return {
      customers: await builder.getMany(),
      total,
      // page,
      // last_page: Math.ceil(total / perPage),
    };
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.customersService.findID(+id);
  }

  @Patch(':id')
  @Public()
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Public()
  async remove(@Param('id') id: string) {
    const isDeleted = await this.customersService.remove(+id);
    if (!isDeleted) {
      throw new HttpException(
        `Supplier with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
