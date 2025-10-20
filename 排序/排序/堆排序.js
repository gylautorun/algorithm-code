let bubbleArray = require('./num').cacheDisorderArray();

// 交换数组
function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
class maxHeapSort {
    /**
     * 大顶堆 交换 排序函数
     * @param {*} list: 数据
     * @param {*} start: 构建开始位置
     * @param {*} end: 构建结束位置
     */
    maxTopHeap(list, start, end) {
        let parent = start;
        // 下标0开始 start * 2 + 1 => 左子  +1 为右子
        let sub = start * 2 + 1;
        // 
        while (sub < end) {
            let subTemp = sub;
            // 左子 < 右子 => 要对比交换父节点和右节点
            if (sub + 1 < end && list[sub] < list[sub + 1]) {
                subTemp = sub + 1;
            }
            // 不需要交换
            if (list[parent] > list[subTemp]) {
                return;
            }
            else {
                // 交换元素
                swap(list, parent, subTemp);
                // 继续对比交换后的堆
                parent = subTemp;
                sub = subTemp * 2 + 1;
            }
        }
    }

    /**
     * 堆排序
     * @param {*} list: 数据
     */
    sort(list) {
        const l = list.length;
        console.log('================================大顶堆');
        /**
         * 构建初次二叉堆数据
         * 非叶子节点索引是i: 左叶子索引 2i+1, 右叶子索引 2i+2,
         * 最后一个叶子节点的索引值是n - 1, 它父节点索引为((n - 1) - 1) / 2
         * 从最后一个非叶子节点开始, 依次向顶部对比交换
         */
        for (let i = Math.floor(l / 2 - 1); i >= 0; i--) {
            this.maxTopHeap(list, i, l);
        }

        // 循环交替第一个最大元素 和 最后一个元素 => 走堆交换排序
        for (let i = l - 1; i > 0; i--) {
            swap(list, 0, i);
            this.maxTopHeap(list, 0, i);
            console.log(list.join(' '));
        }
    }

    cloneData(list) {
        return list.slice(0);
    }
}

// const arr = [93, 64, 96, 13, 35, 69, 46, 65, 11, 31, 22, 33, 78, 83, 25];
// const maxHeap = new maxHeapSort();
// maxHeap.sort(maxHeap.cloneData(arr));


class minHeapSort {
    /**
     * 小顶堆 交换排序函数
     * @param {*} list: 数据
     * @param {*} start: 构建开始位置
     * @param {*} end: 构建结束位置
     */
    minTopHeap(list, start, end) {
        let parent = start;
        let sub = start * 2 + 1;

        while (sub < end) {
            let subTemp = sub;
            if (sub + 1 < end && list[sub] > list[sub + 1]) {
                subTemp = sub + 1;
            }
            // 不需要交换
            if (list[parent] < list[subTemp]) {
                return;
            }
            else {
                swap(list, parent, subTemp);
                parent = subTemp;
                sub = subTemp * 2 + 1;
            }
        }
    }
    sort(list) {
        const l = list.length;
        // console.log('================================小顶堆');
        for (let i = Math.floor(l / 2 - 1); i >= 0; i--) {
            this.minTopHeap(list, i, l);
        }
        // 循环交替第一个最小元素 和 最后一个元素 => 走堆交换排序
        for (let i = l - 1; i > 0; i--) {
            swap(list, 0, i);
            this.minTopHeap(list, 0, i);
            // console.log(list.join(' '));
        }
    }
    cloneData(list) {
        return list.slice(0);
    }
}

const minHeap = new minHeapSort();
// minHeap.sort(minHeap.cloneData(arr));

console.log('bubbleArray', bubbleArray);
// 10万数据量
console.time('start');
minHeap.sort(bubbleArray); // 6.388ms
console.timeEnd('start');