import { Inject, Injectable } from '@nestjs/common';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';
import { Repository } from 'typeorm';
import { Editorial } from './entities/editorial.entity';
import { Status } from '../status/entities/status.entity';

@Injectable()
export class EditorialService {
  constructor(
    @Inject('EDITORIAL_REPOSITORY')
    private editorialRepository: Repository<Editorial>,
    @Inject('STATUS_REPOSITORY')
    private statusRepository: Repository<Status>,
  ) {}

  async create(createEditorialDto: CreateEditorialDto): Promise<Editorial> {
    return await this.editorialRepository.save(createEditorialDto);
  }

  async findAll(): Promise<Editorial[]> {
    return await this.editorialRepository.find();
  }

  async findOne(id: number): Promise<Editorial> {
    return await this.editorialRepository.findOneBy({ Id: id });
  }

  async update(
    id: number,
    updateEditorialDto: UpdateEditorialDto,
  ): Promise<Editorial> {
    const editorial = await this.editorialRepository.findOne({
      where: { Id: id },
    });

    if (updateEditorialDto.StatusId) {
      editorial.Status = await this.statusRepository.findOne({
        where: { Id: updateEditorialDto.StatusId },
      });
    }

    Object.assign(editorial, updateEditorialDto);

    return await this.editorialRepository.save(editorial);
  }

  async remove(id: number): Promise<Editorial> {
    const editorial = await this.editorialRepository.findOne({
      where: { Id: id },
    });

    if (editorial) {
      await this.editorialRepository.delete(id);
    }

    return editorial;
  }
}
