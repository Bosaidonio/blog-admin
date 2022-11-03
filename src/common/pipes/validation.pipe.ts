/*
 * @Date: 2022-10-05 10:50:05
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-03 09:59:09
 * @Description: 请求参数验证管道
 */
import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype || this.toValidate(metatype)) {
      return value;
    }
    // metatype是一个类，plainToClass将value转换为metatype的实例
    // 例如：plainToClass(QueryArticleDto, value) => new QueryArticleDto(value) => {pageNow: 1, pageSize: 10, title: '', status: 1}
    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      stopAtFirstError: true,
    });
    if (errors.length > 0) {
      const errObj = {};
      errors.forEach((err) => {
        const { property, constraints } = err;
        errObj[property] = Object.values(constraints);
      });
      throw new HttpException(
        { message: 'Request data validation failed', error: errObj },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return value;
    }
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !!types.find((type) => metatype === type);
  }
}
