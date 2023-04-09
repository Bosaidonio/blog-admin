/*
 * @Date: 2022-10-04 11:38:54
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2023-04-09 13:27:44
 * @Description: 时间工具函数
 */

/**
 * @description: 根据指定格式解析时间
 * @param {string | number | Date} time
 * @param {string?} cFormat
 * @return {string}
 */
export function parseTime(time: string | number | Date, cFormat?: string) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time);
      } else {
        time = time.replace(new RegExp(/-/gm), '/');
      }
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
    e: date.getMonth(),
  };
  const time_str = format.replace(/{([ymdhisae])+}/g, (result, key: string) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (key === 'e') {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Spt', 'Oct', 'Nov', 'Dec'][value];
    }
    return value.toString().padStart(2, '0');
  });
  return time_str;
}
/**
 * @function
 * @name add0
 * @description 为小于 10 的数字添加前导零（0），以确保数字始终为两位数。对于大于等于 10 的数字，保持原样不变。
 *
 * @param {string | number} num - 需要添加前导零的数字，可以是字符串或数字。
 * @returns {string} 两位数的字符串，前导零（如果需要）已添加。
 *
 * @example
 * 1: 使用数字类型参数
 * add0(5);  => "05"
 * 2: 使用字符串类型参数
 * add0("9"); => "09"
 * 3: 对于大于等于 10 的数字
 * add0(12); => "12"
 */
export const add0 = (num: string | number) => {
  if (typeof num === 'string') {
    num = isNaN(parseInt(num)) ? 0 : parseInt(num);
  }
  return num >= 10 ? num : '0' + num;
};
/**
 * @function
 * @name diffTime
 * @description 计算当前时间与给定的起始时间之间的时间差，并将其以秒、分钟、小时、天和年的形式表示为对象。
 *
 * @param startTime 起始时间，格式为字符串，例如 "2022-03-31T12:00:00.000Z"。
 * @returns 返回一个对象，包含以下属性：
 * - `sm`：时间差的秒数。
 * - `ss`：时间差的分钟数。
 * - `hh`：时间差的小时数。
 * - `dd`：时间差的天数。
 * - `yy`：时间差的年数。
 *
 * @example
 * 计算距离当前时间 30 分钟前的时间差
 * const startTime = new Date(Date.now() - 30 * 60 * 1000).toISOString();
 * const diff = diffTime(startTime);
 * console.log(diff); => { sm: 1800, ss: 30, hh: 0, dd: 0, yy: 0 }
 */
export const diffTime = (startTime: string) => {
  const currentTime = new Date().getTime();
  const diff = currentTime - new Date(startTime).getTime();
  const sm = Math.floor(diff / 1000);
  const ss = Math.floor(diff / (1000 * 60));
  const hh = Math.floor(diff / (1000 * 60 * 60));
  const dd = Math.floor(diff / (1000 * 60 * 60 * 24));
  const yy = Math.floor(dd / 365);
  return {
    sm,
    ss,
    hh,
    dd,
    yy,
  };
};
type TimeUnit = '秒前' | '分钟前' | '小时前' | '天前' | '月前' | '年前';

/**
 * 计算给定时间字符串与当前时间的相对时间差，并返回适当的相对时间字符串。
 * @param dateString - 时间字符串，如 "2023-02-15T10:30:00"
 * @returns 相对时间字符串，如 "1 月前"
 */
export const timeAgo = (dateString: string): string => {
  if (typeof dateString !== 'string' || !Date.parse(dateString)) {
    throw new Error('Invalid date string');
  }
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const timeUnits: { unit: TimeUnit; divider: number }[] = [
    { unit: '年前', divider: 60 * 60 * 24 * 365 },
    { unit: '月前', divider: 60 * 60 * 24 * 30 },
    { unit: '天前', divider: 60 * 60 * 24 },
    { unit: '小时前', divider: 60 * 60 },
    { unit: '分钟前', divider: 60 },
    { unit: '秒前', divider: 1 },
  ];

  for (const timeUnit of timeUnits) {
    if (seconds >= timeUnit.divider) {
      const time = Math.floor(seconds / timeUnit.divider);
      return `${time} ${timeUnit.unit}`;
    }
  }

  return '刚刚';
};
/**
 * 计算运行时间
 * @param startTime  开始时间
 * @returns
 */
export const runTime = (startTime: string) => {
  const { sm, ss, hh, dd, yy } = diffTime(startTime);
  if (yy > 0) {
    return `${yy}年${dd - 365 * yy}天`;
  } else if (dd > 0) {
    return `${dd}天`;
  } else if (hh > 0) {
    return `${hh}小时${ss - 60 * hh}分`;
  } else if (ss > 0) {
    return `${ss}分${sm - 60 * ss}秒`;
  } else {
    return `${sm}秒`;
  }
};
