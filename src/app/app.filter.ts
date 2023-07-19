import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

export class AppException extends Error {
  constructor(message?: string) {
    super(message);
    console.log('AppException: constructor');
  }
}

@Catch(AppException)
export class AppFilter implements ExceptionFilter<AppException> {
  catch(exception: AppException, host: ArgumentsHost) {
    console.log('AppFilter: catch', exception.message);
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();

      response.status(500).json({
        statusCode: 500,
        timestamp: new Date().toISOString(),
        message: exception.message,
      });
    }
  }
}
