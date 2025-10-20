
Array.prototype._filter = function (callback /*, thisArg*/) {
    if (this == null) {
        throw new TypeError('null or undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function');
    }
    // const [ fn , thisArg ] = [].slice.call(arguments) 无callback时候
    var oldArr = Object(this),
        len = +oldArr.length || 0,
        newArr = [],
        thisArg = arguments.length > 1 ? arguments[1] : null;
    for (var i = 0; i < len; i++) {
        if (callback.call(thisArg, oldArr[i], i, oldArr)) {
            newArr.push(oldArr[i]);
        }
    }

    return newArr;

}

var array = [{a: true}, {a: true}, {a: false}, {a: true}, {a: false}, {a: true}];

var newArr = array._filter(function (val, i) {
    return val.a;
});
console.log(newArr)


Array.prototype._reduceFilter = function (callback /*, thisArg*/) {
    if (this == null) {
        throw new TypeError('null or undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function');
    }
    // const [ fn , thisArg ] = [].slice.call(arguments) 无callback时候
    var oldArr = Object(this),
        thisArg = arguments.length > 1 ? arguments[1] : null;
    return oldArr.reduce((acc, value, index) => {
        return callback.call(thisArg, value, index, oldArr) ? acc.concat([ value ]) : acc;
    }, [])
};
console.log([ 1, 2, 3 ]._reduceFilter(x => x % 2 === 0)) // [ 2 ]

// 不定义在Array的原型上
const reduceFilter = (callback, thisAry)  => {
    return (list) => {
        if (typeof callback !== 'function') {
            throw new TypeError(callback + 'is not a function')
        }
        if (!Array.isArray(list)) {
            throw new TypeError('list must be a Array')
        }
        if (list.length === 0) return [];
        return list.reduce((acc, value, index) => {
            return callback.call(thisAry, value, index, list) ? acc.concat([ value ]) : acc;
        }, [])
    }
}

console.log(reduceFilter(x => x % 2 === 0)([ 1, 2, 3 ])) // [ 2 ]