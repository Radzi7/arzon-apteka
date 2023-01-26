import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Dori } from './dori.model';
import { CreateDoriDto } from './dto/create-dori.dto';
import { UpdateDoriDto } from './dto/update-dori.dto';

@Injectable()
export class DoriService {
  constructor(@InjectModel(Dori) private doriRepository: typeof Dori) {}

  async create(createDoriDto: CreateDoriDto) {
    const newDori = await this.doriRepository.create(createDoriDto);
    return newDori;
  }

  async findAll() {
    const data = await this.doriRepository.findAll({
      include: { all: true },
    });
    return data;
  }

  async findOne(id: number) {
    const data = await this.doriRepository.findOne({ where: { id } });
    return data;
  }

  async update(id: number, data: UpdateDoriDto) {
    const newDori = await this.doriRepository.update(data, {
      where: { id },
    });
    if (!data) {
      throw new HttpException('Dori is not exists', HttpStatus.NOT_FOUND);
    }
    return { message: 'Dori is updated' };
  }

  async remove(id: number) {
    const data = await this.doriRepository.destroy({ where: { id } });
    if (!data) {
      throw new HttpException('Dori is not exists', HttpStatus.NOT_FOUND);
    }
    return { message: 'Dori is deleted' };
  }
}
