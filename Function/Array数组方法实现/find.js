/**
 * find(callback, context): 对数组的每个元素执行一次给定的函数
 *    callback(item, index, thisArr)
 *         item: callback 数组中正在处理的当前元素
 *         index: callback 数组中正在处理的当前元素的索引
 *         thisArr: 调用了 find 的数组本身
 *    context: 执行 callback 函数时值被用作this
 * return: 数组中第一个满足所提供测试函数的元素的值，否则返回 undefined
 */
Array.prototype.selfFind= function (callback, context) {
    // 不能是 null 的调用
    if (this === null) {
        throw new TypeError(
            'Array.prototype.reduce called on null or undefined'
        )
    }

    // 第一个参数必须要为function
    if (typeof callback !== 'function') {
        throw new TypeError(callback + " is not a function");
    }

    let newArr = Array.prototype.slice.call(this);
    let result = undefined;
    for (let i = 0; i < newArr.length; i++) {
        let res = !!callback.call(context, newArr[i], i, this);
        if (res) {
            result = newArr[i];
            break;
        }
    }
    return result;
};

let test = [1, 2, 3, 4, 5];
console.log(test.find(item => {
    return item > 3;
})); // 4
console.log(test.selfFind(item => {
    return item > 3;
})); // 4


