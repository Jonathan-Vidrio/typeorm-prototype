import { Vehicle } from '../components/vehicle/entities/vehicle.entity';
import { DataSource } from 'typeorm';

export const DatabaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'test',
        password: 'test',
        database: 'test',
        entities: [Vehicle],
        synchronize: true,
        logging: ['query'],
      });
      return dataSource.initialize();
    },
  },
];
