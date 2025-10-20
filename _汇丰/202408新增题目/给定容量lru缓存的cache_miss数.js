class OptimizedLRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.missCount = 0;
        this.hitCount = 0;
    }

    // 添加命中统计和性能监控
    get(key) {
        const start = performance.now();
        let result;
        
        if (this.cache.has(key)) {
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value);
            this.hitCount++;
            result = value;
        } else {
            this.missCount++;
            result = undefined;
        }
        
        this.lastOperationTime = performance.now() - start;
        return result;
    }

    // 添加更多统计信息
    getStats() {
        return {
            misses: this.missCount,
            hits: this.hitCount,
            hitRate: this.hitCount / (this.hitCount + this.missCount) || 0,
            lastOperationTime: this.lastOperationTime
        };
    }
};

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.missCount = 0;
    }

    get(key) {
        if (this.cache.has(key)) {
            // 命中缓存，移动键到Map末尾（表示最近使用）
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        } else {
            // 未命中缓存
            this.missCount++;
            return undefined;
        }
    }

    put(key, value) {
        if (this.cache.has(key)) {
            // 键已存在，先删除再重新插入（更新位置）
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // 达到容量上限，移除最久未使用的项（Map第一个键）
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
        this.cache.set(key, value);
    }

    getMissCount() {
        return this.missCount;
    }
}

// 测试用例
const cache = new LRUCache(2); // 容量为2的缓存

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));    // 返回1，命中
console.log(cache.getMissCount()); // 0

console.log(cache.get(3));    // 返回undefined，未命中
console.log(cache.getMissCount()); // 1

cache.put(3, 3);              // 容量已满，移除键2
console.log(cache.get(2));    // 返回undefined，未命中
console.log(cache.getMissCount()); // 2

cache.put(4, 4);              // 容量已满，移除键1
console.log(cache.get(1));    // 返回undefined，未命中
console.log(cache.getMissCount()); // 3

console.log(cache.get(3));    // 返回3，命中
console.log(cache.get(4));    // 返回4，命中
console.log(cache.getMissCount()); // 3（未增加）