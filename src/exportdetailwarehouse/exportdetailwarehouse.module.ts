import { Module } from '@nestjs/common';
import { ExportdetailwarehouseService } from './exportdetailwarehouse.service';
import { ExportdetailwarehouseController } from './exportdetailwarehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportDetailWarehouse } from './entities/exportdetailwarehouse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExportDetailWarehouse])],
  controllers: [ExportdetailwarehouseController],
  providers: [ExportdetailwarehouseService],
})
export class ExportdetailwarehouseModule {}
