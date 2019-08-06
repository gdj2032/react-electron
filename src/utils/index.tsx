import moment from 'moment';

export const noop = (v: any) => {};

/**
 * 格式化日期
 * @param date
 * @param formatStr
 * @returns {string}
 */
export function convertDateFormat(date = [], formatStr = 'YYYY-MM-DD') {
  return moment(date).format(formatStr);
}

/**
 * 将日期字符串转换为日期数组[YYYY, MM, DD]
 * @param date
 * @returns {number[]}
 */
export function convertDateFromString(date: any) {
  return moment(date).toArray().slice(0, 3);
}

/**
 * 将日期数组转换为日期字符串
 * @param date
 * @returns {string}
 */
export function convertDateFromArray(date: any) {
  return convertDateFormat(date);
}

/**
 *
 *  对象数组，去除某属性相同的元素
 * @export
 * @param {*} oldArr
 * @param {*} prop string
 * @returns []
 */
export function distinct(oldArr: any, prop: any) {
  const result = [];
  for (let i = 0; i < oldArr.length; i += 1) {
    let flag = true;
    for (let j = 0; j < result.length; j += 1) {
      if (oldArr[i][prop] === result[j][prop]) {
        flag = false;
      }
    }
    if (flag) {
      result.push(oldArr[i]);
    }
  }
  return result;
}
