import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from '../../book/entities/book.entity';
import { Author } from '../../author/entities/author.entity';
import { Editorial } from '../../editorial/entities/editorial.entity';
import { Category } from '../../category/entities/category.entity';
import { Language } from '../../language/entities/language.entity';

@Entity({ name: 'Statuses' })
export class Status {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ unique: true, nullable: false })
  Name: string;

  @Column({ nullable: false })
  Description: string;

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

  @OneToMany(() => Book, (book) => book.Status)
  Books: Book[];

  @OneToMany(() => Author, (author) => author.Status)
  Authors: Author[];

  @OneToMany(() => Editorial, (editorial) => editorial.Status)
  Editorials: Editorial[];

  @OneToMany(() => Category, (category) => category.Status)
  Categories: Category[];

  @OneToMany(() => Language, (language) => language.Status)
  Languages: Language[];
}
