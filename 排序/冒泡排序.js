function bubbleSort(arr) {
    const n = arr.length;
    if (n < 2) {
        return arr;
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i; j++) {
            if (arr[j + 1] < arr[j]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

console.log(bubbleSort([8,34,23,6,1,4,8,10,56,33,7]));