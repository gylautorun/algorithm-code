// pipe函数跟compose函数的左右是一样的，也是将参数平铺，只不过他的顺序是从左往右

// 实现: 借助 Array.prototype.reduce
function pipe() {
    const args = [].slice.apply(arguments);

    return function(value) {
        return args.reduce((res, callback) => callback(res), value);
    }
}

// es6
const pipe = (...args) => value => args.reduce((res, callback) => callback(res), value)