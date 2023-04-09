/*
 * @Date: 2023-04-05 17:36:34
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-05 17:44:52
 * @Description: Do not edit
 */
import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '../article/entities/article.entity';
import { Comment, CommentSchema } from '../comment/entities/comment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
