import { Module } from '@nestjs/common';
import { ImportwarehouseService } from './importwarehouse.service';
import { ImportwarehouseController } from './importwarehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Importwarehouse } from './entities/importwarehouse.entity';
import { SuppliersModule } from 'src/suppliers/suppliers.module';
import { Product } from 'src/products/entities/product.entity';
import { Importdetailwarehosue } from 'src/importdetailwarehosue/entities/importdetailwarehosue.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Importwarehouse, Product, Importdetailwarehosue]),
    SuppliersModule,
  ],
  controllers: [ImportwarehouseController],
  providers: [ImportwarehouseService],
  exports: [ImportwarehouseService],
})
export class ImportwarehouseModule {}
