import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Inject,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, tap } from 'rxjs';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  @Inject(Reflector)
  private reflector: Reflector;
  intercept(context: ExecutionContext, next: CallHandler) {
    const now = Date.now();
    const message =
      this.reflector.get<string>('message', context.getHandler()) || '操作成功';
    return next.handle().pipe(
      map((data) => ({ success: true, code: 0, message, data })),
      tap(() => console.log(`ms: ${Date.now() - now}`)),
    );
  }
}
