/*
 * @Date: 2022-10-31 16:10:17
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-03 18:17:19
 * @Description: Do not edit
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from '@/modules/comment/comment.controller';
import { CommentService } from '@/modules/comment/comment.service';
import { Comment, CommentSchema } from '@/modules/comment/entities/comment.entity';
import { Article, ArticleSchema } from '@/modules/article/entities/article.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Article.name, schema: ArticleSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
