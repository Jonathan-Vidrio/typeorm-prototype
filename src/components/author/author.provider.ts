import { DataSource } from 'typeorm';
import { Author } from './entities/author.entity';

export const AuthorProvider = [
  {
    provide: 'AUTHOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Author),
    inject: ['DATABASE_CONNECTION'],
  },
];
