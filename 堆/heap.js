function getNumberArray(n) {
    const num = 100 * n;
    // return Array.from({length: n}).fill(0).map(() => Math.ceil(Math.random() * num));
    return new Array(n).fill(1).map(() => Math.ceil(Math.random() * num));
}

class MaxHeap {
    // 大顶堆
    maxHeap = [];
    // 小顶堆
    // minHeap = [];

    constructor(list) {
        if (!list) {
            return;
        }
        this.create(list);
    }

    // 建堆
    create(list) {
        console.time('1');
        // 通过遍历堆化实现
        // 将列表元素原封不动添加进堆
        this.maxHeap = [...list];
        // 最后一个父节点开始遍历
        for (let i = this.parent(this.size - 1); i >= 0; i--) {
            this.siftDown(i);
        }

        // 借助入堆操作实现
        // for (let i = 0; i < list.length; i++) {
        //     this.push(list[i]);
        // }
        console.timeEnd('1');
    }

    // 入堆
    push(val) {
        // 添加节点
        this.maxHeap.push(val);
        this.siftUp(this.size - 1);
    }
    // 从节点 i 开始，从底至顶堆化
    siftUp(i) {
        while (true) {
            // 获取 i 父节点
            const p = this.parent(i);
            if (p < 0 || this.maxHeap[i] <= this.maxHeap[p]) {
                // 父节点跳出堆
                // 节点小于父节点
                break;
            }
            // 交换节点
            this.swap(i, p);
            // 向上堆化
            i = p;
        }
    }

    // 堆顶出堆
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        // 交换堆顶 堆底
        this.swap(0, this.size - 1);
        const res = this.maxHeap.pop();
        this.siftDown(0);
        return res;
    }

    // 从顶至底堆化
    siftDown(i) {
        while (true) {
            // 判断节点 i, l, r 中值最大的节点
            const l = this.left(i);
            const r = this.right(i);
            let t = i;

            if (l < this.size && this.maxHeap[t] < this.maxHeap[l]) {
                t = l;
            }
            if (r < this.size && this.maxHeap[t] < this.maxHeap[r]) {
                t = r;
            }
            if (i === t) {
                // 当前已经堆化正常, 直接跳出
                break;
            }
            // 交换节点
            this.swap(i, t);
            // 向上堆化
            i = t;
        }
    }

    // 交换节点
    swap(i, j) {
        const temp = this.maxHeap[i];
        this.maxHeap[i] = this.maxHeap[j];
        this.maxHeap[j] = temp;

        // 或者
        // [this.maxHeap[j], this.maxHeap[i]] = [this.maxHeap[i], this.maxHeap[j]];
    }

    // 访问堆顶元素
    peek() {
        return this.maxHeap[0];
    }
    // 获取左子节点的索引
    left(i) {
        return 2 * i + 1;
    }

    // 获取右子节点的索引
    right(i) {
        return 2 * i + 2;
    }

    // 获取父节点的索引
    parent(i) {
        return Math.floor((i - 1) / 2);
    }

    // 堆大小
    get size() {
        return this.maxHeap.length;
    }

    isEmpty() {
        return this.size <= 0;
    }
}


module.exports = {
    MaxHeap,
    getNumberArray,
}