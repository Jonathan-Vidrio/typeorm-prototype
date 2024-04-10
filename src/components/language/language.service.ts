import { Inject, Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { Status } from '../status/entities/status.entity';

@Injectable()
export class LanguageService {
  constructor(
    @Inject('LANGUAGE_REPOSITORY')
    private languageRepository: Repository<Language>,
    @Inject('STATUS_REPOSITORY')
    private statusRepository: Repository<Status>,
  ) {}

  async create(createLanguageDto: CreateLanguageDto): Promise<Language> {
    const language = this.languageRepository.create(createLanguageDto);

    if (!createLanguageDto.StatusId) {
      language.Status = await this.statusRepository.findOne({
        where: { Id: 1 },
      });
    }

    return await this.languageRepository.save(language);
  }

  async findAll(): Promise<Language[]> {
    return await this.languageRepository.find({
      relations: ['Status', 'Books'],
    });
  }

  async findOne(id: number): Promise<Language> {
    return await this.languageRepository.findOne({
      where: { Id: id },
      relations: ['Status', 'Books'],
    });
  }

  async update(
    id: number,
    updateLanguageDto: UpdateLanguageDto,
  ): Promise<Language> {
    const language = await this.languageRepository.findOne({
      where: { Id: id },
    });

    if (language) {
      if (updateLanguageDto.StatusId) {
        language.Status = await this.statusRepository.findOne({
          where: { Id: updateLanguageDto.StatusId },
        });
      }

      Object.assign(language, updateLanguageDto);

      return await this.languageRepository.save(language);
    }
  }

  async remove(id: number): Promise<Language> {
    const language = await this.languageRepository.findOne({
      where: { Id: id },
    });

    if (language) {
      await this.languageRepository.delete(id);

      return language;
    }
  }
}
