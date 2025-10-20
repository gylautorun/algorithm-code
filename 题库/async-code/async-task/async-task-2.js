/* 
addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
*/
const delay = timeout => new Promise((resolve, reject) => setTimeout(resolve, timeout));

// 另一种写法
const addTaskFn2 = (time, info) => {
    const queue = [];
    const blockList = [];
    return async (time, info) => {
        const fn = async() => {
            await delay(time);
            console.log(info);
        }
        queue.push(fn);
        if(queue.length > 2) { // 大于两个时，阻塞执行
            await new Promise((resolve, reject) => {
                blockList.push(resolve);
            });
        }
        fn().then(() => {
            queue.shift();
            const resolve = blockList.shift();
            resolve && resolve();
        });
    }
}

const addTask2 = addTaskFn2();
addTask2(1000, 'addTask2---1');
addTask2(200, 'addTask2---2');
addTask2(300, 'addTask2---3');
addTask2(100, 'addTask2---4');
addTask2(200, 'addTask2---5');