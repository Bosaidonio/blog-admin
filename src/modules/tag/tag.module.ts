/*
 * @Date: 2022-10-04 17:59:03
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-03 20:07:14
 * @Description: Do not edit
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagController } from '@/modules/tag/tag.controller';
import { TagService } from '@/modules/tag/tag.service';
import { Tag, TagSchema } from '@/modules/tag/entities/tag.entity';
import { Article, ArticleSchema } from '../article/entities/article.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tag.name, schema: TagSchema },
      { name: Article.name, schema: ArticleSchema },
    ]),
  ],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
