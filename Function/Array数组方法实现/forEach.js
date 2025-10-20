/**
 * forEach(callback, context): 对数组的每个元素执行一次给定的函数
 *    callback(item, index, thisArr)
 *         item: callback 数组中正在处理的当前元素
 *         index: callback 数组中正在处理的当前元素的索引
 *         thisArr: 调用了 forEach 的数组本身
 *    context: 执行 callback 函数时值被用作this
 * return: undefined
 */
Array.prototype.selfForEach = function (callback, context) {
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
    // for (let i = 0; i < newArr.length; i++) {
    //     callback.call(context, newArr[i], i, this);
    // }
    // return newArr;

    // or reduce
    newArr.reduce((res, current, i) => {
        return [...res, callback.call(context, current, i, this)];
    }, []);
};

let aTest1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}];
let aTest2 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}];
aTest1.forEach((item, i) => {
    item.a = i * 3;
});
aTest2.selfForEach((item, i) => {
    item.a = i * 3;
});
console.log(aTest1);
console.log(aTest2);


