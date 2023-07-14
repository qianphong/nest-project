import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TodoModule } from 'src/todo/todo.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TodoModule],
})
export class UserModule {}
