class EventTarget {
    constructor() {
        this.listeners = {}; // 储存事件的对象
    }

    on(type, callback) {
        if (!this.listeners[type]) this.listeners[type] = []; // 如果是第一次监听该事件，则初始化数组
        this.listeners[type].push(callback);
    }

    once(type, callback) {
        if (!this.listeners[type]) this.listeners[type] = [];
        callback._once = true; // once 只触发一次，触发后 off 即可
        this.listeners[type].push(callback);
    }

    off(type, callback) {
        const listeners = this.listeners[type];
        if (Array.isArray(listeners)) {
            // filter 返回新的数组，会每次对 this.listeners[type] 分配新的空间
            // this.listeners[type] = listeners.filter(l => l !== callback);
            const index = listeners.indexOf(callback); // 根据 type 取消对应的回调
            this.listeners[type].splice(index, 1); // 用 splice 要好些，直接操作原数组

            if (this.listeners[type].length === 0) delete this.listeners[type]; // 如果回调为空，删除对该事件的监听
        }
    }

    trigger(event) {
        const { type } = event; // type 为必传属性
        if (!type) throw new Error('没有要触发的事件！');

        const listeners = this.listeners[type]; // 判断是否之前对该事件进行监听了
        if (!listeners) throw new Error(`没有对象监听 ${type} 事件！`);

        if (!event.target) event.target = this;

        listeners.forEach(l => {
            l(event);
            if (l._once) this.off(type, l); // 如果通过 once 监听，执行一次后取消
        });
    }
}

// 测试
function handleMessage(event) { console.log(`message received: ${ event.message }`); }

function handleMessage2(event) { console.log(`message2 received: ${ event.message }`); }

const target = new EventTarget();

target.on('message', handleMessage);
target.on('message', handleMessage2);
target.trigger({ type: 'message', message: 'hello custom event' }); // 打印 message，message2

target.off('message', handleMessage);
target.trigger({ type: 'message', message: 'off the event' }); // 只打印 message2

target.once('words', handleMessage);
target.trigger({ type: 'words', message: 'hello2 once event' }); // 打印 words
target.trigger({ type: 'words', message: 'hello2 once event' }); // 报错：没有对象监听 words 事件！