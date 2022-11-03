/*
 * @Date: 2022-09-25 14:37:03
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-31 17:24:28
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
        SWAGGER_SETUP_PATH: Joi.string().default('api-docs'),
        SWAGGER_ENDPOINT_PREFIX: Joi.string().default('blog/v1'),
        SWAGGER_UI_TITLE: Joi.string().default('Swagger文档标题'),
        SWAGGER_UI_DESCRIPTION: Joi.string().default('赶紧改相关配置啊~~'),
        SWAGGER_API_VERSION: Joi.string().default('1.0'),
        NODE_ENV: Joi.string().valid('development', 'production', 'test'),
        MONGO_HOST: Joi.string().default('localhost'),
        MONGO_PORT: Joi.number().default(27017),
        MONGO_USERNAME: Joi.string().default('root'),
        MONGO_PASSWORD: Joi.string().default('123456'),
        MONGO_DATABASE: Joi.string().default('blog-admin'),
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
    ArticleModule,
    TagModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).exclude().forRoutes('/');
  }
}
