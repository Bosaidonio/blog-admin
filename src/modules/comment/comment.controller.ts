/*
 * @Date: 2022-10-31 16:10:17
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-02 13:32:48
 * @Description: Do not edit
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CommentService } from '@/modules/comment/comment.service';
import { CreateCommentDto } from '@/modules/comment/dto/create-comment.dto';
import { UpdateCommentDto, UpdateCommentParms } from '@/modules/comment/dto/update-comment.dto';
import { ObjectIdPipe } from '@/common/pipes/object-id.pipe';

@ApiTags('文章评论')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: '创建评论' })
  @Post('/create')
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @ApiOperation({ summary: '获取评论列表' })
  @Get('/list')
  findCommentListById(@Query('id', ObjectIdPipe) id: string) {
    return this.commentService.findCommentListById(id);
  }
  @ApiOperation({ summary: '更新评论' })
  @Patch('/update/:id')
  updateCommentById(@Param('id', ObjectIdPipe) id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.updateCommentById(id, updateCommentDto);
  }
  @ApiOperation({ summary: '删除评论' })
  @Delete('/delete/:id')
  removeCommentById(@Param('id', ObjectIdPipe) id: string) {
    return this.commentService.removeCommentById(id);
  }

  // 获取热门评论
  @ApiOperation({ summary: '获取热门评论' })
  @Get('/hot')
  findHotCommentList() {
    return this.commentService.findHotCommentList();
  }
}
