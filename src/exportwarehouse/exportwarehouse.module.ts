import { Module } from '@nestjs/common';
import { ExportwarehouseService } from './exportwarehouse.service';
import { ExportwarehouseController } from './exportwarehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportWarehouse } from './entities/exportwarehouse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExportWarehouse])],
  controllers: [ExportwarehouseController],
  providers: [ExportwarehouseService],
})
export class ExportwarehouseModule {}
