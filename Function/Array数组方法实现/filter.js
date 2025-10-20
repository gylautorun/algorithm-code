/**
 * filter(callback, context)
 *    callback(item, index, thisArr)
 *         item: callback 数组中正在处理的当前元素
 *         index: callback 数组中正在处理的当前元素的索引
 *         thisArr: 调用了 filter 的数组本身
 *    context: 执行 callback 函数时值被用作this
 * return: new Array: 通过callback函数的元素组成的数组，如果没有任何数组元素通过callback函数，则返回空数组
 */
Array.prototype.selfFilter = function (callback, context) {
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
    // let result = [];
    // for (let i = 0; i < newArr.length; i++) {
    //     // 过滤稀疏数组, 即松散值
    //     // if (!newArr.hasOwnProperty(i)) {
    //     //     continue;
    //     // }
    //     let coincide = callback.call(context, newArr[i], i, this);
    //     if (coincide) {
    //         result.push(newArr[i]);
    //     }
    // }
    // return result;

    // or reduce
    return newArr.reduce((res, current, i) => {
        let coincide = callback.call(context, current, i, this);
        if (coincide) {
            return [...res, current];
        }
        else {
           return [...res];
        }
    }, []);
};

let aTest = [1, 2, 3, 4, 5, 6];
console.log(aTest.filter(item => {
    return item > 2;
}));
console.log(aTest.selfFilter(item => {
    return item > 2;
}));

