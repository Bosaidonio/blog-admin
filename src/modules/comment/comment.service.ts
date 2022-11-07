/*
 * @Date: 2022-10-31 16:10:17
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-07 12:59:10
 * @Description: Do not edit
 */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from '@/modules/comment/entities/comment.entity';
import { Article, ArticleDocument } from '@/modules/article/entities/article.entity';
import { CreateCommentDto } from '@/modules/comment/dto/create-comment.dto';
import { UpdateCommentDto, UpdateCommentParms } from '@/modules/comment/dto/update-comment.dto';
import { ArticleMessage, CommentMessage } from '@/contacts/business-message';
import { ResponseStatus } from '@/contacts/response-message';
import { ToLine } from '@/utils';
import { ThrowError } from '@/contacts/throw-error';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
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
}
