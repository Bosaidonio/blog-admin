/*
 * @Date: 2022-09-25 22:33:52
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-02 18:39:07
 * @Description: 文章实体
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { parseTime } from '@/utils/date';
import { Tag } from '@/modules/tag/entities/tag.entity';
import { User } from '@/modules/user/entities/user.entity';
@Schema({ versionKey: false })
export class Article {
  @Prop()
  title: string;

  @Prop()
  simple_desc: string;

  @Prop()
  article_content: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id: User;

  @Prop({ type: 'string', default: parseTime(new Date()) })
  create_time: string;

  @Prop({ type: 'string', default: parseTime(new Date()) })
  update_time: string;

  @Prop()
  status: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Tag' }] })
  tags: Tag[];

  @Prop()
  category: string;

  @Prop()
  banner: string;

  @Prop()
  is_left_right: boolean;

  @Prop()
  is_pinned: boolean;

  @Prop({ type: 'boolean', default: true })
  is_comment: boolean;

  @Prop({ type: 'number', default: 0 })
  visits: number;
}

export interface ArticleWithUserInfo extends Article {
  userInfo: User;
}
export type ArticleDocument = Article & Document;
export const ArticleSchema = SchemaFactory.createForClass(Article);
