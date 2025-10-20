// compose的作用就是将嵌套执行的方法作为参数平铺, compose 方法也是从右边的参数开始执行
// compose(func2, func1)(value)
// 嵌套执行的时候，里面的方法也就是右边的方法最开始执行，然后往左边返回
// func2(func1(value))

// 实现 compose 函数需要借助 Array.prototype.reduceRight
function compose() {
    const args = [].slice.apply(arguments);

    return function(value) {
        return args.reduceRight((res, callback) => callback(res), value)
    };
}

const compose = (...args) => value => args.reduceRight((res, callback) => callback(res), value);