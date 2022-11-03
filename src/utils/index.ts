/*
 * @Date: 2022-10-04 10:47:49
 * @LastEditors: mario marioworker@163.com
 * @LastEditTime: 2022-11-03 14:31:02
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
 * @return {*}、
 * @example
 * stringToNumberArray([{a: '1', b: '2'}, {a: '3', b: '4'}], ['a'])
 * 转换结果 => [{a: 1, b: '2'}, {a: 3, b: '4'}]
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
 * @example
 * deleteEmptyValue({a: 1, b: '', c: null, d: undefined, e: 0})
 * 转换结果 => {a: 1, e: 0}
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
/**
 * @description: 将嵌套树结构数据转换成一维数组
 * @param {any} tree
 * @return {*}
 * @example
 * const tree = [ { id: 1, name: '1', children: [ { id: 2, name: '2' } ] } ]
 * 调用方法 => treeToArray(tree)
 * 返回结果 => [ { id: 1, name: '1' }, { id: 2, name: '2' } ]
 */
export const flattenTree = (tree: any[]) => {
  return tree.reduce((acc, val) => {
    acc.push(val);
    if (val.children) {
      acc.push(...flattenTree(val.children));
      delete val.children;
    }
    return acc;
  }, []);
};

/**
 * @description: 将扁平化数组转换成树形结构
 * @param {any[]} data
 * @param {string} id
 * @param {string} pid
 * @return {*}
 * @example
 * const data = [ { id: 1,  pid: 0 }, { id: 2, pid: 1 }, { id: 3, pid: 2 } ]
 * 调用方法 => treeToArray(data, 'id', 'pid')
 * isDeepTree: true 转换结果 => [{id: 1, children: [{id: 2, pid: 1, children:[{ id: 3, pid: 2}]}] }]
 */
export const toTree = (data: any[], id = 'id', pid = 'pid') => {
  const result: any[] = data.map((item) => JSON.parse(JSON.stringify(item)));
  // 判断是否传入id和pid
  if (!id || !pid) {
    return result;
  }
  const mapData: any = {};
  result.forEach((item) => {
    mapData[item[id]] = item;
  });
  return result.reduce((acc, cur) => {
    const { [pid]: parentId } = cur;
    if (parentId) {
      const parent = mapData[cur[pid]];
      if (parent) {
        parent.children = [...(parent.children || []), cur];
      } else {
        acc.push(cur);
      }
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);
};
/**
 * @description: 传入一个节点id，返回该节点的最顶层父级节点
 * @param {any} data
 * @param {string} id
 * @param {string} pid
 * @return {*}
 * @example
 * const data = [ { id: 1, pid: 0 }, { id: 2, pid: 1 }, { id: 3, pid: 2 } ]
 * 调用方法 => getTopParent(data, 3)
 * 返回结果 => { id: 1, pid: 0 }
 */
export const getTopParent = (data: any[], id = 'id', pid = 'pid') => {
  const mapData = {};
  data.forEach((item) => {
    mapData[item[id]] = item;
  });
  return function diff(currentNodeId) {
    const currentNode = mapData[currentNodeId];
    if (currentNode && currentNode[pid]) {
      return diff(currentNode[pid]);
    } else {
      return currentNode;
    }
  };
};
/**
 * @description: 深层树结构转换一维数结构
 * @param {any} data
 * @param {string} id 主键 每个节点的唯一标识
 * @param {string} pid 父级主键 该主键将用于查找父级节点
 * @param {string} rootNodeIdName 根节点id的字段名
 * @return {*}
 * @example
 * const data = [ { id: 1, pid: 0}, { id: 2, pid: 1}, { id: 3, pid: 2 } ]
 * 调用方法 => treeToTwoFlatTree(data, 'id', 'pid')
 * 返回结果 => [ { id: 1, pid: 0, children: [{ id: 2, pid: 1 }, { id: 3, pid: 2 }] } ]
 */
export const treeToTwoFlatTree = (
  data: any[],
  id = 'id',
  pid = 'pid',
  rootNodeIdName = 'rootNodeId',
) => {
  const transformData = data.map((item) => {
    const topParent = getTopParent(data, id, pid)(item[id]);
    return {
      ...item,
      [rootNodeIdName]: item[pid] ? topParent[id] : null,
    };
  });
  return toTree(transformData, id, rootNodeIdName);
};
