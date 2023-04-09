import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy } from 'passport-local';
import { User, UserDocument } from '../user/entities/user.entity';
import { compareSync } from 'bcryptjs';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    // 从数据库中验证用户
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException({
        message: '用户不存在',
        error: 'Invalid credentials',
      });
    }
    // 验证密码
    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException({
        message: '密码错误',
        error: 'Invalid credentials',
      });
    }

    return { username, id: user._id };
  }
}
