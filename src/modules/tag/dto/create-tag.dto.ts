/*
 * @Date: 2022-10-04 17:59:03
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-07 09:57:31
 * @Description: 新增标签传输对象
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @ApiProperty({ description: '标签名称', default: '标签名称' })
  tagName: string;
  @IsInt()
  @ApiProperty({ description: '标签状态', default: 1 })
  status: number;
}
