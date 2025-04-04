import { Module } from '@nestjs/common';
import { ImportwarehouseService } from './importwarehouse.service';
import { ImportwarehouseController } from './importwarehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Importwarehouse } from './entities/importwarehouse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Importwarehouse])],
  controllers: [ImportwarehouseController],
  providers: [ImportwarehouseService],
})
export class ImportwarehouseModule {}
