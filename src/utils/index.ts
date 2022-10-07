/*
 * @Date: 2022-10-04 10:47:49
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-07 14:57:12
 * @Description: 常用工具函数
 */

import { IsNotEmpty } from './is';

/**
 * @description: 下划线转换成驼峰
 * @param {string} name
 * @return {string}
 */
export function toHump(name: string) {
  return name.replace(/\_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}
/**
 * @description: 将对象的key转换成驼峰
 * @param {any} obj 传入的对象
 * @param {string[]} whiteKeys 白名单，不转换的key
 * @return {*}
 */
export const toHumpObj = (obj: any, whiteKeys: string[] = []) => {
  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    if (whiteKeys.includes(key)) {
      newObj[key] =
        obj[key] instanceof Array ? toHumpArray(obj[key], whiteKeys) : obj[key];
    } else {
      newObj[toHump(key)] =
        obj[key] instanceof Array ? toHumpArray(obj[key], whiteKeys) : obj[key];
    }
  });
  return newObj;
};
/**
 * @description:  将数组中的对象
 * @param {any} arr 传入参数
 * @param {string[]} whiteKeys 白名单 不转换的key
 * @return {*}
 */
export const toHumpArray = (arr: any[], whiteKeys: string[] = []) => {
  return arr.map((item) => {
    if (typeof item === 'object') {
      return item instanceof Array
        ? toHumpArray(item, whiteKeys)
        : toHumpObj(item, whiteKeys);
    } else {
      return item;
    }
  });
};

/**
 * @description: 驼峰转换成下划线
 * @param {string} name 需要转换的字符串
 */
export function toLine(name: string) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * @description: 将对象的key转换成下划线
 * @param {any} obj 传入参数
 * @param {string[]} whiteKeys 白名单 不转换的key
 * @return {any}
 */
export const toLineObj = (obj: any, whiteKeys: string[] = []) => {
  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    if (whiteKeys.includes(key)) {
      newObj[key] =
        obj[key] instanceof Array ? toLineArray(obj[key], whiteKeys) : obj[key];
    } else {
      newObj[toLine(key)] =
        obj[key] instanceof Array ? toLineArray(obj[key], whiteKeys) : obj[key];
    }
  });
  return newObj;
};
/**
 * @description: 将数组对象的key转换成下划线
 * @param {any} arr 传入参数
 * @param {string[]} whiteKeys 白名单 不转换的key
 * @return {any}
 */
export const toLineArray = (arr: any[], whiteKeys: string[] = []) => {
  return arr.map((item) => {
    if (typeof item === 'object') {
      return item instanceof Array
        ? toLineArray(item, whiteKeys)
        : toLineObj(item, whiteKeys);
    } else {
      return item;
    }
  });
};
/**
 * @description: 驼峰转换成下划线
 * @param {any} params 传入参数
 * @param {string[]} whiteKeys 白名单 不转换的key
 * @return {any}
 */
export const ToLine = (params, whiteKeys: string[] = []) => {
  return params instanceof Array
    ? toLineArray(params, whiteKeys)
    : toLineObj(params, whiteKeys);
};
/**
 * @description: 下划线转换成驼峰
 * @param {any} params 传入参数
 * @param {string[]} whiteKeys 白名单 不转换的key
 * @return {any}
 */
export const ToHump = (params, whiteKeys: string[] = []) => {
  return params instanceof Array
    ? toHumpArray(params, whiteKeys)
    : toHumpObj(params, whiteKeys);
};
/**
 * @description: 将对象中的值转换成数字
 * @param {any} obj 待转换的对象
 * @param {string} transformKeys 需要转换的key
 * @return {any}
 */
export const stringToNumberObject = (obj: any, transformKeys: string[]) => {
  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    if (transformKeys.includes(key)) {
      newObj[key] =
        obj[key] instanceof Array
          ? stringToNumberArray(obj[key], transformKeys)
          : isNaN(Number(obj[key]))
          ? obj[key]
          : Number(obj[key]);
    } else {
      newObj[key] =
        obj[key] instanceof Array
          ? stringToNumberArray(obj[key], transformKeys)
          : obj[key];
    }
  });
  return newObj;
};
/**
 * @description: 将数组中的对象的值转换成数字
 * @param {any} arr
 * @param {string} transformKeys
 * @return {*}
 */
export const stringToNumberArray = (arr: any[], transformKeys: string[]) => {
  return arr.map((item) => {
    if (typeof item === 'object') {
      return item instanceof Array
        ? stringToNumberArray(item, transformKeys)
        : stringToNumberObject(item, transformKeys);
    } else {
      return item;
    }
  });
};

/**
 * @description: 删除对象中值为null或者undefined或者空字符串的属性，主要用来删除请求参数中的空值
 * @param {Record<string, any>} obj
 * @param {Record<string, any>} values
 * @return {Record<string, any>}
 */
export const deleteObjEmptyValue = (
  obj: Record<string, any>,
  values: Record<string, any>,
) => {
  const newObj: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    if (IsNotEmpty(values[key])) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
