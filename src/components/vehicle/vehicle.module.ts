import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { DatabaseModule } from '../../database/database.module';
import { VehicleProvider } from './vehicle.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [VehicleController],
  providers: [...VehicleProvider, VehicleService],
})
export class VehicleModule {}
