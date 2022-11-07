/*
 * @Date: 2022-11-06 14:18:08
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-06 14:25:26
 * @Description: Do not edit
 */
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { ObjectId } from 'mongodb';

/**
 * @description: 验证ObjectId
 * @param {ValidationOptions} validationOptions
 * @return {*}
 */
export function IsObjectId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsObjectId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return ObjectId.isValid(value);
        },
      },
    });
  };
}
