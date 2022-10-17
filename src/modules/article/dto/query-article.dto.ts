/*
 * @Date: 2022-10-07 11:31:02
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-08 12:12:10
 * @Description: Do not edit
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryArticleDto {
  @IsNotEmpty({ message: '页码不能为空' })
  @ApiProperty({ description: '页码', default: 1 })
  pageNow: number;

  @IsNotEmpty({ message: '每页数量不能为空' })
  @ApiProperty({ description: '每页数量', default: 10 })
  pageSize: number;

  @IsOptional()
  @IsNotEmpty({ message: '文章标题不能为空' })
  @IsString()
  @ApiProperty({
    description: '文章标题',
    default: '',
    required: false,
  })
  title: string;

  @IsOptional()
  @IsNotEmpty({ message: '文章标题不能为空' })
  @IsString()
  @ApiProperty({ description: '文章状态', default: 1, required: false })
  status: number;
}
