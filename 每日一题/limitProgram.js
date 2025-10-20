// 题目一（限时15分钟）
// 请将数据{1:111, 2:222, 5:555}转换为[111, 222, null, null, 555, null, null, null, null, null, null, null],其中
// 数组的长度是12
// 对象的key是1~12之间的整数

const obj = {1: 111, 2: 222, 5: 555};

function translate(obj) {
    // 请在此处添加代码
    let result = Array(12).fill(null)
    Object.entries(obj).forEach(([key, value]) => {
        result[key - 1] = value;
    });

    return result;
}

// 输出 `[111, 222, null, null, 555, null, null, null, null, null, null, null]`
console.log(translate(obj));


// 题目二（限时40分钟）
// 请实现一下程序，将数据1, 2, 3, 5, 7, 8, 10转换为 1~3, 5, 7~8, 10

const str = '1, 2, 3, 5, 7, 8, 10';

function translateTwo(str) {
    let arr = str.split(', ');
    let result = [];
    let point = 0;
    arr.forEach((it, i) => {
        if (i > 0 && arr[i] - arr[i - 1] !== 1) {
            let slice = arr.slice(point, i);
            result.push(
                slice.length === 1
                    ? slice[0]
                    : `${slice[0]}~${slice[slice.length - 1]}`
            );

            point = i;
        }
    })

    return result;
}

// 输出 1~3, 5, 7~8, 10
console.log(translateTwo(str));