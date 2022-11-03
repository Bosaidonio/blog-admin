/*
 * @Date: 2022-09-25 14:47:28
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-03 18:16:45
 * @Description: 文章模块
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController } from '@/modules/article/article.controller';
import { ArticleService } from '@/modules/article/article.service';
import { Article, ArticleSchema } from '@/modules/article/entities/article.entity';
import { Comment, CommentSchema } from '@/modules/comment/entities/comment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
