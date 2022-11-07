/*
 * @Date: 2022-11-07 12:13:52
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-07 12:55:38
 * @Description: Do not edit
 */
import { HttpException } from '@nestjs/common';
import * as BusinessMessage from './business-message';
import { ResponseStatus } from './response-message';

// 获取所有的业务异常信息
const businessMessage = Object.values(BusinessMessage)
  .map((item) => Object.values(item))
  .flat();
export const ThrowError = (message: string, error: any) => {
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
        message: BusinessMessage.ServiceMessage.INTERNAL_SERVER_ERROR,
        error,
      },
      ResponseStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
