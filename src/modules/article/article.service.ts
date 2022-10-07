/*
 * @Date: 2022-09-25 14:47:55
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-07 19:44:32
 * @Description: 文章服务实现
 */
import { HttpException, Injectable } from '@nestjs/common';
import {
  Article,
  ArticleDocument,
} from '@/modules/article/entities/article.entity';
import { CreateArticleDto } from '@/modules/article/dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { deleteObjEmptyValue, ToLine } from '@/utils';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseStatus } from '@/contacts/response-message';
import { ArticleMessage } from '@/contacts/business-message';
import { QueryArticleDto } from './dto/query-article.dto';
@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  /**
   * @description: 创建文章
   * @param {CreateArticleDto} createArticleDto
   * @return {any} 返回文章内容
   */
  async createArticle(createArticleDto: CreateArticleDto) {
    try {
      // 先查询文章是否存在
      const findArticle = await this.articleModel.findOne({
        title: createArticleDto.title,
      });
      if (findArticle) {
        throw new Error(ArticleMessage.ARTICLE_ALREADY_EXISTS);
      }
      const createArticle = await this.articleModel.create(
        ToLine(createArticleDto),
      );
      return {
        data: createArticle,
        message: ArticleMessage.ARTICLE_CREATE_SUCCESS,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: ArticleMessage.ARTICLE_CREATE_FAILED,
          error: error.message,
        },
        ResponseStatus.REQUEST_PARAMS_ERROR,
      );
    }
  }
  /**
   * @description: 更新文章
   * @param {string} id
   * @param {UpdateArticleDto} updateArticleDto
   * @return {any}
   */
  async updateArticle(id: string, updateArticleDto: UpdateArticleDto) {
    // 根据id修改文章信息
    try {
      await this.articleModel.findByIdAndUpdate(id, {
        ...ToLine(updateArticleDto),
      });
      const article = await this.articleModel.findById(id).populate({
        path: 'tags',
      });
      return {
        message: ArticleMessage.ARTICLE_UPDATE_SUCCESS,
        data: article,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: ArticleMessage.ARTICLE_UPDATE_FAILED,
          error: error.message,
        },
        ResponseStatus.REQUEST_PARAMS_ERROR,
      );
    }
  }
  /**
   * @description: 获取文章列表
   * @return {any}
   */
  async findArticleList(queryArticleDto: QueryArticleDto) {
    try {
      const { pageNow, pageSize, title, status } = queryArticleDto;
      // 使用聚合查询关联tags表查询,只返回tags表的tag_name字段
      // const articles = await this.articleModel.aggregate([
      //   {
      //     $lookup: {
      //       from: 'tags',
      //       localField: 'tags',
      //       foreignField: '_id',
      //       as: 'tags',
      //     },
      //   },
      //   {
      //     $project: {
      //       title: 1,
      //       simple_desc: 1,
      //       article_content: 1,
      //       tags: {
      //         tag_name: 1,
      //       },
      //     },
      //   },
      // ]);
      // 使用populate查询关联tags表查询,只返回tags表的tag_name字段
      const findParams = deleteObjEmptyValue(
        { status, title: { $regex: title } },
        { title, status },
      );

      const articles = await this.articleModel
        .find(findParams)
        .skip((pageNow - 1) * pageSize)
        .limit(pageSize)
        .sort({ create_time: -1 })
        .populate({ path: 'tags' });

      const total = await this.articleModel.countDocuments(findParams);

      return {
        data: articles,
        message: ArticleMessage.ARTICLE_GET_LIST_SUCCESS,
        pageNow,
        pageSize,
        total,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: ArticleMessage.ARTICLE_GET_LIST_FAILED,
          error: error.message,
        },
        ResponseStatus.REQUEST_PARAMS_ERROR,
      );
    }
  }
  /**
   * @description: 根据id获取文章详情
   * @param {string} id
   * @return {any}
   */
  async findArticleById(id: string) {
    try {
      const article = await this.articleModel.findById(id).populate({
        path: 'tags',
      });
      if (!article) {
        throw new Error(ArticleMessage.ARTICLE_NOT_FOUND);
      }
      return {
        data: article,
        message: ArticleMessage.ARTICLE_GET_DETAIL_SUCCESS,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: ArticleMessage.ARTICLE_GET_DETAIL_FAILED,
          error: error.message,
        },
        ResponseStatus.REQUEST_PARAMS_ERROR,
      );
    }
  }
  /**
   * @description:  删除文章
   * @param {string} id
   * @return {any} 返回删除文章内容
   */
  async deleteArticleById(id: string) {
    try {
      const article = await this.articleModel.findByIdAndDelete(id);
      if (!article) {
        throw new Error(ArticleMessage.ARTICLE_NOT_FOUND);
      }
      return {
        data: article,
        message: ArticleMessage.ARTICLE_DELETE_SUCCESS,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: ArticleMessage.ARTICLE_DELETE_FAILED,
          error: error.message,
        },
        ResponseStatus.REQUEST_PARAMS_ERROR,
      );
    }
  }
}
