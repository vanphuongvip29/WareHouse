import { PartialType } from '@nestjs/swagger';
import { CreateImportwarehouseDto } from './create-importwarehouse.dto';

export class UpdateImportwarehouseDto extends PartialType(CreateImportwarehouseDto) {}
