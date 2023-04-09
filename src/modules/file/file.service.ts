/*
 * @Date: 2022-11-06 15:09:22
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-02-19 18:01:57
 * @Description: Do not edit
 */
import { HttpException, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import AliOss from '@/utils/oss';
import { AliOssMessage } from '@/contacts/oss-message';
import { ResponseStatus } from '@/contacts/response-message';
import { InjectModel } from '@nestjs/mongoose';
import { FileDocument, File } from './entities/file.entity';
import { Model } from 'mongoose';
import { ToLine, toLine } from '@/utils';
import { parseTime } from '@/utils/date';
import { ThrowError } from '@/contacts/throw-error';

@Injectable()
export class FileService {
  private oss: AliOss;
  constructor(@InjectModel(File.name) private FileModel: Model<FileDocument>) {
    this.oss = new AliOss();
  }
  /**
   * @description: 上传文件
   * @param {Express} file
   * @param {CreateFileDto} createFileDto
   * @return {*}
   */
  async uploadFile(file: Express.Multer.File, createFileDto: CreateFileDto) {
    try {
      const result = await this.oss.upload(file);
      // 写入数据库
      const fileParams = {
        name: file.originalname,
        url: result.url,
        type: file.mimetype,
        size: file.size,
        uploadTime: parseTime(new Date()),
      };
      await this.FileModel.create(ToLine(fileParams));
      return {
        data: null,
        message: AliOssMessage.OSS_UPLOAD_SUCCESS,
      };
    } catch (error) {
      ThrowError(AliOssMessage.OSS_UPLOAD_FAIL, error);
    }
  }
  /**
   * @description: 获取oss签名
   * @return {*}
   */
  async getOssSignature() {
    try {
      const uploadResult = await this.oss.generateSignature();
      return {
        data: uploadResult,
        message: AliOssMessage.OSS_GENERATE_SIGNATURE_SUCCESS,
      };
    } catch (error) {
      ThrowError(AliOssMessage.OSS_GENERATE_SIGNATURE_FAIL, error);
    }
  }

  /**
   * @description: oss回调
   * @param {any} body
   * @param {string} ossPubKeyUrl
   * @return {*}
   */
  async ossCallback(body: any, ossPubKeyUrl: string) {
    try {
      // base64解码
      const ossPubKey = Buffer.from(ossPubKeyUrl, 'base64').toString();
      // 判断该请求是否来自阿里云oss
      if (!ossPubKey.startsWith(process.env.OSS_CALLBACK_VERIFY_URL)) {
        return { data: null, Status: 'verify not ok', message: AliOssMessage.OSS_UPLOAD_FAIL };
      }
      const fileParams = {
        url: `https://${process.env.OSS_BUCKET}.${process.env.OSS_ENDPOINT}/${body.filename}`,
        name: body.filename.split('/')[1],
        size: body.size,
        type: body.mimeType,
        uploadTime: parseTime(new Date()),
      };
      await this.FileModel.create(ToLine(fileParams));
      return {
        data: fileParams,
        Status: 'Ok',
        message: AliOssMessage.OSS_UPLOAD_SUCCESS,
      };
    } catch (error) {
      ThrowError(AliOssMessage.OSS_UPLOAD_FAIL, error);
    }
  }
  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
