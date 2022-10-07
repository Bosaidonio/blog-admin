/*
 * @Date: 2022-10-07 12:33:38
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-07 13:16:35
 * @Description: 实现一个解析query参数的管道
 */

import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { stringToNumberObject } from '@/utils';
import { QueryArticleDto } from '@/modules/article/dto/query-article.dto';

export class ParseIntTransform<T> {
  
}
@Injectable()
export class ParseIntPipe implements PipeTransform {
  transformKeys: string[] = [];
  constructor(...rest) {
    this.transformKeys = rest[0] instanceof Array ? rest[0] : rest;
  }
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
      const val = parseInt(value, 10);
      return isNaN(val) ? value : val;
    } else if (typeof value === 'object') {
      return stringToNumberObject(value, this.transformKeys);
    } else {
      return value;
    }
  }
}
