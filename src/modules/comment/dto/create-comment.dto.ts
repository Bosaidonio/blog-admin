/*
 * @Date: 2022-10-31 16:10:17
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-03 17:25:25
 * @Description: Do not edit
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: 'Comment desc cannot be empty' })
  @ApiProperty({ description: '评论内容', default: '评论内容' })
  commentDesc: string;

  @IsString()
  @IsNotEmpty({ message: 'User id cannot be empty' })
  @ApiProperty({ description: '用户ID', default: '' })
  userId: string;

  @IsString()
  @IsNotEmpty({ message: 'User id cannot be empty' })
  @ApiProperty({ description: '文章ID', default: '' })
  articleId: string;

  @IsString()
  @ApiProperty({ description: '要回复的评论id', default: '' })
  replyCommentId: string;

  @IsNumber()
  @ApiProperty({ description: '评论状态', default: 0 })
  commentStatus: number;
}
