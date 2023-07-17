import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { scan, tap } from 'rxjs';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`ms: ${Date.now() - now}`)));
  }
}
