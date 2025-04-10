import { Module } from '@nestjs/common';
import { ImportwarehouseService } from './importwarehouse.service';
import { ImportwarehouseController } from './importwarehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Importwarehouse } from './entities/importwarehouse.entity';
import { SuppliersModule } from 'src/suppliers/suppliers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Importwarehouse]), SuppliersModule],
  controllers: [ImportwarehouseController],
  providers: [ImportwarehouseService],
  exports: [ImportwarehouseService],
})
export class ImportwarehouseModule {}
