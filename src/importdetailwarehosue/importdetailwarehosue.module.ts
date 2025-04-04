import { Module } from '@nestjs/common';
import { ImportdetailwarehosueService } from './importdetailwarehosue.service';
import { ImportdetailwarehosueController } from './importdetailwarehosue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Importdetailwarehosue } from './entities/importdetailwarehosue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Importdetailwarehosue])],
  controllers: [ImportdetailwarehosueController],
  providers: [ImportdetailwarehosueService],
})
export class ImportdetailwarehosueModule {}
