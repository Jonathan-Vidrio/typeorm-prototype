import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseModule } from '../../database/database.module';
import { CategoryProvider } from './category.provider';
import { StatusProvider } from '../status/status.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [...CategoryProvider, ...StatusProvider, CategoryService],
})
export class CategoryModule {}
