/*
 * @Date: 2022-10-04 17:59:03
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-07 19:58:16
 * @Description: 标签控制层
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TagService } from '@/modules/tag/tag.service';
import { CreateTagDto } from '@/modules/tag/dto/create-tag.dto';
import { UpdateTagDto } from '@/modules/tag/dto/update-tag.dto';
import { QueryTagDto } from './dto/query-tag.dto';
import { ParseIntPipe } from '@/common/pipes/parse-init.pipe';
@ApiTags('文章标签')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('create')
  @ApiOperation({ summary: '新增标签' })
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagService.createTag(createTagDto);
  }

  @Get('list')
  @ApiOperation({ summary: '获取标签列表' })
  findTagList(
    @Query(new ParseIntPipe(['pageNow', 'pageSize', 'status']))
    queryTagDto: QueryTagDto,
  ) {
    return this.tagService.findTagList(queryTagDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取标签详情' })
  findTagById(@Param('id') id: string) {
    return this.tagService.findTagById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新标签' })
  updateTag(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.updateTag(id, updateTagDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除标签' })
  deleteTagById(@Param('id') id: string) {
    return this.tagService.deleteTagById(id);
  }
}
