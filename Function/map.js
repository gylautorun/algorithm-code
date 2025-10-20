Array.prototype._map = function(callback /*, thisArg*/) {
    // 指的数组 Arr console.log(this) => [...]
    if (this == null) {
        // undefined == null
        throw new TypeError('null or undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function');
    }
    var oldArr = Object(this),
        len = +oldArr.length || 0,
        thisArg = arguments.length > 1 ? arguments[1] : null;
    // var newArr = new Array(len);
    // for (var i = 0; i < len; i++) {
    //     newArr[i] = callback.call(thisArg, oldArr[i], i, oldArr);
    // }
    var newArr = [];
    for (var i = 0; i < len; i++) {
        newArr.push(callback.call(thisArg, oldArr[i], i, oldArr));
    }
    return newArr;
}
var array = [1, 2, 3, 4, 5];
var arr1 = array._map(function(value, index, arr) {
    return value * 2;
});
console.log(arr1)

Array.prototype._reduceMap = function(callback /*, thisArg*/) {
    // 指的数组 Arr console.log(this) => [...]
    if (this == null) {
        // undefined == null
        throw new TypeError('null or undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function');
    }
    var oldArr = Object(this),
        thisArg = arguments.length > 1 ? arguments[1] : null;

    return oldArr.reduce((acc, value, index) => {
        return acc.concat([ callback.call(thisArg, value, index, oldArr) ])
    }, [])

};
console.log([ 1, 2, 3 ]._reduceMap(x => x + 1))

// 这次不把方法写在Array的原型上
const reduceMap = (fn, thisArg /*真想去掉thisArg这个参数*/ ) => {
    return (list) => { // list 为reduceMap(function(){})(list) 方法传入值
        // 不怎么愿意写下面这两个判断条件
        if (typeof fn !== 'function') {
            throw new TypeError(fn + 'is not a function')
        }
        if (!Array.isArray(list)) {
            throw new TypeError('list must be a Array')
        }
        if (list.length === 0) return []
        return list.reduce((acc, value, index) => {
            return acc.concat([ fn.call(thisArg, value, index, list) ])
        }, [])
    }
}

console.log(reduceMap(x => x + 1)([ 1, 2, 3 ]));
