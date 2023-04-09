/*
 * @Date: 2022-08-27 13:01:54
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-03-31 22:42:26
 * @Description: Do not edit
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async login(user: any) {
    const userInfo = await this.userModel.findOne({ username: user.username }, { password: 0 });
    const payload = { username: user.username, sub: user.id };
    // 刷新token
    return {
      data: {
        access_token: this.jwtService.sign(payload),
        refresh_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
        userInfo,
      },
    };
  }

  async refreshToken(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      data: {
        acess_token: this.jwtService.sign(payload),
        // 一天后过期
        refresh_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
      },
    };
  }
}
