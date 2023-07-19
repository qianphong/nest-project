import {
  Inject,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  Res,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private userService: UserService;
  @Inject(JwtService)
  private jwtService: JwtService;

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Session() session) {
    console.log(session);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
    @Headers('authorization') authorization: string,
  ) {
    if (authorization) {
      try {
        const token = authorization.split(' ')[1];
        const data = this.jwtService.verify<{ id?: number }>(token);

        const newToken = this.jwtService.sign({ id: data.id + 1 });
        res.setHeader('token', newToken);
      } catch (e) {
        throw new UnauthorizedException();
      }
    } else {
      const newToken = this.jwtService.sign({ id: 1 });
      res.setHeader('token', newToken);
    }
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
