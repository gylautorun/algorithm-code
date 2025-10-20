// 实现一个动物类，具备一下功能，吃饭和睡觉，需要满足：
// animal
//     .eat('apple')
//     .sleep(3000)
//     .eat('orange')
//     .sleep(4000)
//     .eat('banana')
// 打印顺序为：apple，3s后打印orange，4s后打印banana


class Animal {
    constructor() {
        this.queue = [{
            fn: () => this._promise(0),
            type: 'sleep',
        }];
        this.run();
    }
    _promise = (time) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(time);
                resolve();
            }, time);
        });
    };
    eat = (food) => {
        const fn = () => {
            console.log(food);
            this.run();
        }
        this.queue.push({
            fn,
            type: 'eat',
        });
        return this;
    };
    sleep = (time) => {
        this.queue.push({
            fn: () => this._promise(time),
            type: 'sleep',
        });
        return this;
    };

    run = () => {
        const item = this.queue.shift();
        if (item) {
            if (item.type === 'eat') {
                item.fn();
            }
            else if (item.type === 'sleep') {
                item.fn().then(() => {
                    this.run();
                });
            }
        }
    };
}

const animal = new Animal();
animal
    .eat('apple')
    .sleep(3000)
    .eat('orange')
    .sleep(4000)
    .eat('banana');

