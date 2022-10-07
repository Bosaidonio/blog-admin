/*
 * @Date: 2022-10-04 19:03:14
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-04 19:11:18
 * @Description: Do not edit
 */
/* eslint-disable prettier/prettier */
import * as chalk from 'chalk';
import * as ip from 'ip';

type paramType = {
  Port: string | number;
  DocUrl: string;
  ApiPrefix: string;
};
const defaultParam: paramType = {
  Port: process.env.SERVER_LISTEN_PORT,
  DocUrl: process.env.SWAGGER_SETUP_PATH,
  ApiPrefix: process.env.SWAGGER_ENDPOINT_PREFIX,
};
/**
 * 打印相关的帮助信息到终端
 * @param params
 */
export function terminalHelpTextConsole(params = defaultParam): void {
  const Host = `http://${ip.address()}`;
  console.log();
  console.log();
  console.log(
    chalk.red.bold('Swagger文档链接:'.padStart(16)),
    chalk.blue.underline(`${Host}:${params.Port}/${params.DocUrl}`),
  );
  console.log();
  console.log(
    chalk.red.bold('Restful接口链接:'.padStart(16)),
    chalk.blue.underline(`${Host}:${params.Port}/${params.ApiPrefix}`),
  );
}

/**
 * @description: 打印启动日志
 * @return {*}
 */
export const startLogger = () => {
  console.log(chalk.blue('                     .::::.'));
  console.log(chalk.blue('                    .::::::::.'));
  console.log(chalk.blue('                   :::::::::::'));
  console.log(chalk.blue("                ..:::::::::::'"));
  console.log(chalk.blue("             '::::::::::::'"));
  console.log(chalk.blue('               .::::::::::'));
  console.log(chalk.blue("          '::::::::::::::.."));
  console.log(chalk.blue('               ..::::::::::::.'));
  console.log(chalk.blue('             ``::::::::::::::::'));
  console.log(chalk.blue("              ::::``:::::::::'        .:::."));
  console.log(chalk.blue("             ::::'   ':::::'       .::::::::."));
  console.log(chalk.blue("           .::::'      ::::     .:::::::'::::."));
  console.log(chalk.blue("          .:::'       :::::  .:::::::::' ':::::."));
  console.log(chalk.blue("         .::'        :::::.:::::::::'      ':::::."));
  console.log(
    chalk.blue("        .::'         ::::::::::::::'         ``::::."),
  );
  console.log(
    chalk.blue("    ...:::           ::::::::::::'              ``::."),
  );
  console.log(
    chalk.blue("   ````':.          ':::::::::'                  ::::.."),
  );
  console.log(
    chalk.blue("                      '.:::::'                    ':'````.."),
  );
  console.log(chalk.blue('          美女坐镇                 BUG无存'));
  terminalHelpTextConsole();
};
