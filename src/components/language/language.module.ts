import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { DatabaseModule } from '../../database/database.module';
import { LanguageProvider } from './language.provider';
import { StatusProvider } from '../status/status.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [LanguageController],
  providers: [...LanguageProvider, ...StatusProvider, LanguageService],
})
export class LanguageModule {}
