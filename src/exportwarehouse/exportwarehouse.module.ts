import { Module } from '@nestjs/common';
import { ExportwarehouseService } from './exportwarehouse.service';
import { ExportwarehouseController } from './exportwarehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportWarehouse } from './entities/exportwarehouse.entity';
import { CustomersModule } from 'src/customers/customers.module';
import { ProductsModule } from 'src/products/products.module';
import { ExportdetailwarehouseModule } from 'src/exportdetailwarehouse/exportdetailwarehouse.module';
import { ExportDetailWarehouse } from 'src/exportdetailwarehouse/entities/exportdetailwarehouse.entity';
import { EventsGateway } from 'src/events/events.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExportWarehouse, ExportDetailWarehouse]),
    CustomersModule,
    ProductsModule,
  ],
  controllers: [ExportwarehouseController],
  providers: [ExportwarehouseService, EventsGateway],
  exports: [ExportwarehouseService],
})
export class ExportwarehouseModule {}
