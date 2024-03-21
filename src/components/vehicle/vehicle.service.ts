import { Inject, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @Inject('VEHICLE_REPOSITORY')
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicleRepository.save(createVehicleDto);
  }

  findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  findOne(id: number): Promise<Vehicle> {
    return this.vehicleRepository.findOne({ where: { Id: id } });
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<number> {
    return this.vehicleRepository
      .update(id, updateVehicleDto)
      .then((result: UpdateResult) => result.affected);
  }

  remove(id: number): Promise<number> {
    return this.vehicleRepository
      .delete(id)
      .then((result: DeleteResult) => result.affected);
  }
}
