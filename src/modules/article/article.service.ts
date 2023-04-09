/*
 * @Date: 2022-09-25 14:47:55
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-05 17:34:22
 * @Description: 文章服务实现
 */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument, ArticleWithUserInfo } from '@/modules/article/entities/article.entity';
import { CommentDocument, Comment } from '@/modules/comment/entities/comment.entity';
import { CreateArticleDto } from '@/modules/article/dto/create-article.dto';
import { UpdateArticleDto } from '@/modules/article/dto/update-article.dto';
import { ResponseStatus } from '@/contacts/response-message';
import { ArticleMessage, UserMessage } from '@/contacts/business-message';
import { QueryArticleDto } from '@/modules/article/dto/query-article.dto';
import { deleteObjEmptyValue, shuffle, ToLine, toTree, treeToTwoFlatTree } from '@/utils';
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
      const findParams = deleteObjEmptyValue({ status: rest.status, title: { $regex: rest.title } }, rest);
      const articles = await this.articleModel
        .find(findParams)
        .skip((pageNow - 1) * pageSize)
        .limit(pageSize)
        .sort({ create_time: -1 })
        .populate({ path: 'tags' })
        .populate({ path: 'user_id', select: '-password' });

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
    // 1、根据文章id查询出和id有关联的所有评论
    const commentsData = await this.commentModel.find({
      article_id: { $in: articleIds },
    });
    // 2、根据comments中的user_id查询出所有用户信息,并根据user_id对用户信息进行分组
    const userIds = commentsData.map((item) => item.user_id);
    const users = await this.userModel.find({ _id: { $in: userIds } }, '-password');
    const userGroup = users.reduce((prev, cur) => {
      const userId = cur._id.toString();
      if (!prev[userId]) {
        prev[userId] = cur;
      }
      return prev;
    }, {});
    // 3、将用户信息合并到comments中
    const comments = commentsData.map((item) => {
      return {
        ...item.toObject(),
        commentUser: userGroup[item.user_id.toString()],
      };
    });
    // 4、每条子评论中的reply_comment_id是父评论的_id 通过这个关系将子评论和父评论关联起来，形成树状结构
    const commentTree = toTree(comments, '_id', 'reply_comment_id');
    // const commentTree = treeToTwoFlatTree(
    //   JSON.parse(JSON.stringify(comments)),
    //   '_id',
    //   'reply_comment_id',
    //   'root_comment_id',
    // );

    // 5、将commentTree按照article_id分组
    const commentGroup = commentTree.reduce((prev, cur) => {
      const articleId = cur.article_id.toString();
      if (!prev[articleId]) {
        prev[articleId] = [];
      }
      prev[articleId].push(cur);
      return prev;
    }, {});
    // 6、将评论信息合并到文章中
    const articleList = articles.map((item) => {
      const currentItem = JSON.parse(JSON.stringify(item));
      const articleId = currentItem._id;
      return {
        ...currentItem,
        userId: currentItem.user_id._id,
        userInfo: currentItem.user_id,
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
      const findArticle = await this.articleModel
        .findById(id)
        .populate({ path: 'tags' })
        .populate({ path: 'user_id', select: '-password' });
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

  /**
   * @description:  获取热门文章
   * @return {any}
   */
  async findHotArticle() {
    try {
      const hotList = await this.articleModel
        .find({ status: 1 })
        .sort({ visits: -1 })
        .limit(5)
        .populate({ path: 'tags' })
        // 将user_id替换为userInfo
        .populate({
          path: 'user_id',
          select: '-password',
        });

      // 根据文章id统计文章的评论数
      const articleIds = hotList.map((item) => item._id);
      const comments = await this.commentModel.find({ article_id: { $in: articleIds } });
      const commentGroup = this.getCommentGroupByArticleId(comments);
      const result = hotList.map((article) => {
        const { user_id: userInfo, ...rest } = article.toObject();
        return {
          ...rest,
          commentCount: commentGroup[article._id.toString()] || 0,
          userInfo,
        };
      });

      return {
        data: result,
        message: ArticleMessage.ARTICLE_GET_HOT_SUCCESS,
      };
    } catch (error) {
      ThrowError(ArticleMessage.ARTICLE_GET_HOT_FAILED, error.message);
    }
  }

  /**
   * 将评论列表按文章 ID 分组，并返回每篇文章的评论数
   * @param {Object[]} comments - 评论列表
   * @returns {any[]}
   */
  getCommentGroupByArticleId(comments) {
    const commentGroup = comments.reduce((prev, cur) => {
      const articleId = cur.article_id.toString();
      if (!prev[articleId]) {
        prev[articleId] = 0;
      }
      prev[articleId]++;
      return prev;
    }, {});
    return commentGroup;
  }
  // 获取5篇随机文章
  async findRandomArticle() {
    try {
      // 获取所有状态为 1 的文章的 _id
      const idList = await this.articleModel.find({ status: 1 }, { _id: 1 });

      // 随机选择 5 个文章的 _id
      const randomIdList = shuffle(idList)
        .slice(0, 5)
        .map((article) => article._id);

      // 使用 $in 操作符获取这 5 篇文章的信息
      const randomList = await this.articleModel
        .find({ _id: { $in: randomIdList } })
        .populate({ path: 'tags' })
        .populate({ path: 'user_id', select: '-password' });
      // 统计文章的评论数
      const comments = await this.commentModel.find({ article_id: { $in: randomIdList } });
      const commentGroup = this.getCommentGroupByArticleId(comments);
      const result = randomList.map((article) => {
        const { user_id: userInfo, ...rest } = article.toObject();
        return {
          ...rest,
          commentCount: commentGroup[article._id.toString()] || 0,
          userInfo,
        };
      });

      return {
        data: result,
        message: ArticleMessage.ARTICLE_GET_RANDOM_SUCCESS,
      };
    } catch (error) {
      ThrowError(ArticleMessage.ARTICLE_GET_RANDOM_FAILED, error.message);
    }
  }
}
