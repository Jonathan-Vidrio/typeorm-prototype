import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Status } from '../status/entities/status.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
    @Inject('STATUS_REPOSITORY')
    private statusRepository: Repository<Status>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);

    if (!createCategoryDto.StatusId) {
      category.Status = await this.statusRepository.findOne({
        where: { Id: 1 },
      });
    }

    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: ['Status'],
    });
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({
      where: { Id: id },
      relations: ['Status'],
    });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);

    if (category) {
      if (updateCategoryDto.StatusId) {
        category.Status = await this.statusRepository.findOne({
          where: { Id: updateCategoryDto.StatusId },
        });
      }

      Object.assign(category, updateCategoryDto);

      return await this.categoryRepository.save(category);
    }
  }

  async remove(id: number): Promise<Category> {
    const category = await this.findOne(id);

    if (category) {
      await this.categoryRepository.delete(id);

      return category;
    }
  }
}
