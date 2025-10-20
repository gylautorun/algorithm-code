/**
    给定一个初始数组 []，对于数组中的每个数字 k，生成两个新数字 k*2+1 和 k*3+1，
    并将它们添加到数组中。要求最终数组是有序且无重复元素的，返回第 N 个数字

    初始: [1]
    1 → 1*2+1=3, 1*3+1=4 → [1, 3, 4]
    3 → 3*2+1=7, 3*3+1=10 → [1, 3, 4, 7, 10]
    4 → 4*2+1=9, 4*3+1=13 → [1, 3, 4, 7, 9, 10, 13]
    ...
    最终数组: [1, 3, 4, 7, 9, 10, 13, ...]

    设计一个算法，高效地生成这个有序无重复数组，并返回第 N 个数字。要求时间复杂度尽可能低
    - 每次从数组中取出一个数字 k，生成 2k+1 和 3k+1，并插入到数组中, 需要保证数组有序且无重复，因此需要动态维护一个有序集合。
    - 类似**广度优先搜索（BFS）或优先队列（最小堆）**的思路，每次处理最小的未被处理的数字
    - 为了避免重复，可以用一个哈希集合记录已经生成的数字
    - 为了高效获取下一个最小的数字，可以用最小堆（优先队列）来存储待处理的数字

    算法选择：
    - 最小堆 + 哈希集合：
        初始化堆和集合，起始数字为 1。
        每次从堆顶取出最小数字 k，生成 2k+1 和 3k+1。
        如果生成的数字未在集合中，则加入堆和集合。
        重复直到找到第 N 个数字。
    - 时间复杂度：
        - 每次堆操作（插入和弹出）是 O(log M)，其中 M 是堆的大小。
        - 总共需要 N 次堆操作，因此时间复杂度为 O(N log N)。
    - 空间复杂度为 O(N)（堆和集合）
 */


class MinHeap {
    constructor() {
        this.heap = [];
    }
    insert(value) {
        this.heap.push(value);
        this._bubbleUp(this.size - 1);
    }
    _bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] < this.heap[parentIndex]) {
                [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            }
            else {
                break;
            }
        }
    }

    /**
     * 提取并返回最小元素
     *
     * 该方法从某种数据结构中提取并返回最小的元素。
     *
     * @returns 返回最小元素的值
     */
    extractMin() {
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.size > 0) {
            this.heap[0] = last;
            this._sinkDown(0);
        }
        return min;
    }

    _sinkDown(index) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let smallest = index;
        if (leftChildIndex < this.size && this.heap[leftChildIndex] < this.heap[smallest]) {
            smallest = leftChildIndex;
        }
        if (rightChildIndex < this.size && this.heap[rightChildIndex] < this.heap[smallest]) {
            smallest = rightChildIndex;
        }
        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this._sinkDown(smallest);
        }
    }


    get size() {
        return this.heap.length;
    }
}

function getNthNumber(N) {
    if (N < 1) {
        return -1;
    }
    if (N === 1) {
        return 1;
    }
    const minHeap = new MinHeap();
    const set = new Set();
    minHeap.insert(1);
    set.add(1);
    let current;
    for (i = 0; i < N; i++) {
        current = minHeap.extractMin();
        const next1 = current * 2 + 1;
        const next2 = current * 3 + 1;
        if (!set.has(next1)) {
            minHeap.insert(next1);
            set.add(next1);
        }
        if (!set.has(next2)) {
            minHeap.insert(next2);
            set.add(next2);
        }
    }
    return current;
}

// 测试
console.log(getNthNumber(1)); // 1
console.log(getNthNumber(2)); // 3
console.log(getNthNumber(3)); // 4
console.log(getNthNumber(4)); // 7
console.log(getNthNumber(5)); // 9
console.log(getNthNumber(6)); // 10
console.log(getNthNumber(7)); // 13
console.log(getNthNumber(8)); // 15  7*2+1
console.log(getNthNumber(9)); // 19  9*2+1
console.log(getNthNumber(10)); // 21 10*2+1