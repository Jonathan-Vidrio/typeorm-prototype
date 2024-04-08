import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Author } from '../author/entities/author.entity';
import { Editorial } from '../editorial/entities/editorial.entity';
import { Category } from '../category/entities/category.entity';
import { Language } from '../language/entities/language.entity';
import { Status } from '../status/entities/status.entity';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private bookRepository: Repository<Book>,
    @Inject('AUTHOR_REPOSITORY')
    private authorRepository: Repository<Author>,
    @Inject('EDITORIAL_REPOSITORY')
    private editorialRepository: Repository<Editorial>,
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
    @Inject('LANGUAGE_REPOSITORY')
    private languageRepository: Repository<Language>,
    @Inject('STATUS_REPOSITORY')
    private statusRepository: Repository<Status>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(createBookDto);

    if (createBookDto.AuthorId) {
      book.Author = await this.authorRepository.findOne({
        where: { Id: createBookDto.AuthorId },
      });
    }

    if (createBookDto.EditorialId) {
      book.Editorial = await this.editorialRepository.findOne({
        where: { Id: createBookDto.EditorialId },
      });
    }

    if (createBookDto.CategoryId) {
      book.Category = await this.categoryRepository.findOne({
        where: { Id: createBookDto.CategoryId },
      });
    }

    if (createBookDto.LanguageId) {
      book.Language = await this.languageRepository.findOne({
        where: { Id: createBookDto.LanguageId },
      });
    }

    if (!createBookDto.StatusId) {
      book.Status = await this.statusRepository.findOne({
        where: { Id: 1 },
      });
    }

    return await this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find({
      relations: ['Author', 'Editorial', 'Category', 'Language', 'Status'],
    });
  }

  async findOne(id: number): Promise<Book> {
    return await this.bookRepository.findOne({
      where: { Id: id },
      relations: ['Author', 'Editorial', 'Category', 'Language', 'Status'],
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);

    if (book) {
      if (updateBookDto.AuthorId) {
        book.Author = await this.authorRepository.findOne({
          where: { Id: updateBookDto.AuthorId },
        });
      }

      if (updateBookDto.EditorialId) {
        book.Editorial = await this.editorialRepository.findOne({
          where: { Id: updateBookDto.EditorialId },
        });
      }

      if (updateBookDto.CategoryId) {
        book.Category = await this.categoryRepository.findOne({
          where: { Id: updateBookDto.CategoryId },
        });
      }

      if (updateBookDto.LanguageId) {
        book.Language = await this.languageRepository.findOne({
          where: { Id: updateBookDto.LanguageId },
        });
      }

      if (updateBookDto.StatusId) {
        book.Status = await this.statusRepository.findOne({
          where: { Id: updateBookDto.StatusId },
        });
      }

      Object.assign(book, updateBookDto);

      return await this.bookRepository.save(book);
    }
  }

  async remove(id: number): Promise<Book> {
    const book = await this.findOne(id);

    if (book) {
      await this.bookRepository.delete(id);

      return book;
    }
  }
}
