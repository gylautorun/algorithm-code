
class MaxHeap {
    constructor() {
        this.heap = [];
    }
    insert(val) {
        this.heap.push(val);
        this.bubbleUp();
    }
    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] >= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }
    extractMax() {
        const max = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown();
        }
        return max;
    }
    sinkDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let swapIndex = null;
            
            if (leftChildIndex < length && this.heap[leftChildIndex] > this.heap[index]) {
                swapIndex = leftChildIndex;
            }
            if (rightChildIndex < length && 
                ((swapIndex === null && this.heap[rightChildIndex] > this.heap[index]) || 
                 (swapIndex !== null && this.heap[rightChildIndex] > this.heap[leftChildIndex]))) {
                swapIndex = rightChildIndex;
            }
            if (swapIndex === null) break;
            [this.heap[index], this.heap[swapIndex]] = [this.heap[swapIndex], this.heap[index]];
            index = swapIndex;
        }
    }
    isEmpty() {
        return this.heap.length === 0;
    }
}

function minRefuelStops(D, K, stations) {
    stations.sort((a, b) => a[0] - b[0]);
    let maxHeap = new MaxHeap();
    let stops = 0;
    let currentPos = 0;
    let currentGas = K;
    let i = 0;
    
    while (currentPos < D) {
        // 能直接到达终点
        if (currentPos + currentGas >= D) return stops;
        
        // 把能经过的加油站都加入堆
        while (i < stations.length && stations[i][0] <= currentPos + currentGas) {
            maxHeap.insert(stations[i][1]);
            i++;
        }
        
        if (maxHeap.isEmpty()) return -1;
        
        currentGas = currentGas + maxHeap.extractMax() - (stations[i-1][0] - currentPos);
        currentPos = stations[i-1][0];
        stops++;
    }
    
    return stops;
}

// 测试用例
function test() {
    // 示例测试
    console.log(minRefuelStops(15, 5, [[5,2],[7,3],[8,1],[10,5]])); // 输出3
    
    // 不需要加油
    console.log(minRefuelStops(10, 15, [[5,2],[7,3]])); // 输出0
    
    // 无法到达
    console.log(minRefuelStops(20, 5, [[10,5]])); // 输出-1
    
    // 必须每个站都停
    console.log(minRefuelStops(100, 10, [[20,5],[40,5],[60,5],[80,5]])); // 输出4
    
    // 跳过部分加油站
    console.log(minRefuelStops(30, 10, [[5,2],[10,5],[15,1],[20,10]])); // 输出2
    
    // 初始油量为0
    console.log(minRefuelStops(10, 0, [[5,10]])); // 输出1
    
    // 无加油站但能直接到达
    console.log(minRefuelStops(10, 15, [])); // 输出0
}

test();
