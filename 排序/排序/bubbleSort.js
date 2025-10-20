let bubbleArray = require('./num').cacheDisorderArray();

// console.log(bubbleArray)


function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// 原始实现
function bubbleSort(array) {
    let len = array.length;
    for (let i = len - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1)
            }
        }
    }
}


// 改进1: 判断当前遍历是否有序之后, 就不需要再判断
function bubbleSortOne(array) {
    let len = array.length;
    for (let i = len - 1; i > 0; i--) {
        let isSorted = true; // 设置标志变量 isSorted 初始值为 true, 默认有序
        for (let j = 0; j < i; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);

                // 发生了交换操作, 说明再这一轮中数组仍然无序, 将变量 isSorted 设置为 false
                isSorted = false;
            }
        }

        // 在一轮内层循环后判断
        // 是否有序,
        //  若有序则直接 停止程序;
        //  否则开始下一轮循环
        if (isSorted) {
            return; // 停止函数的执行
        }
    }
}

/**
 * 改进2: 数组局部有序, 则有序部分不需要再进行遍历判断
 *  记录每次结束最后交换位置 x
 *  下次循环在x位置结束, 继续记录最终交换位置 x1
 *  ....重复上面操作
 *  直到 这一轮没有发生交换, 则有序, 结束遍历
 */
function bubbleSortTwo(array) {
    let endPoint = array.length - 1; // 默认最后一次发生交换操作的位置是最后一个元素
    while (endPoint > 0) {
        let thisEndPoint = endPoint; // 设置这一轮循环结束的位置
        for (let i = 0; i < thisEndPoint; i++) {
            if (array[i] > array[i + 1]) {
                swap(array, i, i + 1);

                // 设置(更新)最后一次发生了交换操作的位置
                endPoint = i;
            }

            // 放在这里也可以
            // //  此轮遍历交换位置和设置交换操作结束位置相同, 无交换操作, 则代表数组有序
            // if (thisEndPoint === endPoint) {
            //     return; // 停止函数的执行
            // }
        }
        //  此轮遍历交换位置和设置交换操作结束位置相同, 无交换操作, 则代表数组有序
        if (thisEndPoint === endPoint) {
            return; // 停止函数的执行
        }
    }
}

/**
 * 改进3: 同时最大与最小数归位, 则不再计算
 *  耗费时间长
 */
function bubbleSortThree(array) {
    let endPoint = array.length - 1; // 默认最后一次发生交换操作的位置是最后一个元素
    let startPoint = 0; // 默认第一次发生交换操作的位置是第一个元素
    while (endPoint > startPoint) {
        for (let i = startPoint; i < endPoint; i++) {
            if (array[i] > array[i + 1]) {
                swap(array, i, i + 1);
            }
        }
        endPoint--;

        for (let i = endPoint; i > startPoint; i--) {
            if (array[i] < array[i - 1]) {
                swap(array, i, i - 1);
            }
        }
        startPoint++;
    }
}

/**
 * 改进4: 1, 2 结合
 *
 */
function bubbleSortFour(array) {
    let endPoint = array.length - 1; // 默认最后一次发生交换操作的位置是最后一个元素
    while (endPoint > 0) {
        let isSorted = true; // 设置数组整体有序标志变量
        let thisEndPoint = endPoint; // 设置这一轮循环结束的位置
        for (let i = 0; i < thisEndPoint; i++) {
            if (array[i] > array[i + 1]) {
                swap(array, i, i + 1);

                // 设置(更新)最后一次发生了交换操作的位置
                endPoint = i;
                isSorted = false;  // 设置本轮为无序
            }
        }

        if(isSorted){ // 判断数组是否已经整体有序
            return;
        }
    }
}

/**
 * 改进5: 2, 3 结合
 *
 */
function bubbleSortFive(array) {
    let startPoint = 0; // 默认第一次发生交换操作的位置是第一个元素
    let startPos = startPoint;
    let endPoint = array.length - 1; // 默认最后一次发生交换操作的位置是最后一个元素
    let endPos = endPoint;
    while (endPoint > startPoint) {
        for (let i = startPoint; i < endPoint; i++) {
            if (array[i] > array[i + 1]) {
                swap(array, i, i + 1);
                endPos = i; // 记录这个交换位置
            }
        }
        endPoint = endPos;  // 设置下一轮的遍历终点

        for (let i = endPoint; i > startPoint; i--) {
            if (array[i] < array[i - 1]) {
                swap(array, i, i - 1);
                startPos = i; // 记录这个交换位置
            }
        }
        startPoint = startPos; // 设置下一轮的遍历终点
    }
}

/**
 * 改进6: 1, 2, 3 结合
 *
 */
function bubbleSortSix(array){
    let start = 0, startPos = start,
        end = array.length - 1, endPos = end;

    while(start < end){
        let isSorted = true; // 设置有序无序的标志变量
        // 从前向后过一遍
        for(let i = start; i < end; i++){
            if(array[i] > array[i+1]){
                swap(array, i, i+1);

                endPos = i; // 记录这个交换位置
                isSorted = false; // 设置无序标志
            }
        }

        if(isSorted){
            return;
        }

        end = endPos;  // 设置下一轮的遍历终点


        // 从后向前过一遍
        for(let i = end; i > start; i--){
            if(array[i] < array[i-1]){
                swap(array, i, i-1);

                startPos = i; // 记录这个交换位置
                isSorted = false; // 设置无序标志
            }
        }

        if(isSorted){
            return;
        }

        start = startPos; // 设置下一轮的遍历终点
    }
}


console.log('bubbleArray', bubbleArray);
// 10万数据量
console.time('start');
bubbleSort(bubbleArray); // 8823.039ms
// bubbleSortOne(bubbleArray); // 143.02ms

// console.log(bubbleSortTwo(bubbleSortTwo)); // 0.222ms 0.214ms
// console.log(bubbleSortThree(bubbleArray)); // 20982.131ms
// console.log(bubbleSortFour(bubbleArray)); // 4.933ms
// console.log(bubbleSortFive(bubbleArray)); // 3.296ms
// console.log(bubbleSortSix(bubbleArray)); // 3.771ms
console.timeEnd('start');
console.log(bubbleArray);