// 归并排序
// 1.把长度为n的输入序列分成两个长度为n/2的子序列；
// 2.对这两个子序列分别采用归并排序；
// 3.将两个排序好的子序列合并成一个最终的排序序列。
const merge = (left, right) => {
    let result = [];

    while(left.length > 0 && right.length > 0) {
        if (left[0] <= right[0]) {
            result.push(left.shift())
        }
        else {
            result.push(right.shift())
        }
    }

    while(left.length > 0) {
        result.push(left.shift())
    }
    while(right.length > 0) {
        result.push(right.shift())
    }

    return result;
}

const mergeSort = (arr = []) => {
    let len = arr.length;
    if (len <= 1) {
        return arr;
    }

    let middle = Math.floor(len / 2);
    let leftArr = arr.slice(0, middle);
    let rightArr = arr.slice(middle);

    return merge(mergeSort(leftArr), mergeSort(rightArr));
}