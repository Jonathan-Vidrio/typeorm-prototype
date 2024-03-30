import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { DatabaseModule } from '../../database/database.module';
import { StatusProvider } from './status.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [StatusController],
  providers: [...StatusProvider, StatusService],
})
export class StatusModule {}
