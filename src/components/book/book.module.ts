import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DatabaseModule } from '../../database/database.module';
import { BookProvider } from './book.provider';
import { AuthorProvider } from '../author/author.provider';
import { EditorialProvider } from '../editorial/editorial.provider';
import { CategoryProvider } from '../category/category.provider';
import { LanguageProvider } from '../language/language.provider';
import { StatusProvider } from '../status/status.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController],
  providers: [
    ...BookProvider,
    ...AuthorProvider,
    ...EditorialProvider,
    ...CategoryProvider,
    ...LanguageProvider,
    ...StatusProvider,
    BookService,
  ],
})
export class BookModule {}
