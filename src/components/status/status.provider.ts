import { DataSource } from 'typeorm';
import { Status } from './entities/status.entity';

export const StatusProvider = [
  {
    provide: 'STATUS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Status),
    inject: ['DATABASE_CONNECTION'],
  },
];
