/*
 * @Date: 2022-11-07 12:13:52
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-08 16:06:41
 * @Description: Do not edit
 */
import { HttpException } from '@nestjs/common';
import * as BusinessMessage from './business-message';
import { ResponseStatus } from './response-message';

// 获取所有的业务异常信息
const businessMessage = Object.values(BusinessMessage)
  .map((item) => Object.values(item))
  .flat();
export const ThrowError = (message: string, error: any, statusCode?: number) => {
  error = error.message ? error.message : error;
  // 如果是业务异常信息,
  if (businessMessage.includes(error)) {
    throw new HttpException(
      {
        message,
        error,
      },
      ResponseStatus.REQUEST_PARAMS_ERROR,
    );
  } else {
    throw new HttpException(
      {
        message: message ? message : BusinessMessage.ServiceMessage.INTERNAL_SERVER_ERROR,
        error,
      },
      statusCode ? statusCode : ResponseStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
