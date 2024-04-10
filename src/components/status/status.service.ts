import { Inject, Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(
    @Inject('STATUS_REPOSITORY')
    private statusRepository: Repository<Status>,
  ) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    return await this.statusRepository.save(createStatusDto);
  }

  async findAll(): Promise<Status[]> {
    return await this.statusRepository.find({ relations: ['Books'] });
  }

  async findOne(id: number): Promise<Status> {
    return await this.statusRepository.findOne({
      where: { Id: id },
      relations: ['Books'],
    });
  }

  async update(id: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const status = await this.statusRepository.findOne({
      where: { Id: id },
    });

    Object.assign(status, updateStatusDto);

    return await this.statusRepository.save(status);
  }

  async remove(id: number): Promise<Status> {
    const deletedStatus = await this.statusRepository.findOne({
      where: { Id: id },
    });

    if (deletedStatus) {
      await this.statusRepository.delete(id);
    }

    return deletedStatus;
  }
}
