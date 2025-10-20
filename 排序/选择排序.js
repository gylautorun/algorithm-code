function selectSort(arr) {
    const n = arr.length;
    if (n < 2) {
        return arr;
    }
    let minIndex;
    let temp;
    for (let i = 0; i < n; i++) {
        minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // temp = arr[i];
        // arr[i] = arr[minIndex];
        // arr[minIndex] = temp;
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}

console.log(selectSort([8,34,23,6,1,4,8,10,56,33,7]));