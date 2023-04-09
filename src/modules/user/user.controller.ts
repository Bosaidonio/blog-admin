/*
 * @Date: 2022-11-06 10:11:50
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-03-12 12:58:56
 * @Description: Do not edit
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Header, HttpCode, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryUserDto } from './dto/query-user.dto';
import { ParseIntPipe } from '@/common/pipes/parse-init.pipe';
import { ObjectIdPipe } from '@/common/pipes/object-id.pipe';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('用户')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  @ApiOperation({ summary: '创建用户' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('/list')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '获取用户列表' })
  findAllUser(
    @Query(new ParseIntPipe(['pageNow', 'pageSize']))
    queryArticleDto: QueryUserDto,
  ) {
    return this.userService.findAllUser(queryArticleDto);
  }

  @Get('/detail/:id')
  @ApiOperation({ summary: '根据id获取用户详情' })
  findOneUserById(@Param('id', ObjectIdPipe) id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: '更新用户信息' })
  updateUserInfo(@Param('id', ObjectIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: '删除用户' })
  removeUser(@Param('id', ObjectIdPipe) id: string) {
    return this.userService.remove(+id);
  }
}
