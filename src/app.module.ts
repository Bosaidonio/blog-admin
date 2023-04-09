/*
 * @Date: 2022-09-25 14:37:03
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-05 17:36:42
 * @Description: Do not edit
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'Joi';
import { ArticleModule } from '@/modules/article/article.module';
import { getEnvFilePath } from '@/utils/env-config-path';
import { LoggerMiddleware } from '@/common/middleware/logger.middleware';
import { TagModule } from '@/modules/tag/tag.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModule } from './modules/comment/comment.module';
import { UserModule } from './modules/user/user.module';
import { FileModule } from './modules/file/file.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChatGptModule } from './modules/chatgpt/chat-gpt.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      encoding: 'utf-8',
      envFilePath: [...getEnvFilePath()],
      expandVariables: true, // 开启嵌套变量
      ignoreEnvVars: true, // 忽略.env文件的读取
      load: [], // 加载环境变量的工厂函数,用于自定义加载环境变量
      validationSchema: Joi.object({
        SERVER_LISTEN_PORT: Joi.number().default(8088),
        SERVICE_BASE_URL: Joi.string().default(''),
        SWAGGER_SETUP_PATH: Joi.string().default('api-docs'),
        SWAGGER_ENDPOINT_PREFIX: Joi.string().default('blog/v1'),
        SWAGGER_UI_TITLE: Joi.string().default('Swagger文档标题'),
        SWAGGER_UI_DESCRIPTION: Joi.string().default('赶紧改相关配置啊~~'),
        SWAGGER_API_VERSION: Joi.string().default('1.0'),
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test'),
        MONGO_HOST: Joi.string().default('localhost'),
        MONGO_PORT: Joi.number().default(27017),
        MONGO_USERNAME: Joi.string().default('root'),
        MONGO_PASSWORD: Joi.string().default('123456'),
        MONGO_DATABASE: Joi.string().default('blog-admin'),
        OSS_ACCESS_KEY_ID: Joi.string().default(''),
        OSS_ACCESS_KEY_SECRET: Joi.string().default(''),
        OSS_BUCKET: Joi.string().default(''),
        OSS_REGION: Joi.string().default(''),
        OSS_DIR: Joi.string().default(''),
        OSS_ENDPOINT: Joi.string().default(''),
        OSS_CALLBACK_VERIFY_URL: Joi.string().default(''),
        OPENAI_API_KEY: Joi.string().default(''),
      }),
      validationOptions: {
        allowUnknown: false, // 控制是否允许环境变量中未知的键。默认为true。
        abortEarly: true, // 如果为true，在遇到第一个错误时就停止验证；如果为false，返回所有错误。默认为false。
      },
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`,
      {
        user: process.env.MONGO_USERNAME,
        pass: process.env.MONGO_PASSWORD,
      },
    ),
    AuthModule,
    ArticleModule,
    TagModule,
    CommentModule,
    UserModule,
    FileModule,
    ChatGptModule,
    StatisticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude().forRoutes('/');
  }
}
