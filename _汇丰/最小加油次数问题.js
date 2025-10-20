/**
 * leetcode: https://leetcode.cn/problems/minimum-number-of-refueling-stops/submissions/633304971/
 */
/**
    A car travels from a starting position to a destination which is target miles east of the starting position.
    There are gas stations along the way. The gas stations are represented as an array stations where stations[i]= [positioni, fueli] indicates that the ith gas station is positioni miles east of the startingposition and hasfueli liters of gas.
    The car starts with an infinite tank of gas, which initially has startfuel liters of fuel in it. lt usesone liter of gas per one mile that it drives. When the car reaches a gas station, it may stop andrefuel,transferringall the gas from the station into the car.
    Retum the minimum number of refueling stops the car must make in order to reach itsdestination.lfit cannotreach the destination, return -1.
    汽车从起始位置行驶到起始位置以东目标英里的目的地。
    沿途有加油站。加油站表示为阵列加油站，其中加油站[i]=[positioni，fueli]表示第i个加油站位于起始位置以东i英里处，有燃料升。
    汽车启动时有一个无限大的油箱，最初油箱里有启动燃料升。它每行驶一英里需要一升汽油。当汽车到达加油站时，它可能会停车并加油，将加油站的所有汽油都转移到汽车里。
    返回汽车到达目的地必须进行的最小加油站次数。如果无法到达目的地，返回-1。
 */

    // 最大堆实现类
class MaxHeap {
    constructor() {
        this.heap = [];
    }
    
    // 返回堆的大小
    size() {
        return this.heap.length;
    }
    
    // 插入元素
    insert(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    // 提取最大值
    extractMax() {
        if (this.isEmpty()) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return max;
    }
    extractMax_1() {
        if (this.isEmpty()) return null;
        const max = this.heap[0];
        const end = this.heap.pop();
        if (!this.isEmpty()) {
            this.heap[0] = end;
            this.bubbleDown(0);
        }
        return max;
    }
    bubbleUp_1(index) {
        const parent = Math.floor((index - 1) / 2);
        if (index > 0 && this.heap[index] > this.heap[parent]) {
            [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
            this.bubbleUp(parent);
        }
    }
    
    // 上浮操作
    bubbleUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[parent] < this.heap[index]) {
                [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
                index = parent;
            } else {
                break;
            }
        }
    }
    
    // 下沉操作
    bubbleDown(index) {
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        let largest = index;
        
        if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
            largest = left;
        }
        
        if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
            largest = right;
        }
        
        if (largest !== index) {
            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            this.bubbleDown(largest);
        }
    }
    
    isEmpty() {
        return this.size === 0;
    }
}
/**
 * 贪心算法
 */
/**
 * 计算到达目的地所需的最小加油次数
 * @param {number} target - 目的地距离起点的距离（英里）
 * @param {number} startFuel - 初始油量（升）
 * @param {number[][]} stations - 加油站数组，每个元素为[位置, 油量]
 * @return {number} - 最小加油次数，无法到达返回-1
 */
function minRefuelStops(target, startFuel, stations) {
    // 最大堆用于存储可加油站的油量
    const maxHeap = new MaxHeap();
    let currentFuel = startFuel; // 当前油量
    let stops = 0; // 加油次数
    let i = 0; // 当前加油站索引
    const n = stations.length; // 加油站数量
    
    // 当当前油量不足以到达目的地时循环
    while (currentFuel < target) {
        // 将当前油量可以到达的所有加油站加入最大堆
        while (i < n && stations[i][0] <= currentFuel) {
            maxHeap.insert(stations[i][1]);
            i++;
        }
        
        // 如果没有加油站可以加油，且无法到达目的地
        if (maxHeap.size() === 0) {
            return -1;
        }
        
        // 取出油量最多的加油站加油
        currentFuel += maxHeap.extractMax();
        stops++;
    }
    
    return stops;
}

// 测试用例
console.log('无需加油: ');
const no_1 = minRefuelStops(1, 1, []);
const no_2 = minRefuelStops(10, 20, [[10, 60]]);
console.log(no_1, no_2);

console.log('无法到达: ');
const noArrived_0 = minRefuelStops(100, 1, [[10, 60]]);
const noArrived_1 = minRefuelStops(100, 9, [[10, 60]]);
const noArrived_2 = minRefuelStops(100, 8, [[8, 50], [60, 100]]);
console.log(noArrived_0, noArrived_1, noArrived_2);

console.log('中间加油: ');
const mid_0 = minRefuelStops(100, 10, [[10, 60], [20, 30], [30, 30], [60, 40]]);
const mid_1 = minRefuelStops(100, 50, [[25, 25], [50, 50]]);
console.log(mid_0, mid_1);

