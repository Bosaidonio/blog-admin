/*
 * @Date: 2022-09-25 14:37:03
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-09 13:17:12
 * @Description: 主入口
 */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as shell from 'shelljs';
import { AppModule } from '@/app.module';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { TransformInterceptor } from '@/common/interceptors/transform-interceptor';
import { startLogger } from '@/utils/start-logger';
import { ValidationPipe } from '@/common/pipes/validation.pipe';
import { RouterMiddleware } from './common/middleware/router.middleware';
import { checkServiceEnv } from '@/utils/check-service-env';
import { INestApplication } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(RouterMiddleware(app));
  // 配置静态资源目录
  app.useStaticAssets('static');
  // 设置全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 设置全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 设置管道
  app.useGlobalPipes(new ValidationPipe());
  // 设置全局路由前缀
  app.setGlobalPrefix(process.env.SWAGGER_ENDPOINT_PREFIX);
  // 注册 swagger
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_UI_TITLE)
    .setDescription(process.env.SWAGGER_UI_DESCRIPTION)
    .setVersion(process.env.SWAGGER_API_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER_SETUP_PATH, app, document);
  await app.listen(process.env.SERVER_LISTEN_PORT);
  startLogger();
}

(async () => {
  const result = await checkServiceEnv();
  if (result) {
    bootstrap();
  } else {
    shell.exit(1);
  }
})();
