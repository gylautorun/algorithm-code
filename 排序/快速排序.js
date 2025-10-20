function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const point = Math.floor(arr.length / 2);
    const value = arr.splice(point, 1)[0];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < value) {
            left.push(arr[i]);
        }
        else {
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat([value], quickSort(right));
}

console.log(quickSort([8,34,23,6,1,4,8,10,56,33,7]));