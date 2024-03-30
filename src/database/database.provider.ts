import { DataSource } from 'typeorm';
import { Book } from '../components/book/entities/book.entity';
import { Author } from '../components/author/entities/author.entity';
import { Editorial } from '../components/editorial/entities/editorial.entity';
import { Category } from '../components/category/entities/category.entity';
import { Language } from '../components/language/entities/language.entity';
import { Status } from '../components/status/entities/status.entity';
import { ConfigService } from '@nestjs/config';

export const DatabaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (configService: ConfigService) => {
      const rootDataSource = new DataSource({
        type: configService.get<any>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
      });

      await rootDataSource.initialize();
      await rootDataSource.query(
        `CREATE DATABASE IF NOT EXISTS \`${configService.get<string>('DB_DATABASE')}\``,
      );
      await rootDataSource.destroy();

      const dataSource = new DataSource({
        type: configService.get<any>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Book, Author, Editorial, Category, Language, Status],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        logging: configService.get<boolean>('DB_LOGGING')
          ? ['query', 'error', 'schema']
          : [],
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
