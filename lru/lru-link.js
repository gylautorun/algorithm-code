class LinkNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoubleLinkedList {
    constructor() {
        // 头部节点
        this.head = null;
        // 尾部节点
        this.tail = null;
    }

    /**
     * 添加链表尾部
     * @param {*} node: LinkNode 节点对象
     */
    addTail(node) {
        if (!this.head) {
            this.head = node;
            this.tail = node;
        }
        else {
            node.next = null;
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
    }

    /**
     * 移除链表头部
     */
    removeHead() {
        if (!this.head) {
            return null;
        }
        const removeNode = this.head;
        this.head = this.head.next;

        if (this.head) {
            this.head.prev = null;
        }
        else {
            this.tail = null;
        }
        return removeNode;
    }
    /**
     * 移除链表尾部
     */
    removeTail() {
        if (!this.tail) {
            return null;
        }
        const removeNode = this.tail;
        this.tail = this.tail.prev;

        if (this.tail) {
            this.tail.next = null;
        }
        else {
            this.head = null;
        }
        return removeNode;
    }

    /**
     * 指定节点移动到尾部
     * @param {*} node 
     */
    moveToTail(node) {
        if (node === this.tail) {
            return;
        }
        // 断开当前节点与前后联系
        // 非链表头部节点
        if (node.prev) {
            node.prev.next = node.next;
        }
        // 链表头部节点
        else {
            // 切换链表头部节点
            this.head = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
        this.addTail(node);
    }

    /**
     * 移除某个节点
     */
    removeNode(node) {
        if (node === this.head) {
            this.removeHead();
        }
        else if (node === this.tail) {
            this.removeTail();
        }
        else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
    }

    // 其他方法......
}

class LRULinkCache {
    size; // 缓存大小
    /**
     * hashMap 存储键值对，便于快速查找
     * 双向链表存储键值对，值跟随变化, 不需要处理顺序
     */
    hashMap = new Map(); // hash 表存储键值对
    doubleLinkedList = new DoubleLinkedList(); // 双向链表存储键值对
    constructor(size) {
        this.size = size || 10;
    }

    get(key) {
        if (this.hashMap.has(key)) {
            const node = this.hashMap.get(key);
            this.doubleLinkedList.moveToTail(node);
            return node.value;
        }
        return -1;
    }

    put(key, value) {
        if (this.hashMap.has(key)) {
            const node = this.hashMap.get(key);
            node.value = value;
            this.doubleLinkedList.moveToTail(node);
        }
        else {
            if (this.hashMap.size >= this.size) {
                const removeNode = this.doubleLinkedList.removeHead();
                this.hashMap.delete(removeNode.key); // 删除 最旧 hash 表中的键值对
            }
            const newNode = new LinkNode(key, value);
            this.hashMap.set(key, newNode);
            this.doubleLinkedList.addTail(newNode);
        }
    }

    toString() {
        console.log('size',this.size);
        console.table(this.hashMap);
        console.table(this.doubleLinkedList);
    }
}

const cache = new LRULinkCache(5);
cache.put('1', 'www.page1.com');
cache.put('2', 'www.page2.com');
cache.put('3', 'www.page3.com');
cache.put('4', 'www.page4.com');
cache.put('5', 'www.page5.com');
cache.toString();
cache.put('6', 'www.page6.com');
cache.toString();
cache.put('3', 'www.change3.com');
cache.toString();
cache.get('1');
cache.toString();

