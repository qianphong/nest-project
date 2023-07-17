import {
  Controller,
  Get,
  Query,
  Inject,
  OnModuleInit,
  OnApplicationBootstrap,
  ParseIntPipe,
  SetMetadata,
  UseGuards,
  Headers,
  Ip,
  Session,
  HostParam,
  UseFilters,
  Render,
  UseInterceptors,
  ParseArrayPipe,
  Post,
  Body,
  DefaultValuePipe,
  ValidationPipe,
  UploadedFile,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AppGuard } from './app.guard';
import { AppFilter, AppException } from './app.filter';
import { AppInterceptor } from './app.interceptor';
import { Sms } from './dto/create.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

enum TYPE_ENUM {
  A = 'a',
  B = 'b',
  C = 'c',
}

@Controller({ host: ':host.0.0.1' })
@SetMetadata('roles', ['admin'])
export class AppController implements OnModuleInit, OnApplicationBootstrap {
  constructor(
    private readonly appService: AppService,
    @Inject('person') private readonly person: string,
    @Inject('test') private readonly test: { name: string; date: Date },
  ) {}
  onModuleInit() {
    console.log('AppController: onModuleInit');
  }
  onApplicationBootstrap() {
    console.log('AppController: onApplicationBootstrap');
  }
  @Get()
  @UseFilters(AppFilter)
  getHello() {
    throw new AppException('AppException: getHello');
    return this.appService.getHello() + this.person + this.test.date;
  }

  @Get('/test')
  @UseGuards(AppGuard)
  @Render('test')
  handleTest(
    @Query('id', ParseIntPipe) id: number,
    @Headers('Token') token: string,
    @Ip() ip: string,
    @Session() session: { count: number },
    @HostParam('host') host: string,
  ) {
    if (!session.count) {
      session.count = 1;
    }
    session.count++;
    // return `id: ${id} \ntoken: ${token} \nhost: ${host} \nip: ${ip} \ncount: ${session.count}`;
    return {
      id: id,
      token: token,
      host: host,
      ip: ip,
      count: session.count,
    };
  }

  @Get('/ppp')
  @UseInterceptors(AppInterceptor)
  getPPP(
    @Query(
      'name',
      new ParseArrayPipe({
        items: Number,
      }),
    )
    names: string[] = ['2'],
    @Query('type', new DefaultValuePipe(TYPE_ENUM.B)) type: TYPE_ENUM,
  ) {
    console.log(type, names);
    return {
      [type]: names,
    };
  }

  @Post('/sms')
  sendSms(@Body(ValidationPipe) body: Sms) {
    console.log(body);
    return {
      code: 223344,
      msg: 'ok',
    };
  }

  @Post('/upload')
  @UseInterceptors(
    FilesInterceptor('file', 3, {
      dest: 'uploads',
    }),
  )
  uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2,
          }),
          new FileTypeValidator(),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: any,
  ) {
    console.log(body, file);
    return {
      code: 223344,
      msg: 'ok',
    };
  }
}
