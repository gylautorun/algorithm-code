/**
 * 判断数组
 */
function isArray(arr) {
    // 奇葩
    // return JSON.stringify(arr).indexOf('[') === 0;
    // Object.prototype.toString (es6 之前正统判断数组类型)
    // return Object.prototype.toString.call(arr) === '[object Array]';
    // arr instanceof Array; // 缺点, 数组的原型链可能被修改, 有 iframe 情况, 实例的构造函数未必是全局执行环境下的 Array
    // return arr instanceof Array;

    // [native code] c++ 实现的根据存储结构判断, js 语言层面无法模拟到 c++ 内部存储结构的
    return Array.isArray(arr); // 静态方法判断
}

/**
 * JSON.stringify(arr).indexOf('[') === 0
 *  arr = [1, 2, 3, {}]
 *  arr[3].c = arr; // 循环引用
 *  JSON.stringify(arr); // 报错
 */


// Object.prototype.toString.call(arr) === '[object Array]' 缺点, es6 后不行了
const obj = {
    [Symbol.toStringTag]: 'Array',
};
// '[object Array]'
const obj2 = {
    [Symbol.toStringTag]: 'AAA',
};
// '[object AAA]'

/**
 * arr instanceof Array
 *   - 缺点, 数组的原型链可能被修改
 *   - 有 iframe 情况, 实例的构造函数未必是全局执行环境下的 Array
 */
const o = {};
o.__proto__ = Array.prototype;
// 或
Object.setPrototypeOf(o, Array.prototype);
// isArray(o) => true;

const Array1 = window.Array;
const iframe = document.createElement('iframe');
const Array2 = iframe.contentWindow.Array;
// array1 !== array2;
const array = new Array2(); // iframe 的 Array
// array instanceof Array => false // 原型链是顶层的



