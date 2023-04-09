/*
 * @Date: 2022-09-25 14:47:47
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-02 17:46:01
 * @Description: 文章控制器
 */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleService } from '@/modules/article/article.service';
import { CreateArticleDto } from '@/modules/article/dto/create-article.dto';
import { UpdateArticleDto } from '@/modules/article/dto/update-article.dto';
import { QueryArticleDto } from '@/modules/article/dto/query-article.dto';
import { ParseIntPipe } from '@/common/pipes/parse-init.pipe';
import { ObjectIdPipe } from '@/common/pipes/object-id.pipe';
import { AuthGuard } from '@nestjs/passport';
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
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '新增文章' })
  createArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.ArticleService.createArticle(createArticleDto);
  }

  @Patch('/update/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新文章' })
  updateArticle(@Param('id', ObjectIdPipe) id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.ArticleService.updateArticle(id, updateArticleDto);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除指定文章' })
  deleteArticleById(@Param('id', ObjectIdPipe) id: string) {
    return this.ArticleService.deleteArticleById(id);
  }

  @Get('/detail/:id')
  @ApiOperation({ summary: '获取文章详情' })
  findArticleById(@Param('id', ObjectIdPipe) id: string) {
    return this.ArticleService.findArticleById(id);
  }

  @Get('/hot')
  @ApiOperation({ summary: '获取热门文章' })
  findHotArticle() {
    return this.ArticleService.findHotArticle();
  }

  @Get('/random')
  @ApiOperation({ summary: '获取随机文章' })
  findRandomArticle() {
    return this.ArticleService.findRandomArticle();
  }
}
