import { PartialType } from '@nestjs/mapped-types';
import { CreateLanguageDto } from './create-language.dto';

export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {
  readonly Name?: string;
  readonly Description?: string;
  readonly StatusId?: number;
}
