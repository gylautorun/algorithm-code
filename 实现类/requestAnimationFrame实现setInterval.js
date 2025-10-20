/**
 * requestAnimationFrame 实现setInterval
 * - cancelAnimationFrame 关闭定时器
 */

function myInterval(callback, time = 1000) {
    this.endTime = Date.now() + time;
    this.timer;

    const run = () => {
        if (!this.timer) {
            return;
        }

        if (this.endTime <= Date.now()) {
            callback();
            this.endTime += time;
        }

        this.timer = requestAnimationFrame(run);
    };
    this.timer = requestAnimationFrame(run);

    return function clear() {
        cancelAnimationFrame(this.timer);
    };
}

const clear = myInterval(() => {
    console.log('hello');
}, 2000);

setTimeout(() => {
    console.log('clear');
    clear();
}, 20000);