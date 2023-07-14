import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
} from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    console.log('AppService: onModuleInit');
  }
  onApplicationBootstrap() {
    console.log('AppService: onApplicationBootstrap');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
