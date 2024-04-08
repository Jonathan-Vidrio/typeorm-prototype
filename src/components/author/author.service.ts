import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { Status } from '../status/entities/status.entity';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private authorRepository: Repository<Author>,
    @Inject('STATUS_REPOSITORY')
    private statusRepository: Repository<Status>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create(createAuthorDto);

    if (!createAuthorDto.StatusId) {
      author.Status = await this.statusRepository.findOne({
        where: { Id: 1 },
      });
    }

    return await this.authorRepository.save(author);
  }

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find({
      relations: ['Status'],
    });
  }

  async findOne(id: number): Promise<Author> {
    return await this.authorRepository.findOne({
      where: { Id: id },
      relations: ['Status'],
    });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);

    if (author) {
      if (updateAuthorDto.StatusId) {
        author.Status = await this.statusRepository.findOne({
          where: { Id: updateAuthorDto.StatusId },
        });
      }

      Object.assign(author, updateAuthorDto);

      return await this.authorRepository.save(author);
    }
  }
  async remove(id: number): Promise<Author> {
    const author = await this.findOne(id);

    if (author) {
      await this.authorRepository.delete(id);

      return author;
    }
  }
}
