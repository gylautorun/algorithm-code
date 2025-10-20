/**
 * slice(start, end): 对数组的每个元素执行一次给定的函数
 *    start: (可选)从该索引开始提取原数组元素; <0: 提取原数组倒数第几个到最后一个元素  省略: 从0开始  >thisArr.length 返回空数组
 *    end: 提取终止索引(不包含该索引)  省略:提取数组最后  >thisArr.length:提取数组最后 <0:提取原数组到倒数第几个元素索引处,不包含该索引
 * return: new Array
 */
Array.prototype.selfSlice= function (/*start, end*/) {
    // 不能是 null 的调用
    if (this === null) {
        throw new TypeError(
            'Array.prototype.reduce called on null or undefined'
        )
    }
    let start = arguments.length > 0 ? arguments[0] : 0;
    let end = arguments.length > 1 ? arguments[1] : this.length;

    if (start >= this.length || (arguments.length > 1 && end < start)) {
        return [];
    }
    else if (start < 0) {
        if (this.length + start < 0) {
            start = 0;
        }
        else {
            start = this.length + start;
        }
    }
    if (end >= this.length) {
        end = this.length;
    }
    else if (end < 0) {
        if (this.length + end <= 0) {
            return [];
        }
        else {
            end = this.length + end;
        }
    }

    let newArr = [];
    newArr.length = end - start; // 防止添加过多数组, 下面遍历会
    for (let i = start, j = 0; i < end; i++, j++) {
        newArr[j] = this[i];
    }

    return newArr;
};

let test = [1, 2, 3, 4, 5];
console.log(test.slice(-5, -10));
console.log(test.selfSlice(-5, -10));


