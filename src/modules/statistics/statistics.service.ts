/*
 * @Date: 2023-04-05 17:36:34
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-09 13:57:54
 * @Description: Do not edit
 */
import { Injectable } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from '../article/entities/article.entity';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from '../comment/entities/comment.entity';
import { ArticleMessage, StatisticsMessage } from '@/contacts/business-message';
import { ThrowError } from '@/contacts/throw-error';
import { runTime, timeAgo } from '@/utils/date';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}
  create(createStatisticDto: CreateStatisticDto) {
    return 'This action adds a new statistic';
  }

  async findBlobInfo() {
    // 获取文章数量、评论数量
    try {
      const articleCount = await this.articleModel.countDocuments();
      const commentCount = await this.commentModel.countDocuments();
      // 获取最早发布的文章的时间
      const earliestArticle = await this.articleModel.findOne().sort({ create_time: 1 });
      // 获取最晚发布的文章时间
      const lateArticle = await this.articleModel.findOne().sort({ create_time: -1 });
      // 计算最后活动时间
      const lastEventTime = timeAgo(lateArticle.create_time);
      //
      // 运行天数
      const runDays = runTime(earliestArticle.create_time);
      return {
        data: {
          articleCount,
          commentCount,
          lastEventTime,
          runDays,
        },
        message: StatisticsMessage.BLOGINFO_GET_SUCCESS,
      };
    } catch (error) {
      ThrowError(StatisticsMessage.BLOGINFO_GET_FAILED, error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} statistic`;
  }

  update(id: number, updateStatisticDto: UpdateStatisticDto) {
    return `This action updates a #${id} statistic`;
  }

  remove(id: number) {
    return `This action removes a #${id} statistic`;
  }
}
