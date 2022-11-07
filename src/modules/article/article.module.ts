/*
 * @Date: 2022-09-25 14:47:28
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-06 14:07:11
 * @Description: 文章模块
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController } from '@/modules/article/article.controller';
import { ArticleService } from '@/modules/article/article.service';
import { Article, ArticleSchema } from '@/modules/article/entities/article.entity';
import { Comment, CommentSchema } from '@/modules/comment/entities/comment.entity';
import { User, UserSchema } from '../user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
