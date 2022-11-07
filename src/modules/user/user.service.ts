/*
 * @Date: 2022-11-06 10:11:50
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-07 13:01:50
 * @Description: Do not edit
 */
import { UserMessage } from '@/contacts/business-message';
import { ResponseStatus } from '@/contacts/response-message';
import { Header, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { genSaltSync, hashSync } from 'bcryptjs';
import { QueryUserDto } from './dto/query-user.dto';
import { deleteObjEmptyValue } from '@/utils';
import { ThrowError } from '@/contacts/throw-error';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * @description: 创建用户
   * @param {CreateUserDto} createUserDto
   * @return {*}
   */
  async createUser(createUserDto: CreateUserDto) {
    try {
      // 根据用户名查询用户信息，如果用户名称和手机号与数据库中的重复，则返回错误信息
      const findUser = await this.userModel.findOne({ username: createUserDto.username });
      if (findUser && findUser.username === createUserDto.username && findUser.phone === createUserDto.phone) {
        throw new Error(UserMessage.USER_ALREADY_EXISTS);
      }
      const salt = genSaltSync(10);
      const hashPassword = hashSync(createUserDto.password, salt);
      await this.userModel.create({
        ...createUserDto,
        password: hashPassword,
      });
      return {
        data: null,
        message: UserMessage.USER_REGISTER_SUCCESS,
      };
    } catch (error) {
      ThrowError(UserMessage.USER_REGISTER_FAILED, error.message);
    }
  }
  /**
   * @description: 查询所有用户
   * @return {*}
   */
  async findAllUser(queryArticleDto: QueryUserDto) {
    try {
      const { pageNow, pageSize, ...rest } = queryArticleDto;
      const findParams = deleteObjEmptyValue(
        {
          username: { $regex: queryArticleDto.username },
          phone: rest.phone,
        },
        rest,
      );
      const skip = (pageNow - 1) * pageSize;
      const total = await this.userModel.countDocuments();
      const userList = await this.userModel.find(findParams, { _id: 0, password: 0 }).skip(skip).limit(pageSize);
      return {
        data: userList,
        pageNow,
        pageSize,
        total,
        message: UserMessage.USER_GET_LIST_FAILED,
      };
    } catch (error) {
      ThrowError(UserMessage.USER_GET_LIST_FAILED, error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
