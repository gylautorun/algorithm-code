/* 
    实现一个异步任务处理器, 保证同时执行的只有两个任务, 且按照时间顺序打印
    addTask(1000, '1');
    addTask(500, '2');
    addTask(300, '3');
    addTask(400, '4');
    以上例子: 输出顺序 2、3、1、4
*/
const delay = timeout => new Promise((resolve, reject) => setTimeout(resolve, timeout));
const addTaskFn = () => {
    const queue = [];
    let pending = false;
    let index = 0;
    return (time, info) => {
        const fn = async() => {
            await delay(time);
            console.log(info);
        }
        queue.push(fn);
        if(!pending) {
            pending = true;
            Promise.resolve().then(setUp);
        }
        async function setUp() {
            while(queue.length && index < 2) { // 小于两个才执行
                index++;
                const f = queue.shift();
                f().then(() => {
                    index--;
                    setUp();
                });
            }
        }
    }
}
// 保证同时执行的只有两个任务
// 且按照时间顺序打印
// 1000 > 500 + 300 && 1000 < 500 + 300 + 400
// 所以输出顺序 2、3、1、4
const addTask = addTaskFn();
addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
