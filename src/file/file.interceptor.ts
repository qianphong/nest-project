import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';
import { FileResponse } from './file';
import { Reflector } from '@nestjs/core';
import { MessageKey } from './file.decorator';

@Injectable()
export class FileInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(ctx: ExecutionContext, next: CallHandler<FileResponse[]>) {
    const message =
      this.reflector.get(MessageKey, ctx.getHandler()) || '操作成功';
    return next
      .handle()
      .pipe(map((data) => ({ success: true, data, message })));
  }
}
