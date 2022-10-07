/*
 * @Date: 2022-10-04 11:38:54
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-10-04 11:40:23
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
      return [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Spt',
        'Oct',
        'Nov',
        'Dec',
      ][value];
    }
    return value.toString().padStart(2, '0');
  });
  return time_str;
}
