/*
 * @Date: 2022-11-06 10:11:50
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-07 14:32:31
 * @Description: Do not edit
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Header, HttpCode, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryUserDto } from './dto/query-user.dto';
import { ParseIntPipe } from '@/common/pipes/parse-init.pipe';
import { ObjectIdPipe } from '@/common/pipes/object-id.pipe';
@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('/list')
  findAllUser(
    @Query(new ParseIntPipe(['pageNow', 'pageSize']))
    queryArticleDto: QueryUserDto,
  ) {
    return this.userService.findAllUser(queryArticleDto);
  }

  @Get('/detail/:id')
  findOneUserById(@Param('id', ObjectIdPipe) id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('/update/:id')
  updateUserInfo(@Param('id', ObjectIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('/delete/:id')
  removeUser(@Param('id', ObjectIdPipe) id: string) {
    return this.userService.remove(+id);
  }
}
