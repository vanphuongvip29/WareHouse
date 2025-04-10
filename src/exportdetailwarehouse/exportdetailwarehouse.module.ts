import { Module } from '@nestjs/common';
import { ExportdetailwarehouseService } from './exportdetailwarehouse.service';
import { ExportdetailwarehouseController } from './exportdetailwarehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportDetailWarehouse } from './entities/exportdetailwarehouse.entity';
import { ProductsModule } from 'src/products/products.module';
import { ExportwarehouseModule } from 'src/exportwarehouse/exportwarehouse.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExportDetailWarehouse]),
    ProductsModule,
    ExportwarehouseModule,
  ],
  controllers: [ExportdetailwarehouseController],
  providers: [ExportdetailwarehouseService],
})
export class ExportdetailwarehouseModule {}
