import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

export class AppException extends Error {
  constructor(message?: string) {
    super(message);
    console.log('AppException: constructor');
  }
}

@Catch(AppException)
export class AppFilter implements ExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost) {
    console.log('AppFilter: catch', exception.message);
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest();
      const response = ctx.getResponse();

      response.status(500).json({
        statusCode: 500,
        timestamp: new Date().toISOString(),
        message: exception.message,
      });
    }
  }
}
