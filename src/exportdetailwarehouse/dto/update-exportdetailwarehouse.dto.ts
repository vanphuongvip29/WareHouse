import { PartialType } from '@nestjs/swagger';
import { CreateExportdetailwarehouseDto } from './create-exportdetailwarehouse.dto';

export class UpdateExportdetailwarehouseDto extends PartialType(CreateExportdetailwarehouseDto) {}
