
class LRU {
    constructor(size) {
        this.size = size;
        this.map = new Map();
    }

    get(key) {
        if (this.map.has(key)) {
            const value = this.map.get(key);
            this.map.delete(key);
            this.map.set(key, value);
            return value;
        }
        return -1;
    }

    put(key, value) {
        // 存在
        if (this.map.has(key)) {
            this.map.delete(key);
        }
        else if (this.map.size >= this.size) {
            // 删除最早未使用的元素 Map.keys().next().value
            const firstKey = this.map.keys().next().value;
            this.map.delete(firstKey);
        }
        this.map.set(key, value);
    }

    toString() {
        console.log('size',this.size);
        console.table(this.map);
    }
}

class LRU {
    
}
const lru = new LRU(4)
lru.put(2,2);  // 入 2，剩余容量3
lru.put(3,3); // 入 3，剩余容量2
lru.put(4,4);  // 入 4，剩余容量1
lru.put(5,5);  // 入 5，已满    从头至尾         2-3-4-5
lru.put(4,4);  // 入4，已存在 ——> 置队尾         2-3-5-4
lru.put(1,1);  // 入1，不存在 ——> 删除队首 插入1  3-5-4-1
lru.get(3);    // 获取3，刷新3——> 置队尾         5-4-1-3
lru.toString();