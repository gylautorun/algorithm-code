
class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(key, callback) {
        const callbacks = this.events[key] || [];
        callbacks.push(callback);
        this.events[key] = callbacks;
        return this;
    }
    emit(key, ...args) {
        const callbacks = this.events[key] || [];
        callbacks.forEach(callback => callback(...args));
        return this;
    }
    off(key, callback) {
        const callbacks = this.events[key] || [];
        this.events[key] = callbacks.filter(cb => cb !== callback);
        return this;
    }
    offAll(key) {
        if (this.events[key]) {
            delete this.events[key];
        }
        return this;
    }
    once(key, callback) {
        // 包装一个函数, 这个函数执行后移除此函数
        const wrap = (...args) => {
            callback(args);
            this.off(key, wrap);
        };
        // 监听包装函数
        this.on(key, wrap)
        return this;
    }
    clearAll() {
        this.events = {};
        return this;
    }
}

// test
const emitter = new EventEmitter();
emitter
    .on('refresh', () => {
        console.log('调用刷新最新数据')
    })
    .emit('refresh')
    .on('refresh', (pageNum, pageSize) => {
        console.log(`参数为: {pageNo: ${pageNum}, pageSize: ${pageSize}}`)
    })
    .emit('refresh', 1, 10);

console.log(emitter);
emitter.offAll('refresh');
console.log(emitter);

const removedListener = function () {
    console.log('这是一个可以被移除的监听者')
};
emitter.on('testRemove', removedListener)
emitter.emit('testRemove');
emitter.off('testRemove', removedListener);
emitter.emit('testRemove');

emitter.once('onlyOne', () => {
    console.log('这是一个只会触发一次的监听者')
});
emitter.emit('onlyOne');
emitter.emit('onlyOne');


