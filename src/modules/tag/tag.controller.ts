/*
 * @Date: 2022-10-04 17:59:03
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-07 14:32:13
 * @Description: 标签控制层
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TagService } from '@/modules/tag/tag.service';
import { CreateTagDto } from '@/modules/tag/dto/create-tag.dto';
import { UpdateTagDto } from '@/modules/tag/dto/update-tag.dto';
import { QueryTagDto } from '@/modules/tag/dto/query-tag.dto';
import { ParseIntPipe } from '@/common/pipes/parse-init.pipe';
import { ObjectIdPipe } from '@/common/pipes/object-id.pipe';
@ApiTags('文章标签')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('/create')
  @ApiOperation({ summary: '新增标签' })
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagService.createTag(createTagDto);
  }

  @Get('/list')
  @ApiOperation({ summary: '获取标签列表' })
  findTagList(
    @Query(new ParseIntPipe(['pageNow', 'pageSize', 'status']))
    queryTagDto: QueryTagDto,
  ) {
    return this.tagService.findTagList(queryTagDto);
  }

  @Get('/detail/:id')
  @ApiOperation({ summary: '获取标签详情' })
  findTagById(@Param('id', ObjectIdPipe) id: string) {
    return this.tagService.findTagById(id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: '更新标签' })
  updateTag(@Param('id', ObjectIdPipe) id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.updateTag(id, updateTagDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: '删除标签' })
  deleteTagById(@Param('id', ObjectIdPipe) id: string) {
    return this.tagService.deleteTagById(id);
  }
}
