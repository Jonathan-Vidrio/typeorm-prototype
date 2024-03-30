import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../../status/entities/status.entity';
import { Book } from '../../book/entities/book.entity';

@Entity({ name: 'Authors' })
export class Author {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ nullable: false })
  FirstName: string;

  @Column({ nullable: false })
  LastName: string;

  @Column({ unique: true, nullable: false })
  Pseudonym: string;

  @Column({ nullable: false })
  BirthDate: Date;

  @Column({ nullable: false })
  Nationality: string;

  @ManyToOne(() => Status, (status) => status.Languages, { nullable: false })
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

  @OneToMany(() => Book, (book) => book.Author)
  Books: Book[];
}
