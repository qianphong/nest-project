import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private repository: Repository<User>;

  create(createUserDto: CreateUserDto) {
    this.repository.save(createUserDto);
  }

  async findAll() {
    const [data, total] = await this.repository.findAndCount();
    return {
      data,
      total,
    };
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.repository.save({
      id,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    this.repository.delete([id]);
  }
}
