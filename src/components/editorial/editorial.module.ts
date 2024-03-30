import { Module } from '@nestjs/common';
import { EditorialService } from './editorial.service';
import { EditorialController } from './editorial.controller';
import { DatabaseModule } from '../../database/database.module';
import { EditorialProvider } from './editorial.provider';
import { StatusProvider } from '../status/status.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [EditorialController],
  providers: [...EditorialProvider, ...StatusProvider, EditorialService],
})
export class EditorialModule {}
