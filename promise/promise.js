
class MyPromise {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';

    constructor(executor) {
        this.status = MyPromise.PENDING;
        this.value = undefined;
        this.error = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        const resolve = (value) => {
            if (this.status === MyPromise.PENDING) {
                this.status === MyPromise.FULFILLED;
                this.value = value;
                // resolve里面将所有成功的回调拿出来执行
                this.onFulfilledCallbacks.forEach(callback => callback(this.value));
            }
        };
        const reject = (error) => {
            if (this.status === MyPromise.PENDING) {
                this.status === MyPromise.REJECTED;
                this.error = error;
                // reject里面将所有失败的回调拿出来执行
                this.onRejectedCallbacks.forEach(callback => callback(this.error));
            }
        };
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
        // 当参数不是函数类型时，需要创建一个函数赋值给对应的参数
        // 这也就实现了 透传
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error}

        // 当状态是等待态的时候，需要将两个参数塞入到对应的回调数组中
        // 当状态改变之后，在执行回调函数中的函数
        if (this.status === MyPromise.PENDING) {
            this.onFulfilledCallbacks.push(onFulfilled);
            this.onRejectedCallbacks.push(onRejected);
        }

        // 状态是成功态，直接就调用 onFulfilled 函数
        if (this.status === MyPromise.FULFILLED) {
            onFulfilled(this.value);
        }
        // 状态是成功态，直接就调用 onRejected 函数
        if (this.status === MyPromise.REJECTED) {
            onRejected(this.error);
        }

        return this;
    }
}

const p = new MyPromise((resolve, reject) => {
    resolve(111);
}).then(value => {
    console.log(value)
});
console.log(p)