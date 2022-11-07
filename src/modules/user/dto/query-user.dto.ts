/*
 * @Date: 2022-11-06 14:32:05
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-06 14:33:23
 * @Description: Do not edit
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryUserDto {
  @IsNotEmpty({ message: '页码不能为空' })
  @ApiProperty({ description: '页码', default: 1 })
  pageNow: number;

  @IsNotEmpty({ message: '每页数量不能为空' })
  @ApiProperty({ description: '每页数量', default: 10 })
  pageSize: number;

  @IsOptional()
  @IsNotEmpty({ message: '用户名称不能为空' })
  @IsString()
  @ApiProperty({
    description: '用户名称',
    default: '',
    required: false,
  })
  username: string;

  @IsOptional()
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsString()
  @ApiProperty({
    description: '手机号',
    default: '',
    required: false,
  })
  phone: string;

  @IsOptional()
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsString()
  @ApiProperty({
    description: '邮箱',
    default: '',
    required: false,
  })
  email: string;
}
