/*
 * @Date: 2022-10-06 16:38:52
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-11 17:04:39
 * @Description: 路由中间件
 */

import { HttpException, INestApplication } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getAllRoutes } from '@/utils/routes';
import { pathToRegexp } from 'path-to-regexp';
import { responseMessage, ResponseStatus } from '@/contacts/response-message';

export function RouterMiddleware(app: INestApplication) {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1、放行OPTIONS请求和所有不是SWAGGER_ENDPOINT_PREFIX值开头的请求
    if (
      req.method === 'OPTIONS' ||
      req.url.indexOf(process.env.SWAGGER_ENDPOINT_PREFIX) === -1
    ) {
      return next();
    }

    // 2、、判断当前请求的路由是否注册
    const routes = getAllRoutes(app);
    const route = routes.find((route) => {
      const reg = pathToRegexp(route.path);
      // 如果是Get请求，需要去掉携带的参数再匹配
      const validateUrl =
        req.method.toUpperCase() === 'GET' ? req.url.split('?')[0] : req.url;
      return reg.test(validateUrl);
    });

    if (!route) {
      throw new HttpException(
        {
          message: responseMessage[ResponseStatus.NOT_FOUND],
          error: `This request address is not registered, please check it`,
        },
        ResponseStatus.NOT_FOUND,
      );
    }
    // 3、判断当前请求的方法和地址是否和路由表中的一致;
    const isExist = routes.some((route) => {
      const reg = pathToRegexp(route.path);
      const validateUrl =
        req.method.toUpperCase() === 'GET' ? req.url.split('?')[0] : req.url;
      return (
        reg.test(validateUrl) &&
        route.method.toLocaleUpperCase() === req.method.toLocaleUpperCase()
      );
    });

    if (!isExist) {
      throw new HttpException(
        {
          message: `The request method is "${req.method}", but the expected request method is "${route.method}"`,
          error: 'Method Not Allowed',
        },
        ResponseStatus.METHOD_NOT_ALLOWED,
      );
    }
    next();
  };
}
