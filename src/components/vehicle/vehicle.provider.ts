import { DataSource } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';

export const VehicleProvider = [
  {
    provide: 'VEHICLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Vehicle),
    inject: ['DATABASE_CONNECTION'],
  },
];
