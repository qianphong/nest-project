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
} from '@nestjs/common';
import { AppService } from './app.service';
import { AppGuard } from './app.guard';
import { AppFilter, AppException } from './app.filter';

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
}
