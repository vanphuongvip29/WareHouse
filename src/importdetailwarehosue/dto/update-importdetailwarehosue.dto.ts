import { PartialType } from '@nestjs/swagger';
import { CreateImportdetailwarehosueDto } from './create-importdetailwarehosue.dto';

export class UpdateImportdetailwarehosueDto extends PartialType(CreateImportdetailwarehosueDto) {}
