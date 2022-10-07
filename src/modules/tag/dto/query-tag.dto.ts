/*
 * @Date: 2022-10-07 11:31:02
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-07 19:28:47
 * @Description: Do not edit
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class QueryTagDto {
  @IsNotEmpty({ message: '页码不能为空' })
  @ApiProperty({ description: '页码', default: 1 })
  pageNow: number;

  @IsNotEmpty({ message: '每页数量不能为空' })
  @ApiProperty({ description: '每页数量', default: 10 })
  pageSize: number;

  @IsOptional()
  @IsNotEmpty({ message: '标签状态不能为空' })
  @ApiProperty({
    description: '标签状态',
    default: '',
    required: false,
  })
  status: number;
}
