/**
 * reduce(callback, initValue):
 *  判断参数，判断调用方法本身是否为 Array
 *  声明要用的变量
 *  判断是否有初始值，如果没有则从本身数组中取，取到直接跳出循环
 *  循环调用 callback
 *
 *  selfReduce 函数不能用箭头函数, 箭头函数 this 指向运行环境 (下面会指向 window)
 */
// Array.prototype.selfReduce = (callback, initValue)=>  { // Bad
Array.prototype.selfReduce = function (callback, initValue) { // Good
    console.log('this', this); // this 指向调用数组 [].selfReduce(callback)

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

    let result = null; // 结果
    let startIndex = 0; // 开始索引

    // 判断是否有初始值 initValue
    if (initValue === undefined) { // 不存在, 以数组第一个值
        startIndex = 1;
        result = newArr[i];

        // 过滤稀疏数组, 即松散值
        // for (let i = 0; i < newArr.length; i++) {
        //     if (!newArr.hasOwnProperty(i)) {
        //         continue;
        //     }
        //     else {
        //         startIndex = i++;
        //         result = newArr[i];
        //         break;
        //     }
        // }
    }
    else {
        result = initValue;
    }

    /**
     * 稀疏数组, 即松散值
     * arr = []
     * arr[0] = 1
     * arr[10] = 11
     *  => [1, empty × 9, 11]
     *     {
     *       0: 1,
     *       10: 11,
     *       length: 11
     *     }
     * 索引不存在
     */
    // 在上一步拿到初始值，循环调用传入的回调函数
    for (let i = startIndex; i < newArr.length; i++) {
        // 过滤稀疏数组, 即松散值
        // if (!newArr.hasOwnProperty(i)) {
        //     continue;
        // }
        result = callback.call(null, result, newArr[i], i, this);
    }

    return result;

};

let testArr = [1, 2, 3, 4, 5];
console.log(testArr.reduce((prev, next) => {
    return prev + next;
}, 0)); // 15
console.log(testArr.selfReduce((prev, next) => {
    return prev + next;
}, 0)); // 15