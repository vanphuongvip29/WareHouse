import { Module } from '@nestjs/common';
import { ImportdetailwarehosueService } from './importdetailwarehosue.service';
import { ImportdetailwarehosueController } from './importdetailwarehosue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Importdetailwarehosue } from './entities/importdetailwarehosue.entity';
import { ProductsModule } from 'src/products/products.module';
import { ImportwarehouseModule } from 'src/importwarehouse/importwarehouse.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Importdetailwarehosue]),
    ProductsModule,
    ImportwarehouseModule,
  ],
  controllers: [ImportdetailwarehosueController],
  providers: [ImportdetailwarehosueService],
})
export class ImportdetailwarehosueModule {}
