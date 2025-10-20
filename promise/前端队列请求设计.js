// 测试用例
// 模拟异步请求函数
async function mockRequest(id, current , pending) {
    console.log(`\x1b[32m请求 ${id} 开始 , 正在进行的请求${current} 当前排队长度 ${pending} \x1b[0m`);  // Green for start (入队)
    await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟请求延迟
    console.log(`\x1b[31m请求 ${id} 完成\x1b[0m`); // Red for complete (出队)
}

class Queue {
    constructor() {
        this.values = {};
        this.head = 0;
        this.tail = 0;
    }

    // 入队
    enqueue(value) {
        this.values[this.tail] = value;
        this.tail++;
    }

    // 出队
    dequeue(callback) {
        const value = this.values[this.head];
        delete this.values[this.head];
        this.head++;
        if (callback) callback(value);
        return value;
    }

    // 查看队首元素
    peek() {
        return this.values[this.head];
    }

    // 获取队列长度
    get size() {
        return this.tail - this.head;
    }

    // 判断队列是否为空
    get isEmpty() {
        return this.size === 0;
    }
}

// 本质的操作是 await + Promise 模拟的阻塞效果
class AsyncTaskQueue {
    constructor(maxConcurrentRequests = 6) {
        this.maxConcurrentRequests = maxConcurrentRequests; // 最大并发请求数
        this.queue = new Queue(); // 队列
        this.current = 0; // 当前正在运行的请求数
        this.pending = 0; // 等待中的请求数
    }

    // 执行任务
    async execute(task) {
        // 如果当前正在运行的请求数达到最大并发请求数
        if (this.current >= this.maxConcurrentRequests) {
            this.pending++;
            console.log('达到并发限制，生产者等待');
            await new Promise((resolve) => {
                this.queue.enqueue(resolve);
            });
        }
        // 开始请求
        this.current++;
        try {
            await task({
                current: this.current,
                pending: this.pending
            }); // 执行请求
        }
        catch (error) {
            console.error('请求失败', error);
        }
        finally {
            // 请求完成，减少当前请求数
            this.current--;
            // 当所有请求完成时，打印队列为空信息
            if (this.pending === 0 && this.queue.size === 0) {
                console.log('队列为空, 等待新的请求');
            }
            // 如果有排队的请求，唤醒下一个
            if (this.queue.size > 0) {
                const resolve = this.queue.dequeue();
                resolve(); // 唤醒下一个排队的请求
                this.pending--;
            } 
        }

        // // 等待队列有空位
        // while (this.current >= this.maxConcurrentRequests) {
        //     await new Promise((resolve) => {
        //         this.pending++;
        //         this.queue.enqueue(() => {
        //             this.pending--;
        //             resolve();
        //         });
        //     });
        // }
    }
}

// 创建队列实例，最大并发数为 3
const taskQueue = new AsyncTaskQueue(3);
// 模拟 10 个请求
for (let i = 1; i <= 10; i++) {
    taskQueue.execute(({current , pending}) => mockRequest(i, current, pending));  // 添加任务到队列
}