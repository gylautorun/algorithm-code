function timeout(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

/**
 * 分析:
 *  按照下面输出, 则为并发模式, 且最大并发为 2
 *  add() => 返回一个 promise
 *  [{1, 10}, {2, 5}, {3, 3}, {4, 4}, {5, 5}, {6, 20}, {7, 6}]
 *  [{1, 10}, {2, 5}] => 5 s 后, 任务 2 完成
 *  [{1, 10}, {3, 3}] => 8 s 后, 任务 3 完成
 *  [{1, 10}, {4, 4}] => 10s 后, 任务 1 完成
 *  [{4, 4},  {5, 5}] => 12s 后, 任务 4 完成
 *  [{5, 5}, {6, 20}] => 15s 后, 任务 5 完成
 *  [{6, 20}, {7, 6}] => 21s 后, 任务 7 完成
 *  [{6, 20}]         => 32s 后, 任务 6 完成
 *  10s 后, 任务 1 完成
 *  5 s 后, 任务 2 完成
 *  8 s 后, 任务 3 完成
 *  12s 后, 任务 4 完成
 *  15s 后, 任务 5 完成
 *  32s 后, 任务 6 完成
 *  21s 后, 任务 7 完成
 */
class SuperTask {
    constructor(max = 2) {
        this.max = 2;
        this.tasks = [];
        this.pending = 0;
    }

    /**
     * 
     * 每次添加需要触发一次执行任务, 需要运行
     */
    add(task) {
        return new Promise((resolve, reject) => {
            this.tasks.push({
                task,
                resolve,
                reject,
            });
            this._run(); // 执行下一次任务
        });
    }

    _run() {
        while (this.pending < this.max && this.tasks.length > 0) {
            const {task, resolve, reject} = this.tasks.shift();
            task().then(resolve, reject).finally(() => {
                this.pending--; // 执行任务减 1
                this._run(); // 执行下一次任务
            });
            this.pending++; // 执行任务加 1
        }
    } 
}

const superTask = new SuperTask();
const startTime = Date.now();
function addTask(time, name) {
    // add() => promise
    superTask
        .add(() => timeout(time))
        .then(() => {
            console.log(`任务${name}: `, {
                time,
                t: Date.now() - startTime,
            })
        })
}

addTask(10 * 1000, 1); // 10s 后, 任务 1 完成
addTask(5 * 1000, 2);  // 5 s 后, 任务 2 完成
addTask(3 * 1000, 3);  // 8 s 后, 任务 3 完成
addTask(4 * 1000, 4);  // 12s 后, 任务 4 完成
addTask(5 * 1000, 5);  // 15s 后, 任务 5 完成
addTask(20 * 1000, 6); // 32s 后, 任务 6 完成
addTask(6 * 1000, 7);  // 21s 后, 任务 7 完成