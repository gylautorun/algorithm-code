class EventEmitter {
    constructor() {
        this._events = Object.create(null);
    }

   // 监听event事件，触发时调用callback函数
    /**
     * this._events[event]
     * 为什么是数组, 每次定义一个事件 name, 对应的此事件应该为此事件名称下事件监听
     */
    on(event, callback) {
        let callbacks = this._events[event] || [];
        callbacks.push(callback);
        this._events[event] = callbacks;
        return this;
    }

    // 停止监听event事件
    off(event, callback) {
        let callbacks = this._events[event];
        this._events[event] = callbacks && callbacks.filter(fn => fn !== callback);
        return this;
    }

    // 触发事件，并把参数传给事件的处理函数
    emit(...args){
        const event = args[0];
        const params = [].slice.call(args, 1);
        const callbacks = this._events[event];
        callbacks.forEach(fn => fn.apply(this, params));
        return this;
    }

    // 为事件注册单次监听器
    once(event, callback) {
        let wrapFunc = (...args) => {
            callback.apply(this, args)
            this.off(event, wrapFunc)
        }

        this.on(event, wrapFunc);
        return this;
    }
}

// export default new EventEmitter();
module.exports = new EventEmitter();