import { Module, OnModuleInit, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [UserModule, TodoModule],
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
export class AppModule implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    console.log('AppModule: onModuleInit');
  }
  onApplicationBootstrap() {
    console.log('AppModule: onApplicationBootstrap');
  }
}
