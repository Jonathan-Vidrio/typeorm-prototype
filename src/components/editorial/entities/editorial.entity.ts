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

@Entity({ name: 'Editorials' })
export class Editorial {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ unique: true, nullable: false })
  Name: string;

  @Column({ nullable: false })
  Address: string;

  @Column({ nullable: false })
  Phone: string;

  @Column({ unique: true, nullable: false })
  Email: string;

  @Column({ unique: true, nullable: false })
  Website: string;

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

  @OneToMany(() => Book, (book) => book.Editorial)
  Books: Book[];
}
