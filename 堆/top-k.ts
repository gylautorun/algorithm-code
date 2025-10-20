const heap = require('./heap');

// 将堆中所有元素取反，从而用大顶堆来模拟小顶堆
const maxHeap = new heap.MaxHeap();

class MinHeap {
    // 元素入堆
    push(val: number) {
        // 元素取反
        maxHeap.push(-val);
    }

    // 元素出堆
    pop(): number {
        // 元素取反
        return -maxHeap.pop();
    }

    // 访问堆顶元素
    peek() {
        return -maxHeap.peek();
    }

    // 取出堆中元素
    get minHeap(): number[] {
        // 元素取反
        return maxHeap.maxHeap.map((num: number) => -num);
    }

    get size() {
        return maxHeap.size;
    }
}

// 基于堆查找数组中最大的 k 个元素
function topKHeap(numbers: number[], k: number): number[] {
    // 初始化小顶堆
    const minHeap = new MinHeap();
    // 将数组的前 k 个元素入堆
    for (let i = 0; i < k; i++) {
        minHeap.push(numbers[i]);
    }
    // 从第 k+1 个元素开始，保持堆的长度为 k
    for (let i = k; i < numbers.length; i++) {
        const val = numbers[i];
        // 若当前元素大于堆顶元素，则将堆顶元素出堆、当前元素入堆
        if (val > minHeap.peek()) {
            minHeap.pop();
            minHeap.push(val);
        }
    }

    return minHeap.minHeap;
}

const list = heap.getNumberArray(15);

console.log(list, '=>',  topKHeap(list, 6));




