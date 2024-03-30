import { DataSource } from 'typeorm';
import { Language } from './entities/language.entity';

export const LanguageProvider = [
  {
    provide: 'LANGUAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Language),
    inject: ['DATABASE_CONNECTION'],
  },
];
