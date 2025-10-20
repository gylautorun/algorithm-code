class DoubleLinkedNode {
    constructor(key = null, value = null) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity; // 最大容量
        this.map = new Map(); // 存储键和对应的节点
        this.head = new DoubleLinkedNode(); // 头部哨兵节点 (虚拟头部节点)
        this.tail = new DoubleLinkedNode(); // 尾部哨兵节点 (虚拟尾部节点)
        // // 初始化链表
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key) {
        if (!this.map.has(key)) {
            return -1;
        }
        const node = this.map.get(key);
        // 节点移动到头部, 最近使用
        this.moveToHead(node);
        return node.value;
    }

    put(key, value) {
        // 设置节点存在
        if (this.map.has(key)) {
            // 更新值并移到头部
            const node = this.map.get(key);
            node.value = value;
            this.moveToHead(node);
        }
        else {
            // 设置节点不存在
            // 创建新节点
            const newNode = new DoubleLinkedNode(key, value);
            this.map.set(key, newNode);
            this.addToHead(newNode);
            // 是否超过容量, 超过则删除尾部节点
            if (this.map.size > this.capacity) {
                const tailNode = this.removeTail();
                this.map.delete(tailNode.key);
            }
        }
    }

    addToHead(node) {
        node.prev = this.head;
        node.next = this.head.next;
        // head 节点 和 之前首节点  还没和 node 连接
        // this.head.next 旧的首节点 prev 指向 node, 移位到第二位
        this.head.next.prev = node;
        this.head.next = node;
    }
    /**
     * 将指定节点移动到链表头部
     *
     * @param {Node} node 需要移动的节点
     */
    moveToHead(node) {
        // 移除当前节点
        this.removeNode(node);
        // 当前节点添加到头部
        this.addToHead(node);
    }
    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    /**
     * 删除节点尾部的子节点
     *
     * 该方法会移除当前节点的最后一个子节点
     */
    removeTail() {
        // 移除尾部节点, this.tail.prev 实际最后一个节点
        const tailNode = this.tail.prev;
        this.removeNode(tailNode);
        return tailNode;
    }
}

// 测试用例
const lru = new LRUCache(2);
lru.put(1, 1); // 缓存是 {1=1}
lru.put(2, 2); // 缓存是 {1=1, 2=2}
console.log(lru.get(1)); // 返回 1（移到头部）
lru.put(3, 3); // 删除键 2（最久未使用），缓存是 {1=1, 3=3}
console.log(lru.get(2)); // 返回 -1（未找到）
lru.put(4, 4); // 删除键 1，缓存是 {4=4, 3=3}
console.log(lru.get(1)); // 返回 -1
console.log(lru.get(3)); // 返回 3
console.log(lru.get(4)); // 返回 4