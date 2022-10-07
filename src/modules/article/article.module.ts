/*
 * @Date: 2022-09-25 14:47:28
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-05 20:05:00
 * @Description: 文章模块
 */
import { Module } from '@nestjs/common';
import { ArticleController } from '@/modules/article/article.controller';
import { ArticleService } from '@/modules/article/article.service';
import {
  Article,
  ArticleSchema,
} from '@/modules/article/entities/article.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
