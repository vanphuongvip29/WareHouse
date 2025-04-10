import { Module } from '@nestjs/common';
import { ExportwarehouseService } from './exportwarehouse.service';
import { ExportwarehouseController } from './exportwarehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportWarehouse } from './entities/exportwarehouse.entity';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExportWarehouse]), CustomersModule],
  controllers: [ExportwarehouseController],
  providers: [ExportwarehouseService],
  exports: [ExportwarehouseService],
})
export class ExportwarehouseModule {}
