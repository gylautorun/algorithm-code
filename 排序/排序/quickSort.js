let list = require('./num').disorderArray();

function quickSort(arr) {

    if (arr.length <= 1) {
        return arr;
    }

    let point = arr[arr.length - 1];
    let left = [];
    let right = [];

    arr.pop(); // point 取出来

    arr.forEach(it => {
        it < point ? left.push(it) : right.push(it);
    });

    return quickSort(left).concat([point], quickSort(right));
}

console.log(quickSort(list));