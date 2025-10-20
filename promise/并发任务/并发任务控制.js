function timeout(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time * 1000);
    })
}

class SuperTask {
    constructor(props) {
        this.tasks = []; // 任务列表
        this.limit = 2; // 限制并发数
        this.count = 0; // 运行任务数
    }

    add(task) {
        return new Promise((resolve, reject) => {
            this.tasks.push({
                task,
                resolve,
                reject,
            });
            this.runTask();
        });
    }

    runTask() {
        // 运行任务小于限制
        if (this.count < this.limit && this.tasks.length) {
            this.count++;
            const {
                task,
                resolve,
                reject,
            } = this.tasks.shift();

            // 运行任务
            task().then(resolve, reject).finally(() => {
                this.count--;
                this.runTask();
            });
        }
    }
}

const superTask = new SuperTask();

function addTask(time, name) {
    console.time(name);
    superTask
        .add(() => timeout(time)) // 返回promise
        .then(() => {
            console.log(`任务${name}执行`);
            console.timeEnd(name);
        });
}

addTask(10, '1'); // 10s后输出, 任务1执行
addTask(5, '2'); // 5s后输出, 任务2执行
addTask(3, '3'); // 8s后输出, 任务3执行
addTask(4, '4'); // 12s后输出, 任务4执行
addTask(5, '5'); // 15s后输出, 任务5执行
addTask(6, '6'); // 18s后输出, 任务5执行

// 任务2执行
// 2: 5.066s
// 任务3执行
// 3: 8.069s
// 任务1执行
// 1: 10.003s
// 任务4执行
// 4: 12.069s
// 任务5执行
// 5: 15.000s
// 任务6执行
// 6: 18.070s



/**
 * 并发任务控制
 * 实现 ConcurrentTask
 */
class ConcurrentTask {
    constructor() {

    }
    add() {

    }
}

const concurrentTask = new ConcurrentTask();
function timeout(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time * 1000);
    });
}
function addTask(time, name) {
    concurrentTask
        .add(() => timeout(time))
        .then(() => {
            console.log(`任务${name}执行`);
        });
}
addTask(10, '1'); // 10s后输出, 任务1执行
addTask(5, '2');  // 5s后输出, 任务2执行
addTask(3, '3');  // 8s后输出, 任务3执行
addTask(4, '4');  // 12s后输出, 任务4执行
addTask(5, '5');  // 15s后输出, 任务5执行
addTask(6, '6');  // 18s后输出, 任务5执行