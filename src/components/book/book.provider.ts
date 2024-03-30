import { DataSource } from 'typeorm';
import { Book } from './entities/book.entity';

export const BookProvider = [
  {
    provide: 'BOOK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Book),
    inject: ['DATABASE_CONNECTION'],
  },
];
