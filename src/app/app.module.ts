import {
  Module,
  OnModuleInit,
  OnApplicationBootstrap,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotifyModule } from '@/notify/notify.module';
import { AppMiddleware } from './app.middleware';
import { FileModule } from '@/file/file.module';

@Module({
  imports: [NotifyModule.register({ count: 23 }), FileModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'person',
      useValue: '张三',
    },
    {
      provide: 'test',
      useFactory: () => {
        return {
          name: 'test',
          date: new Date(),
        };
      },
    },
  ],
})
export class AppModule
  implements OnModuleInit, OnApplicationBootstrap, NestModule
{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes('*');
  }
  onModuleInit() {
    console.log('AppModule: onModuleInit');
  }
  onApplicationBootstrap() {
    console.log('AppModule: onApplicationBootstrap');
  }
}
