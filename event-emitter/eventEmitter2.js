class EventEmitter {
    // 存储所有事件的监听器
    es = Object.create(null);

    // 事件订阅
    on(eventName, cb, once = false) {
        if (!this.es[eventName]) {
            this.es[eventName] = [];
        }
        this.es[eventName].push({
            cb,
            once,
        });
    }

    // 仅订阅一次
    once(eventName, cb) {
        this.on(eventName, cb, true);
    }

    // 派发事件，通知订阅者
    emit(eventName, ...params) {
        const listeners = this.es[eventName] || [];
        let l = listeners.length;
        for (let i = 0; i < l; i++) {
            const {cb, once} = listeners[i];
            cb.apply(this, params);
            if (once) {
                listeners.splice(i, 1);
                i--;
                l--;
            }
        }
    }

    // 取消订阅
    off(eventName, cb) {
        // clean all
        if (eventName === undefined) {
            this.es = {};
        } else {
            if (cb === undefined) {
                delete this.es[eventName];
            } else {
                const listeners = this.es[eventName] || [];
                let l = listeners.length;
                for (let i = 0; i < l; i++) {
                    if (listeners[i].cb === cb) {
                        listeners.splice(i, 1);
                        i--;
                        l--;
                    }
                }
            }
        }
    }
}

const eventEmitter = new EventEmitter();

export default eventEmitter;

