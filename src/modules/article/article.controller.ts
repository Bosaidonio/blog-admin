/*
 * @Date: 2022-09-25 14:47:47
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-03 18:16:31
 * @Description: 文章控制器
 */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleService } from '@/modules/article/article.service';
import { CreateArticleDto } from '@/modules/article/dto/create-article.dto';
import { UpdateArticleDto } from '@/modules/article/dto/update-article.dto';
import { QueryArticleDto } from '@/modules/article/dto/query-article.dto';
import { ParseIntPipe } from '@/common/pipes/parse-init.pipe';
@ApiTags('文章')
@Controller('article')
export class ArticleController {
  constructor(private readonly ArticleService: ArticleService) {}

  @Get('/list')
  @ApiOperation({ summary: '获取文章列表' })
  findArticleList(
    @Query(new ParseIntPipe(['pageNow', 'pageSize', 'status']))
    queryArticleDto: QueryArticleDto,
  ) {
    return this.ArticleService.findArticleList(queryArticleDto);
  }

  @Post('/create')
  @ApiOperation({ summary: '新增文章' })
  createArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.ArticleService.createArticle(createArticleDto);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: '更新文章' })
  updateArticle(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.ArticleService.updateArticle(id, updateArticleDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: '删除指定文章' })
  deleteArticleById(@Param('id') id: string) {
    return this.ArticleService.deleteArticleById(id);
  }

  @Get('/detail/:id')
  @ApiOperation({ summary: '获取文章详情' })
  findArticleById(@Param('id') id: string) {
    return this.ArticleService.findArticleById(id);
  }
}
