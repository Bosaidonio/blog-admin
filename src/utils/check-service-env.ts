/*
 * @Date: 2022-11-04 08:47:40
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-10 15:10:49
 * @Description: Do not edit
 */
// 使用shelljs检查mongodb服务是否启动
import * as shell from 'shelljs';
import { factoryLogger } from '@/utils/logger';
// 导入inquirer
import * as inquirer from 'inquirer';
const logger = factoryLogger();

export const checkServiceEnv = async () => {
  // 使用shelljs获取HOME系统环境变量
  const env = shell.env;

  // 检查mongodb是否安装
  const mongoStatus = shell.exec('mongod --version', { silent: true }).stdout;
  if (!mongoStatus) {
    logger.error('Error: MongoDB is not installed.');
    return false;
  }
  // 提取mongodb版本号
  const mongoVersion = mongoStatus.match(/db version v(\d+\.\d+\.\d+)/)[1];
  // 打印版本信息
  logger.info(`MongoDB version: ${mongoVersion}`);
  // 检查mongodb服务是否启动
  const mongoServiceStatus = shell.exec('ps -ef | grep mongod | grep -v grep', { silent: true }).stdout;
  if (!mongoServiceStatus) {
    logger.error(`Error: MongoDB service is not running.`);
  } else {
    logger.info(`MongoDB service is running. `);
    return true;
  }
  // 提问是否启动mongodb服务
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isStartMongoService',
      message: 'Do you want to start MongoDB service?',
      default: true,
    },
  ]);
  if (answers.isStartMongoService) {
    // 启动mongodb服务
    shell.exec('mongod --config /usr/local/etc/mongod.conf --fork', { async: true });
    return true;
  } else {
    return false;
  }
};
