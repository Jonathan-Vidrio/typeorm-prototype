import { Module } from '@nestjs/common';
import { BookModule } from './components/book/book.module';
import { AuthorModule } from './components/author/author.module';
import { EditorialModule } from './components/editorial/editorial.module';
import { CategoryModule } from './components/category/category.module';
import { LanguageModule } from './components/language/language.module';
import { StatusModule } from './components/status/status.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BookModule,
    AuthorModule,
    EditorialModule,
    CategoryModule,
    LanguageModule,
    StatusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
