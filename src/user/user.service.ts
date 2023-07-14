import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TodoService } from 'src/todo/todo.service';

@Injectable()
export class UserService {
  constructor(private readonly TodoService: TodoService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user ' + JSON.stringify(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user \n${this.TodoService.findOne(
      id,
    )}`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
