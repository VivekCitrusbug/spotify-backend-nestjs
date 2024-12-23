import {
  ExceptionFilter,
  Catch,
  HttpException,
  HttpStatus,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiError } from './ApiError';
@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let data = null;
    let success = false;
    let errors = [];

    //handle ApiError throw using ApiError class:
    if (exception instanceof ApiError) {
      statusCode = exception.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;
      success = exception.success;
      data = exception.data;
      errors = exception.errors || [];
    }

    //if error thrown using http exceptions class:
    else if (exception instanceof HttpException) {
      const responseData = exception.getResponse();
      statusCode = exception.getStatus();
      message =
        typeof responseData == 'string'
          ? responseData
          : (responseData as any).message || message;
      errors =
        typeof responseData == 'object' && (responseData as any).errors
          ? (responseData as any).errors
          : [];
    }

    // Log the error
    console.error(
      `[${new Date().toISOString()}] Error: ${message}\nStatus: ${statusCode}\nPath: ${request.url}\nStack: ${
        exception instanceof Error ? exception.stack : 'N/A'
      }`,
    );
    // send error response:
    response.status(statusCode).json({
      statusCode,
      message,
      success,
      data,
      errors,
    });
  }
}
