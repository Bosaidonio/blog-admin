/*
 * @Date: 2022-11-06 15:09:22
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-12 15:17:36
 * @Description: Do not edit
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Headers,
  Query,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('文件')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '上传文件' })
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() createFileDto: CreateFileDto) {
    return this.fileService.uploadFile(file, createFileDto);
  }

  @Get('/ossSignature')
  @ApiOperation({ summary: '获取oss签名' })
  getOssSignature() {
    return this.fileService.getOssSignature();
  }

  @Post('/ossCallback')
  @ApiExcludeEndpoint()
  ossCallback(@Body() body: any, @Headers('x-oss-pub-key-url') ossPubKeyUrl: string) {
    return this.fileService.ossCallback(body, ossPubKeyUrl);
  }
}
