/*
 * @Date: 2022-11-06 10:11:50
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-06 10:37:24
 * @Description: Do not edit
 */
import { Module } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { UserController } from '@/modules/user/user.controller';
import { User, UserSchema } from '@/modules/user/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
