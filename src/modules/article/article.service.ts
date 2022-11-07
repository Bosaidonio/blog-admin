/*
 * @Date: 2022-09-25 14:47:55
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-07 12:56:10
 * @Description: 文章服务实现
 */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '@/modules/article/entities/article.entity';
import { CommentDocument, Comment } from '@/modules/comment/entities/comment.entity';
import { CreateArticleDto } from '@/modules/article/dto/create-article.dto';
import { UpdateArticleDto } from '@/modules/article/dto/update-article.dto';
import { ResponseStatus } from '@/contacts/response-message';
import { ArticleMessage, UserMessage } from '@/contacts/business-message';
import { QueryArticleDto } from '@/modules/article/dto/query-article.dto';
import { deleteObjEmptyValue, ToLine, toTree, treeToTwoFlatTree } from '@/utils';
import { User, UserDocument } from '../user/entities/user.entity';
import { ThrowError } from '@/contacts/throw-error';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  /**
   * @description: 创建文章
   * @param {CreateArticleDto} createArticleDto
   * @return {any} 返回文章内容
   */
  async createArticle(createArticleDto: CreateArticleDto) {
    try {
      // 先查询用户是否存在
      const findUser = await this.userModel.findById(createArticleDto.userId);
      if (!findUser) {
        throw new Error(UserMessage.USER_NOT_FOUND);
      }
      await this.articleModel.create(ToLine(createArticleDto));
      return {
        data: null,
        message: ArticleMessage.ARTICLE_CREATE_SUCCESS,
      };
    } catch (error) {
      ThrowError(ArticleMessage.ARTICLE_CREATE_FAILED, error.message);
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
      //先查询文章是否存在
      const findArticle = await this.articleModel.findById(id);
      if (!findArticle) {
        throw new Error(ArticleMessage.ARTICLE_NOT_FOUND);
      }
      await this.articleModel.findByIdAndUpdate(id, {
        ...ToLine(updateArticleDto),
      });
      return {
        data: null,
        message: ArticleMessage.ARTICLE_UPDATE_SUCCESS,
      };
    } catch (error) {
      ThrowError(ArticleMessage.ARTICLE_UPDATE_FAILED, error.message);
    }
  }
  /**
   * @description: 获取文章列表
   * @return {any}
   */
  async findArticleList(queryArticleDto: QueryArticleDto) {
    try {
      const { pageNow, pageSize, ...rest } = queryArticleDto;
      // 使用populate查询关联tags表查询,只返回tags表的tag_name字段
      const findParams = deleteObjEmptyValue({ status: rest.status, title: { $regex: rest.title } }, rest);
      const articles = await this.articleModel
        .find(findParams)
        .skip((pageNow - 1) * pageSize)
        .limit(pageSize)
        .sort({ create_time: -1 })
        .populate({ path: 'tags' });
      // 所有文章id
      const articleIds = articles.map((item) => item._id);
      const articleList = await this.findArticleComments(articles, articleIds);
      const total = await this.articleModel.countDocuments(findParams);
      return {
        data: articleList,
        message: ArticleMessage.ARTICLE_GET_LIST_SUCCESS,
        pageNow,
        pageSize,
        total,
      };
    } catch (error) {
      ThrowError(ArticleMessage.ARTICLE_GET_LIST_FAILED, error.message);
    }
  }
  /**
   * @description: 根据文章id查询文章评论
   * @param {any[]} articles
   * @param {string[]} articleIds
   * @return {any[]}
   */
  async findArticleComments(articles, articleIds) {
    // 根据文章id查询出和id有关联的所有评论
    const comments = await this.commentModel.find({
      article_id: { $in: articleIds },
    });
    // 每条子评论中的reply_comment_id是父评论的_id 通过这个关系将子评论和父评论关联起来，形成树状结构
    const commentTree = toTree(comments, '_id', 'reply_comment_id');
    // const commentTree = treeToTwoFlatTree(
    //   JSON.parse(JSON.stringify(comments)),
    //   '_id',
    //   'reply_comment_id',
    //   'root_comment_id',
    // );

    // 将commentTree按照article_id分组
    const commentGroup = commentTree.reduce((prev, cur) => {
      const articleId = cur.article_id.toString();
      if (!prev[articleId]) {
        prev[articleId] = [];
      }
      prev[articleId].push(cur);
      return prev;
    }, {});
    const articleList = articles.map((item) => {
      const articleId = item._id;
      return {
        ...item.toObject(),
        commentList: commentGroup[articleId] || [],
      };
    });
    return articleList;
  }
  /**
   * @description: 根据id获取文章详情
   * @param {string} id
   * @return {any}
   */
  async findArticleById(id: string) {
    try {
      const findArticle = await this.articleModel.findById(id).populate({ path: 'tags' });
      if (!findArticle) {
        throw new Error(ArticleMessage.ARTICLE_NOT_FOUND);
      }
      const articleDesc = await this.findArticleComments([findArticle], [id]);
      return {
        data: articleDesc[0],
        message: ArticleMessage.ARTICLE_GET_DETAIL_SUCCESS,
      };
    } catch (error) {
      ThrowError(ArticleMessage.ARTICLE_GET_DETAIL_FAILED, error.message);
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
      // 删除文章的同时删除文章下的评论
      await this.commentModel.deleteMany({ article_id: id });
      return {
        data: null,
        message: ArticleMessage.ARTICLE_DELETE_SUCCESS,
      };
    } catch (error) {
      ThrowError(ArticleMessage.ARTICLE_DELETE_FAILED, error.message);
    }
  }
}
