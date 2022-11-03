/*
 * @Date: 2022-10-31 16:10:17
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-03 19:23:39
 * @Description: Do not edit
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CommentService } from '@/modules/comment/comment.service';
import { CreateCommentDto } from '@/modules/comment/dto/create-comment.dto';
import { UpdateCommentDto, UpdateCommentParms } from '@/modules/comment/dto/update-comment.dto';

@ApiTags('文章评论')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: '获取文章列表' })
  @Post('/create')
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }
  @ApiOperation({ summary: '获取评论列表' })
  @Get('/list')
  findCommentListById(@Query('id') id: string) {
    return this.commentService.findCommentListById(id);
  }
  @ApiOperation({ summary: '更新评论' })
  @Patch('/update/:id')
  updateCommentById(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.updateCommentById(id, updateCommentDto);
  }
  @ApiOperation({ summary: '删除评论' })
  @Delete('/delete/:id')
  removeCommentById(@Param('id') id: string) {
    return this.commentService.removeCommentById(id);
  }
}
