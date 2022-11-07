/*
 * @Date: 2022-11-06 18:32:18
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-07 11:56:47
 * @Description: 阿里云OSS封装
 */
import { AliOssMessage } from '@/contacts/oss-message';
import { ResponseStatus } from '@/contacts/response-message';
import { HttpException } from '@nestjs/common';
import * as OSS from 'ali-oss';
import * as moment from 'moment';
interface FileParams extends Express.Multer.File {
  ossPath?: string;
}
interface MultipartUploadParams {
  ossPath: string;
  uploadId: string;
}
class AliOss {
  private client: OSS;
  public currentUploadFile: any;
  constructor() {
    // 初始化
    this.client = new OSS({
      region: process.env.OSS_REGION,
      accessKeyId: process.env.OSS_ACCESS_KEY_ID,
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
      bucket: process.env.OSS_BUCKET,
      callbackUrl: `${process.env.SERVICE_BASE_URL}/blog/v1/file/ossCallback`,
      dir: `${process.env.OSS_DIR}/`,
    });
    // 当前正在上传的文件
    this.currentUploadFile = {
      ossPath: '',
      // 文件名称
      fileName: '',
      // 已经上传进度
      progress: 0,
      // 文件大小
      fileSize: 0,
      // 当前上传的分片的id
      uploadId: '',
    };
  }

  // 生成签名
  async generateSignature() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const policy = {
      expiration: date.toISOString(), // 请求有效期
      conditions: [
        ['content-length-range', 0, 1048576000], // 设置上传文件的大小限制
        { bucket: this.client.options.bucket }, // 限制可上传的bucket
      ],
    };
    // 生成签名
    const formData = await this.client.calculatePostSignature(policy);
    // bucket
    const { location } = await this.client.getBucketLocation();
    // 上传文件的域名
    const host = `http://${process.env.OSS_BUCKET}.${location}.aliyuncs.com`.toString();
    const callback = {
      callbackUrl: `${process.env.SERVICE_BASE_URL}/blog/v1/file/ossCallback`,
      callbackBody:
        'filename=${object}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}',
      callbackBodyType: 'application/x-www-form-urlencoded',
    };
    const params = {
      expire: moment().add(1, 'days').unix().toString(),
      policy: formData.policy,
      signature: formData.Signature,
      accessid: formData.OSSAccessKeyId,
      host,
      callback: Buffer.from(JSON.stringify(callback)).toString('base64'),
      dir: `${process.env.OSS_DIR}/`,
    };
    return params;
  }

  // 判断文件是否大于100M
  isBigFile(size: any, maxSize: number = 100) {
    return size > maxSize * 1024 * 1024;
  }

  progress(p, _checkpoint) {
    // Object的上传进度。
    this.currentUploadFile.progress = p;
    this.currentUploadFile.fileSize = _checkpoint.fileSize;
    this.currentUploadFile.uploadId = _checkpoint.uploadId;
  }

  // 上传文件
  async upload(fileParams: FileParams) {
    try {
      const ossPath = `gallery/${fileParams.originalname}`;
      // 判断文件大小, 如果大于100M, 则分片上传, 否则直接上传
      if (this.isBigFile(fileParams.size)) {
        return await this.multipartUpload({ ...fileParams, ossPath, originalname: ossPath });
      } else {
        return await this.client.put(ossPath, fileParams.buffer);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 分片上传
  async multipartUpload(fileParams: FileParams) {
    try {
      const result = await this.client.multipartUpload(fileParams.ossPath, fileParams.buffer, {
        progress: this.progress,
      });
      return result;
    } catch (e) {
      // 捕获超时异常。
      if (e.code === 'ConnectionTimeoutError') {
        throw new Error(AliOssMessage.OSS_CONNECTION_TIMEOUT_ERROR);
      }
    }
  }
  // 取消分片上传
  async abortMultipartUpload(fileParams: MultipartUploadParams) {
    try {
      const result = await this.client.abortMultipartUpload(fileParams.ossPath, fileParams.uploadId);
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
export default AliOss;
