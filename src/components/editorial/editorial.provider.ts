import { DataSource } from 'typeorm';
import { Editorial } from './entities/editorial.entity';

export const EditorialProvider = [
  {
    provide: 'EDITORIAL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Editorial),
    inject: ['DATABASE_CONNECTION'],
  },
];
