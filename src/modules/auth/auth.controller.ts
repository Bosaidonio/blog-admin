/*
 * @Date: 2022-08-27 13:01:54
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-02-25 22:10:03
 * @Description: Do not edit
 */
import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@/modules/auth/auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('权限')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  // 设置响应状态码
  @HttpCode(200)
  @Post('/login')
  @ApiOperation({ summary: '用户登录' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // 刷新token
  @UseGuards(AuthGuard('jwt'))
  @Post('/refreshToken')
  @ApiOperation({ summary: '刷新token' })
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
