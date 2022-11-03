/*
 * @Date: 2022-10-04 18:00:39
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-03 18:14:49
 * @Description: 新增文章传输对象
 */
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsInt, IsBoolean, IsArray, IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty({ message: 'Article title cannot be empty' })
  @ApiProperty({ description: '文章标题', default: '标题' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Article content cannot be empty' })
  @ApiProperty({ description: '文章简单描述', default: '写一段文章的描述吧 ~' })
  simpleDesc: string;

  @IsString()
  @IsNotEmpty({ message: 'Article content cannot be empty' })
  @ApiProperty({ description: '文章内容', default: '这是一大段的文章内容' })
  articleContent: string;

  @IsString()
  @IsNotEmpty({ message: 'Article content cannot be empty' })
  @ApiProperty({ description: '文章作者', default: 'mario' })
  author: string;

  @IsInt()
  @ApiProperty({ description: '文章是否删除', default: 1 })
  status: number;

  @IsArray()
  @ApiProperty({ description: '文章标签', default: [] })
  tags: string[];

  @IsString()
  @ApiProperty({ description: '文章分类', default: '分类1' })
  category: string;

  @IsString()
  @ApiProperty({ description: '文章封面', default: '' })
  banner: string;

  @IsBoolean()
  @ApiProperty({ description: '文章是否左右布局', default: false })
  isLeftRight: boolean;

  @IsBoolean()
  @ApiProperty({ description: '文章是否置顶', default: false })
  isPinned: boolean;
}
