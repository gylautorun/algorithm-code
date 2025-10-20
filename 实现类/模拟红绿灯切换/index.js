
function delay(duration = 1000) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}
class Signal {
    SIGNAL_SERIALS = ['RED', 'YELLOW', 'GREEN'];

    // 当前信号灯索引
    get currentSigIndex() {
        return this.SIGNAL_SERIALS.indexOf(this.sig);
    }
    // 下一个信号灯
    get next() {
        const len = this.SIGNAL_SERIALS.length;
        const nextIndex = (this.currentSigIndex + 1) % len;
        return this.SIGNAL_SERIALS[nextIndex];
    }
    // 剩余时间
    get remain() {
        let diff = this.end - Date.now();
        if (diff < 0) {
            diff = 0;
        }
        return diff / 1000;
    }
    
    constructor(props) {
        this._events = Object.create(null);
        // 切换时间
        this.times = props.times;
        // 当前信号
        this.sig = props.defaultSignal;
        // 初始设置时间
        this.setTime();
        this.exchange();
    }
    on(event, callback) {
        const callbacks = this._events[event] || [];
        callbacks.push(callback);
        this._events[event] = callbacks;
        return this;
    }
    off(event, callback) {
        const callbacks = this._events[event];
        this._events[event] = callbacks && callbacks.filter(fn => fn !== callback);
        return this;
    }
    emit(event) {
        const callbacks = this._events[event];
        callbacks && callbacks.forEach(fn => fn.apply(this, [this]));
        return this;
    }

    // 切换信号灯
    async exchange() {
        await 1; // 后面代码放微队列里面, 
        // 是否要切换
        if (this.remain > 0) {
            // 不需要切换
            // 等待1s
            this.emit('tick');
            await delay(1000);
        }
        else {
            // 切换信号灯
            this.sig = this.next;
            this.setTime();
            this.emit('change');
        }
        this.exchange();
    }

    // 记录每个灯开始 和 结束时间
    setTime() {
        this.start = Date.now();
        this.end = this.start + this.times[this.currentSigIndex] * 1000;
    }
}

const signal = new Signal({
    times: [5, 3, 6],
    defaultSignal: 'RED'
});
// // 信号灯变化
signal.on('change', (e) => {
    /**
     * sig: 当前信号
     * next: 下一个信号
     * remain: 信号灯剩余时间
     */
    const {sig, next, remain} = e;
    console.log('change', {sig, next, remain});
});
const handle = (e) => {
    /**
     * sig: 当前信号
     * next: 下一个信号
     * remain: 信号灯剩余时间
     */
    const {sig, next, remain} = e;
    console.log('tick', {sig, next, remain});
};
// // 通知我当前信号灯信息
signal.on('tick', handle);
// // 关闭通知
// signal.off('tick', handle);