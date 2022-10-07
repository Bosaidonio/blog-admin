/*
 * @Date: 2022-10-03 13:44:59
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-05 12:18:38
 * @Description: 日志中间件
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { factoryLogger } from '@/utils/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, path } = req;
    const logger = factoryLogger();
    logger.debug(`${method} ${path}`);
    next();
  }
}
