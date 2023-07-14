import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: './upload',
    }),
  )
  file(@UploadedFiles() _files: Array<Express.Multer.File>) {
    return `received: files`;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('find')
  find(@Query('name') name?: string) {
    return `name: ${name}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('name') name: string) {
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
