/*
 * @Date: 2022-11-07 14:23:25
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-12-11 19:43:09
 * @Description: 验证传入的id是否是ObjectId的管道
 */

import { ResponseStatus } from '@/contacts/response-message';
import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!Types.ObjectId.isValid(value)) {
      throw new HttpException(
        {
          message: '传入的id非法',
          error: 'invalid ObjectId',
        },
        ResponseStatus.REQUEST_PARAMS_ERROR,
      );
    }
    return value;
  }
}
