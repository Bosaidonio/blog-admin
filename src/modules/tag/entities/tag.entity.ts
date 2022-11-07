/*
 * @Date: 2022-10-04 17:59:03
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-06 13:59:18
 * @Description: 标签实体
 */
import { parseTime } from '@/utils/date';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Tag {
  @Prop()
  tag_name: string;
  @Prop({ type: 'string', default: parseTime(new Date()) })
  create_time: string;
  @Prop({ type: 'string', default: parseTime(new Date()) })
  update_time: string;
  @Prop()
  status: number;
}

export type TagDocument = Tag & Document;
export const TagSchema = SchemaFactory.createForClass(Tag);
