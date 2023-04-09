/*
 * @Date: 2022-10-31 16:10:17
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-02 15:14:22
 * @Description: Do not edit
 */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument, CommentStatus } from '@/modules/comment/entities/comment.entity';
import { Article, ArticleDocument } from '@/modules/article/entities/article.entity';
import { CreateCommentDto } from '@/modules/comment/dto/create-comment.dto';
import { UpdateCommentDto, UpdateCommentParms } from '@/modules/comment/dto/update-comment.dto';
import { ArticleMessage, CommentMessage, UserMessage } from '@/contacts/business-message';
import { ResponseStatus } from '@/contacts/response-message';
import { ToLine } from '@/utils';
import { ThrowError } from '@/contacts/throw-error';
import { User, UserDocument } from '../user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  /**
   *
   * @description: 创建评论
   * @param {CreateCommentDto} createCommentDto
   * @return {any} 返回评论内容
   */
  async createComment(createCommentDto: CreateCommentDto) {
    try {
      // 先查询文章是否存在
      const findArticle = await this.articleModel.findOne({
        _id: createCommentDto.articleId,
      });

      if (!findArticle) {
        throw new Error(ArticleMessage.ARTICLE_NOT_FOUND);
      }
      // 查询用户是否存在
      const findUser = await this.userModel.findOne({
        _id: createCommentDto.userId,
      });
      if (!findUser) {
        throw new Error(UserMessage.USER_NOT_FOUND);
      }
      // 创建评论
      const createComment = await this.commentModel.create(ToLine(createCommentDto));
      return {
        data: createComment,
        message: CommentMessage.COMMENT_CREATE_SUCCESS,
      };
    } catch (error) {
      ThrowError(CommentMessage.COMMENT_CREATE_FAILED, error.message);
    }
  }
  /**
   * @description: 根据文章id查询评论列表
   * @param {string} id
   * @return {*}
   */
  async findCommentListById(id) {
    try {
      const commentList = await this.commentModel.find({ article_id: id });
      return {
        data: commentList,
        message: CommentMessage.COMMENT_GET_LIST_SUCCESS,
      };
    } catch (error) {
      ThrowError(CommentMessage.COMMENT_GET_LIST_FAILED, error.message);
    }
  }
  /**
   * @description: 更新评论
   * @param {number} id
   * @param {UpdateCommentDto} updateCommentDto
   * @return {*}
   */
  async updateCommentById(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      // 先查询文章是否存在
      const findArticle = await this.articleModel.findOne({
        _id: updateCommentDto.articleId,
      });
      if (!findArticle) {
        throw new Error(ArticleMessage.ARTICLE_NOT_FOUND);
      }
      // 在查询评论是否存在
      const findComment = await this.commentModel.findOne({
        _id: id,
      });
      // 判断文章和评论是否匹配
      if (findComment.article_id !== updateCommentDto.articleId) {
        throw new Error(CommentMessage.COMMENT_ARTICLE_NOT_MATCH);
      }
      if (!findComment) {
        throw new Error(CommentMessage.COMMENT_NOT_FOUND);
      }
      await this.commentModel.findOneAndUpdate(
        {
          article_id: updateCommentDto.articleId,
          _id: id,
        },
        ToLine(updateCommentDto),
        { new: true },
      );

      return {
        data: null,
        message: CommentMessage.COMMENT_UPDATE_SUCCESS,
      };
    } catch (error) {
      ThrowError(CommentMessage.COMMENT_UPDATE_FAILED, error.message);
    }
  }
  /**
   * @description: 删除评论
   * @param {string} id
   * @return {*}
   */
  async removeCommentById(id: string) {
    try {
      // 先查询评论是否存在
      const findComment = await this.commentModel.findOne({
        _id: id,
      });
      if (!findComment) {
        throw new Error(CommentMessage.COMMENT_NOT_FOUND);
      }
      // 删除评论，如果有子评论，一并删除
      await this.commentModel.deleteMany({
        $or: [{ _id: id }, { reply_comment_id: id }],
      });
      return {
        data: null,
        message: CommentMessage.COMMENT_DELETE_SUCCESS,
      };
    } catch (error) {
      ThrowError(CommentMessage.COMMENT_DELETE_FAILED, error.message);
    }
  }

  // 获取热门评论
  async findHotCommentList() {
    try {
      // 获取comment_status为1的评论，按照点赞数排序，取前五条
      const comentList = await this.commentModel
        .find({ comment_status: CommentStatus.AUDITED })
        .sort({ like_count: -1 })
        .limit(5);
      // 去除重复文章id的评论
      const hotCommentList = comentList.reduce((result, item) => {
        // 判断结果数组中是否已经有相同的文章 id
        const isSame = result.some((subItem) => subItem.article_id === item.article_id);
        if (!isSame) {
          result.push(item);
        }
        return result;
      }, []);
      return {
        data: hotCommentList,
        message: CommentMessage.COMMENT_GET_LIST_SUCCESS,
      };
    } catch (error) {
      ThrowError(CommentMessage.COMMENT_GET_LIST_FAILED, error.message);
    }
  }
}
