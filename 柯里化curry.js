/**
 * 函数柯里化
 *  柯里化函数参数长度: length
 *  接收参数: 
 *      接收参数 >= 柯里化参数长度:  执行主函数
 *      接收参数 < 柯里化参数长度:  继续接收参数, 且参数是平铺的
 * 
 * @param {*} fn 
 * @returns 
 */
const curry = (fn) => {
    // 先记录原始方法个数, fn.length 是函数接受参数
    const length = fn.length;
    console.log(1, fn)

    return func = (...args) => {
        // 接收参数足够, 直接执行主函数 fn
        if (args.length >= length) {
            return fn(...args);
        }
        else {
            // 参数不够继续接收参数
            return (...argList) => {
                // func 接收参数是平铺的
                return func(...args.concat(argList));
            }
        }
    };
};

// const fun = (a, b, c) => {return [a, b, c]};
// const curriedFun = curry(fun);

// console.log(curriedFun(1)(2)(3)); // [1, 2, 3]
// console.log(curriedFun(1, 2)(3)); // [1, 2, 3]
// console.log(curriedFun(1, 2, 3)); // [1, 2, 3]
// console.log(curriedFun(1, 2, 3)(4));

const sum = (a, b, c) => a + b + c;
const currySum = (fn) => {
    // 先记录原始方法个数, fn.length 是函数接受参数
    const length = fn.length;

    return function curriedFun(...args) {
        // 接收参数足够, 直接执行主函数 fn
        if (args.length >= length) {
            return fn.apply(this, args);
        }
        else {
            return function (...argList) {
                // func 接收参数是平铺的
                return curriedFun.apply(this, args.concat(argList));
            }
        }
    };
};
const _sum = currySum(sum);
console.log(_sum(1)(2)(3));