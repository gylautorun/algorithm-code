/**
 * 依次执行一些列任务
 * 所有任务全部完成可以得到每个任务的执行结果
 * 需要返回两个方法. start启动任务, pause 暂停任务
 * 每个任务有原子性不能中断, 只能在两个任务之间中断
 * @param  {...any} tasks 
 */
function processTasks(...tasks) {
    let isRunning = false;
    const result = []; // 接收结果
    let i = 0; // 执行第几个
    let promise = null;
    return {
        start() {
            return new Promise(async (resolve, reject) => {
                // 当完成后, 后续调用直接返回结果
                if (promise) {
                    promise.then(resolve, reject);
                    return;
                }
                // 运行中点继续击执行是不生效的
                if (isRunning) {
                    return;
                }
                isRunning = true; // 标记运行中
                while (i < tasks.length) {
                    try {
                        console.log(i, '执行中');
                        result.push(await tasks[i]())
                        console.log(i, '执行完成');
                    } catch (e) {
                        // 报错执行完成
                        isRunning = false;
                        promise = Promise.reject(e);
                        reject(e);
                        return;
                    }
                    i++;
                    if (!isRunning && i < tasks.length - 1) { // 是否中断 & 不能最后一个
                        console.log('执行被中断');
                        return;
                    }
                }

                // 成功
                isRunning = false;
                resolve(result);
                promise = Promise.resolve(result);
            });
        },
        pause() {
            isRunning = false;
        }
    }
}