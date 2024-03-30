import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Author } from '../../author/entities/author.entity';
import { Editorial } from '../../editorial/entities/editorial.entity';
import { Category } from '../../category/entities/category.entity';
import { Language } from '../../language/entities/language.entity';
import { Status } from '../../status/entities/status.entity';

@Entity({ name: 'Books' })
export class Book {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ unique: true, nullable: false })
  ISBN: string;

  @Column({ nullable: false })
  Title: string;

  @Column({ nullable: false })
  Subtitle: string;

  @Column({ nullable: false })
  PublishDate: Date;

  @Column({ nullable: false })
  Pages: number;

  @Column({ nullable: false })
  Description: string;

  @ManyToOne(() => Author, (author) => author.Books, { nullable: false })
  @JoinColumn({ name: 'AuthorId' })
  Author: Author;

  @ManyToOne(() => Editorial, (editorial) => editorial.Books, {
    nullable: false,
  })
  @JoinColumn({ name: 'EditorialId' })
  Editorial: Editorial;

  @ManyToOne(() => Category, (category) => category.Books, { nullable: false })
  @JoinColumn({ name: 'CategoryId' })
  Category: Category;

  @ManyToOne(() => Language, (language) => language.Books, { nullable: false })
  @JoinColumn({ name: 'LanguageId' })
  Language: Language;

  @ManyToOne(() => Status, (status) => status.Books, { nullable: false })
  @JoinColumn({ name: 'StatusId' })
  Status: Status;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updatedAt: Date;
}
