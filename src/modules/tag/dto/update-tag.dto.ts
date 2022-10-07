/*
 * @Date: 2022-10-04 17:59:03
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-05 15:14:18
 * @Description: 编辑标签传输对象
 */
import { PartialType } from '@nestjs/swagger';
import { CreateTagDto } from '@/modules/tag/dto/create-tag.dto';

export class UpdateTagDto extends PartialType(CreateTagDto) {}
