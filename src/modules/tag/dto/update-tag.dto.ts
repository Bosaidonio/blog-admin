/*
 * @Date: 2022-10-04 17:59:03
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-03 19:41:31
 * @Description: 编辑标签传输对象
 */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
export class UpdateTagDto {
  @IsString()
  @IsNotEmpty({ message: '标签名称不能为空' })
  @ApiProperty({ description: '标签名称', default: '标签名称' })
  tagName: string;
  @IsInt()
  @IsNotEmpty({ message: '标签状态不能为空' })
  @ApiProperty({ description: '标签状态', default: 1 })
  status: number;
}
