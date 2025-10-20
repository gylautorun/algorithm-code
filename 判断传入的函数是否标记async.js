/**
 * 判断传入的函数是否标记async
 * @param {*} fn 
 * @returns is async ? true : false
 */
function isAsyncFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object AsyncFunction]';
    // 或者
    return fn[Symbol.toStringTag] === 'AsyncFunction';
}

console.log(isAsyncFunction(() => {})); // false
console.log(isAsyncFunction(async () => {})); // true


// toStringTag => 知名符号
Object.prototype.toString.call([]); // [object Array]
// 默认只针对内置对象

function A() {};
const a = new A();
Object.prototype.toString.call(a); // [object Object] 不能得到 [object A]
// ES6可以更改
A.prototype[Symbol.toStringTag] = 'A';
Object.prototype.toString.call(a); // '[object A]'