/*
 * @Date: 2022-10-04 17:59:03
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-05 20:10:02
 * @Description: Do not edit
 */
import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { Tag, TagSchema } from '@/modules/tag/entities/tag.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
