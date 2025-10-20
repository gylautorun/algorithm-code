// LRU 是 Least Recently Used 的缩写，即最近最少使用，是一种常用的页面置换算法，选择内存中最近最久未使用的页面予以淘汰
// 使用场景：正如定义所说，如果我们想要实现缓存机制 -- 满足最近最少使用淘汰原则，我们就可以使用LRU算法缓存机制。
// 如：vue 中 keep-alive 中就用到了此算法。

// 实现 LRU 缓存
// - 维护一个数组，提供 get 和 put 两个方法，并且限制数组元素数量（及缓存数量)
// - get 可以标记某个元素是最新使用的，提升到第一项
// - put 可以加入一个 key-value 元素，但是需要判断是否已存在，是否超出限额

// 数组实现
const lruArray = function(limit) {
    this.list = [];
    this.limit = limit;
};

lruArray.prototype.get = function (key) {
    const index = this.list.findIndex(item => item.key === key);
    if (index === -1) {
        return -1;
    }
    // 有则删除, 在加入最新
    const value = this.list[index].value;
    this.list.splice(index, 1);
    this.list.unshift({key, value});
    return value;
};
lruArray.prototype.put = function (key, value) {
    const index = this.list.findIndex(item => item.key === key);
    // 数据已存在, 先删除在更新
    if (index > -1) {
        this.cache.splice(index, 1);
    } 
    else if (this.limit === this.list.length) {
        // 淘汰最久不用的
        this.list.pop();
    }
    this.list.unshift({key, value});
};


// map 实现
const lruMap = function(limit) {
    this.map = new Map();
    this.limit = limit;
};
lruMap.prototype.get = function (key) {
    if (this.map.has(key)) {
        const value = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, value);
        return value;
    }
    return -1;
};

lruMap.prototype.put = function (key, value) {
    if (this.map.has(key)) {
        this.map.delete(key);
    }
    else if (this.map.size() === this.limit) {
        // this.map.keys().next().value 最历史的 key
        this.map.delete(this.map.keys().next().value);
    }
    this.map.set(key, value);
};