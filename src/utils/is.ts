/*
 * @Date: 2022-10-07 14:29:02
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-03 14:37:27
 * @Description: 判断数据类型
 */
const toString = Object.prototype.toString;

/**
 * @description: 判断是否不是空
 * @param {any} value
 * @return {boolean}
 */
export const IsNotEmpty = (value: any): boolean => {
  return value !== undefined && value !== null && value !== '';
};
/**
 * @description: 判断是否为空
 * @param {any} value
 * @return {boolean}
 */
export const isEmpty = (value: any): boolean => {
  return value === undefined || value === null || value === '';
};
/**
 * @description: 判断是否为对象
 * @param {any} value
 * @return {boolean}
 */
export const isObject = (value: any): boolean => {
  return value !== null && toString.call(value) === '[object Object]';
};
/**
 * @description: 判断是否为数组
 * @param {any} value
 * @return {boolean}
 */
export const isArray = (value: any): boolean => {
  return toString.call(value) === '[object Array]';
};
/**
 * @description: 判断是否为函数
 * @param {any} value
 * @return {boolean}
 */
export const isFunction = (value: any): boolean => {
  return toString.call(value) === '[object Function]';
};
/**
 * @description: 判断是否为字符串
 * @param {any} value
 * @return {boolean}
 */
export const isString = (value: any): boolean => {
  return toString.call(value) === '[object String]';
};
/**
 * @description: 判断是否为数字
 * @param {any} value
 * @return {boolean}
 */
export const isNumber = (value: any): boolean => {
  return toString.call(value) === '[object Number]';
};
/**
 * @description: 判断是否为布尔值
 * @param {any} value
 * @return {boolean}
 */
export const isBoolean = (value: any): boolean => {
  return toString.call(value) === '[object Boolean]';
};
/**
 * @description: 判断是否为日期
 * @param {any} value
 * @return {boolean}
 */
export const isDate = (value: any): boolean => {
  return toString.call(value) === '[object Date]';
};
/**
 * @description: 判断是否为正则
 * @param {any} value
 * @return {boolean}
 */
export const isRegExp = (value: any): boolean => {
  return toString.call(value) === '[object RegExp]';
};
/**
 * @description: 判断是否为错误对象
 * @param {any} value
 * @return {boolean}
 */
export const isError = (value: any): boolean => {
  return toString.call(value) === '[object Error]';
};
/**
 * @description: 判断是否为Symbol函数
 * @param {any} value
 * @return {boolean}
 */
export function isSymbol(value: any): boolean {
  return toString.call(value) === '[object Symbol]';
}
/**
 * @description: 判断是否为Promise对象
 * @param {any} value
 * @return {boolean}
 */
export function isPromise(value: any): boolean {
  return toString.call(value) === '[object Promise]';
}
/**
 * @description: 判断是否为Set对象
 * @param {any} value
 * @return {boolean}
 */
export function isSet(value: any): boolean {
  return toString.call(value) === '[object Set]';
}
/**
 * @description: 判断是否为Map对象
 * @param {any} value
 * @return {boolean}
 */
export function isMap(value: any): boolean {
  return toString.call(value) === '[object Map]';
}
/**
 * @description: 判断是否为File对象
 * @param {any} value
 * @return {boolean}
 */
export function isFormData(value: any): boolean {
  return toString.call(value) === '[object FormData]';
}
/**
 * @description: 判断是否为File对象
 * @param {any} value
 * @return {boolean}
 */
export function isFile(value: any): boolean {
  return toString.call(value) === '[object File]';
}
/**
 * @description: 判断是否为Blob对象
 * @param {any} value
 * @return {boolean}
 */
export function isBlob(value: any): boolean {
  return toString.call(value) === '[object Blob]';
}
/**
 * @description: 判断是否为URLSearchParams对象
 * @param {any} value
 * @return {boolean}
 */
export function isURLSearchParams(value: any): boolean {
  return toString.call(value) === '[object URLSearchParams]';
}
/**
 * @description: 判断是否为ArrayBuffer对象
 * @param {any} value
 * @return {boolean}
 */
export function isBuffer(value: any): boolean {
  return toString.call(value) === '[object ArrayBuffer]';
}