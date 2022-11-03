/*
 * @Date: 2022-10-31 16:10:17
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-03 19:13:41
 * @Description: Do not edit
 */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCommentParms {
  articleId: string;
  commentId: string;
}
export class UpdateCommentDto {
  @IsString()
  @ApiProperty({ description: '评论id', default: '' })
  articleId: string;
  @IsString()
  @IsNotEmpty({ message: 'Comment desc cannot be empty' })
  @ApiProperty({ description: '评论内容', default: '' })
  commentDesc: string;

  @IsNumber()
  @ApiProperty({ description: '评论状态', default: 0 })
  commentStatus: number;
}
