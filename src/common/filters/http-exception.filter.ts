/*
 * @Date: 2022-10-03 13:31:58
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-06 18:10:07
 * @Description: 集中错误处理
 */
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { factoryLogger } from '@/utils/logger';
import { parseTime } from '@/utils/date';
/**
 * @description: 实现一个异常过滤器，用于集中处理异常
 * @return {Object}
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // 获取手动抛出的异常信息
    const res = exception.getResponse();
    const { message, error } = res as { message: string; error: string };
    const logger = factoryLogger();
    const errorMessage = {
      statusCode: status,
      timestamp: parseTime(new Date()),
      path: request.url,
      error: error,
      message: message,
    };
    logger.error(
      ` ${request.method} ${request.url}
        查询参数Query: ${JSON.stringify(request.query)}
        请求参数Params: ${JSON.stringify(request.params)}
        请求体Body: ${JSON.stringify(request.body)}
        请求结果: ${JSON.stringify(errorMessage)}`,
    );
    response.status(status).json(errorMessage);
  }
}
