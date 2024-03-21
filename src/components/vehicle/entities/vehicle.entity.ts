import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VehicleType } from '../../../utils/enum/vehicle-type.enum';
import { Department } from '../../../utils/enum/department.enum';
import { Status } from '../../../utils/enum/status.enum';

@Entity({ name: 'Vehicles' })
export class Vehicle {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ unique: true })
  LicensePlates: string;

  @Column()
  Image: string;

  @Column({ type: 'enum', enum: VehicleType })
  VehicleType: VehicleType;

  @Column()
  Brand: string;

  @Column()
  Model: string;

  @Column({ unique: true })
  SerialNumber: string;

  @Column()
  Color: string;

  @Column({ type: 'enum', enum: Department })
  Department: Department;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  Status: Status;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
