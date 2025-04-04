import { PartialType } from '@nestjs/swagger';
import { CreateExportwarehouseDto } from './create-exportwarehouse.dto';

export class UpdateExportwarehouseDto extends PartialType(CreateExportwarehouseDto) {}
