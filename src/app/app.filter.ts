import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

export class AppException extends HttpException {
  constructor(message?: string) {
    super(message, HttpStatus.BAD_REQUEST);
    console.log('AppException: constructor');
  }
}

@Catch(AppException)
export class AppFilter implements ExceptionFilter<AppException> {
  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
