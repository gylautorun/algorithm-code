// 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数
// 同时需要考虑k大于数组长度的情况

// 示例
// const arr = [1, 2, 3, 4, 5, 6, 7]
// const k = 3
// 将上面数组向右移动3个位置
// 移动一个位置 [7, 1, 2, 3, 4, 5, 6]
// 移动两个位置 [6, 7, 1, 2, 3, 4, 5]
// 移动三个位置 [5, 6, 7, 1, 2, 3, 4]
let list = [1, 2, 3, 4, 5, 6, 7];

function rotateArray(arr, k) {
    if (typeof k !== 'number' || parseInt(k).toString() === 'NaN') {
        throw new TypeError(k + ' must be a normal number');
    }
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
        throw new TypeError(arr + ' is an array');
    }
    if (!arr.length) return arr;


    let rotateKey = arr.length - parseInt(k) % arr.length;
    if (k < 0) {
        rotateKey = arr.length + parseInt(k) % arr.length;
    }

    if (rotateKey === arr.length) return arr;


    return [].concat(arr.slice(rotateKey), arr.slice(0, rotateKey));


}

// console.log(rotateArray(list, 2));
// console.log(rotateArray(list, 4));
// console.log(rotateArray(list, 7));
// console.log(rotateArray(list, 9));
// console.log(rotateArray(list, 11));

console.log(rotateArray(list, -2));
console.log(rotateArray(list, -4));
console.log(rotateArray(list, -7));
console.log(rotateArray(list, -9));
console.log(rotateArray(list, -11));
