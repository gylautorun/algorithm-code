/**
 * 大量异步任务处理
 */

class SmartTaskQueue {
    constructor(maxConcurrentTaskCount = 6) {
        this.maxConcurrentTaskCount = maxConcurrentTaskCount;
        this.taskQueue = [];
        this.runningTaskCount = 0;
    }

    enqueue(task, priority = 0) {
        return new Promise((resolve, reject) => {
            const taskWrapper = async () => {
                this.runningTaskCount++;
                try {
                    const result = await task();
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
                finally {
                    this.runningTaskCount--;
                    this._dequeue();
                }
            };

            if (this.runningTaskCount < this.maxConcurrentTaskCount) {
                taskWrapper();
            }
            else {
                this.taskQueue.push({ task: taskWrapper, priority });
                this.taskQueue.sort((a, b) => b.priority - a.priority); // 按优先级排序
            }
        });
    }
    _dequeue() {
        if (this.taskQueue.length <= 0) {
            return;
        }
        if (this.runningTaskCount >= this.maxConcurrentTaskCount) {
            return;
        }
        const nextTask = this.taskQueue.shift();
        nextTask.task();
    }

    resetSize(newSize) {
        this.maxConcurrentTaskCount = newSize;
        while (
            this.runningTaskCount < this.maxConcurrentTaskCount
            && this.taskQueue.length > 0
        ) {
            this._dequeue();
        }
    }
}