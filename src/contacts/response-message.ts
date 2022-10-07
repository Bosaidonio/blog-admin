/*
 * @Date: 2022-10-06 14:26:22
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-06 14:30:13
 * @Description: 集中错误处理信息配置
 */
export enum ResponseStatus {
  REQUEST_PARAMS_ERROR = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}
// 配置响应信息
export const responseMessage = {
  [ResponseStatus.REQUEST_PARAMS_ERROR]: '请求参数错误',
  [ResponseStatus.UNAUTHORIZED]: '未授权',
  [ResponseStatus.FORBIDDEN]: '禁止访问',
  [ResponseStatus.NOT_FOUND]: '资源不存在',
  [ResponseStatus.CONFLICT]: '资源已存在',
  [ResponseStatus.METHOD_NOT_ALLOWED]: '请求方法不允许',
  [ResponseStatus.REQUEST_TIMEOUT]: '请求超时',
  [ResponseStatus.GONE]: '资源已删除',
  [ResponseStatus.TOO_MANY_REQUESTS]: '请求过多',
  [ResponseStatus.INTERNAL_SERVER_ERROR]: '服务器内部错误',
  [ResponseStatus.BAD_GATEWAY]: '错误的网关',
  [ResponseStatus.SERVICE_UNAVAILABLE]: '服务不可用',
  [ResponseStatus.GATEWAY_TIMEOUT]: '网关超时',
};
