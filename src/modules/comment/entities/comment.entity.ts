/*
 * @Date: 2022-10-31 16:10:17
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-02 13:36:56
 * @Description: Do not edit
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { parseTime } from '@/utils/date';
export enum CommentStatus {
  // 未审核
  UNAUDITED = 0,
  // 审核通过
  AUDITED = 1,
  // 审核不通过
  AUDITFAIL = 2,
  // 已删除
  DELETE = 3,
}
@Schema({ versionKey: false })
export class Comment {
  @Prop({ type: 'string', default: '' })
  article_id: string;
  @Prop({ type: 'string', default: '' })
  reply_comment_root_id: string;
  @Prop({ type: 'string', default: '' })
  reply_comment_id: string;
  @Prop({ type: 'string', default: '' })
  user_id: string;
  @Prop({ type: 'string', default: '' })
  comment_desc: string;
  @Prop({ type: 'string', default: CommentStatus.UNAUDITED })
  comment_status: number;
  @Prop({ type: 'string', default: 0 })
  comment_like: number;
  @Prop({ type: 'string', default: parseTime(new Date()) })
  comment_create_time: Date;
  @Prop({ type: 'string', default: parseTime(new Date()) })
  comment_update_time: Date;
}

export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);
