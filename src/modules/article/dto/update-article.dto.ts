import { ApiProperty, PartialType } from '@nestjs/swagger';
/*
 * @Date: 2022-10-04 18:32:12
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-06 19:04:17
 * @Description: 编辑文章传输对象
 */
import { CreateArticleDto } from '@/modules/article/dto/create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
