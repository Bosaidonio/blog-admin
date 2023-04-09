/*
 * @Date: 2022-10-06 16:34:38
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-09 13:21:12
 * @Description: 获取所有路由
 */

import { INestApplication } from '@nestjs/common';

interface Route {
  path: string;
  method: string;
}
/**
 * @description: 获取应用的所有路由
 * @param {INestApplication} app
 * @return {*}
 */
export const getAllRoutes = (app: INestApplication) => {
  const server = app.getHttpServer();
  const router = server._events.request._router;
  const availableRoutes: Route[] = router.stack
    .map((layer) => {
      if (layer.route) {
        return {
          path: layer.route?.path,
          method: layer.route?.stack[0].method,
        };
      }
    })
    .filter((item) => item !== undefined);

  return availableRoutes;
};
