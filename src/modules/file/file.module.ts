/*
 * @Date: 2022-11-06 15:09:22
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-07 09:22:49
 * @Description: Do not edit
 */
import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema, File } from './entities/file.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: File.name, schema: FileSchema }])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
