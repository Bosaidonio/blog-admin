/*
 * @Date: 2022-09-25 22:33:52
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-01 12:22:05
 * @Description: 文章实体
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { parseTime } from '@/utils/date';
import { Tag } from '@/modules/tag/entities/tag.entity';
@Schema({ versionKey: false })
export class Article {
  @Prop()
  title: string;

  @Prop()
  simple_desc: string;

  @Prop()
  article_content: string;

  @Prop()
  author: string;

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
}
export type ArticleDocument = Article & Document;
export const ArticleSchema = SchemaFactory.createForClass(Article);
