/*
 * @Date: 2022-10-04 17:59:03
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-07 20:04:18
 * @Description: 标签服务层
 */
import { HttpException, Injectable } from '@nestjs/common';
import { CreateTagDto } from '@/modules/tag/dto/create-tag.dto';
import { UpdateTagDto } from '@/modules/tag/dto/update-tag.dto';
import { Tag, TagDocument } from '@/modules/tag/entities/tag.entity';
import { InjectModel } from '@nestjs/mongoose';
import { deleteObjEmptyValue, ToLine } from '@/utils';
import { Model } from 'mongoose';
import { ResponseStatus } from '@/contacts/response-message';
import { ArticleMessage, TagMessage } from '@/contacts/business-message';
import { QueryTagDto } from './dto/query-tag.dto';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) {}

  /**
   * @description: 创建标签
   * @param {CreateTagDto} createTagDto
   * @return {any}
   */
  async createTag(createTagDto: CreateTagDto) {
    try {
      const findTag = await this.tagModel.findOne({
        tag_name: createTagDto.tagName,
      });
      if (findTag) {
        throw new Error(TagMessage.TAG_ALREADY_EXISTS);
      }
      const createTag = await this.tagModel.create(ToLine(createTagDto));
      return {
        data: createTag,
        message: TagMessage.TAG_CREATE_SUCCESS,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: TagMessage.TAG_CREATE_FAILED,
          error: error.message,
        },
        ResponseStatus.REQUEST_PARAMS_ERROR,
      );
    }
  }
  /**
   * @description: 获取标签列表
   * @return {*}
   */
  async findTagList(queryTagDto: QueryTagDto) {
    try {
      const { pageNow, pageSize, status } = queryTagDto;
      const findParams = deleteObjEmptyValue(
        {
          status,
        },
        { status },
      );
      const tags = await this.tagModel
        .find(findParams)
        .skip((pageNow - 1) * pageSize)
        .limit(pageSize)
        .sort({ create_time: -1 });
      const total = await this.tagModel.countDocuments(findParams);
      return {
        data: tags,
        pageNow,
        pageSize,
        total,
        message: TagMessage.TAG_GET_LIST_SUCCESS,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: TagMessage.TAG_GET_LIST_FAILED,
          error: error.message,
        },
        ResponseStatus.REQUEST_PARAMS_ERROR,
      );
    }
  }
  /**
   * @description: 根据标签id获取标签详情
   * @param {string} id
   * @return {any}
   */
  async findTagById(id: string) {
    try {
      const tag = await this.tagModel.findById(id);
      return {
        data: tag,
        message: TagMessage.TAG_GET_DETAIL_SUCCESS,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: TagMessage.TAG_GET_DETAIL_FAILED,
          error: error.message,
        },
        ResponseStatus.REQUEST_PARAMS_ERROR,
      );
    }
  }
  /**
   * @description: 根据标签id更新标签
   * @param {string} id
   * @param {UpdateTagDto} updateTagDto
   * @return {any}
   */
  async updateTag(id: string, updateTagDto: UpdateTagDto) {
    try {
      console.log(id, updateTagDto);

      await this.tagModel.findByIdAndUpdate(id, {
        ...ToLine(updateTagDto),
      });
      const tag = await this.tagModel.findById(id);
      return {
        data: tag,
        message: TagMessage.TAG_UPDATE_SUCCESS,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: TagMessage.TAG_UPDATE_FAILED,
          error: error.message,
        },
        ResponseStatus.REQUEST_PARAMS_ERROR,
      );
    }
  }
  /**
   * @description: 根据标签id删除标签
   * @param {string} id
   * @return {*}
   */
  async deleteTagById(id: string) {
    try {
      const tag = await this.tagModel.findByIdAndDelete(id);
      if (!tag) {
        throw new Error(TagMessage.TAG_ALREADY_EXISTS);
      }
      return {
        data: tag,
        message: TagMessage.TAG_DELETE_SUCCESS,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: TagMessage.TAG_DELETE_FAILED,
          error: error.message,
        },
        ResponseStatus.REQUEST_PARAMS_ERROR,
      );
    }
  }
}
