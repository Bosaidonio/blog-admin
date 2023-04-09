/*
 * @Date: 2022-08-27 13:01:54
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-03-12 13:13:09
 * @Description: Do not edit
 */
import { Module } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { AuthController } from './auth.controller';
import LocalStrategy from '@/modules/auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  // exports: [AuthService],
})
export class AuthModule {}
