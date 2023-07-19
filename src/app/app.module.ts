import {
  Module,
  OnModuleInit,
  OnApplicationBootstrap,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { NotifyModule } from '@/notify/notify.module';
import { FileModule } from '@/file/file.module';
import { UserModule } from '@/user/user.module';
import { User } from '@/user/entities/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppMiddleware } from './app.middleware';

@Module({
  imports: [
    NotifyModule.register({ count: 23 }),
    FileModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'hs203322',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nest',
      synchronize: true,
      logging: true,
      entities: [User],
      poolSize: 10,
      connectorPackage: 'mysql2',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
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
