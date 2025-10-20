
// 发布者
class Subject {
    constructor() {
        this.observers = [];
    }

    // 添加观察者
    subscribe(observer) {
        this.observers.push(observer);
    }

    // 移除观察者
    unsubscribe(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    // 通知所有观察者
    notify() {
        this.observers.forEach(observer => {
            observer.update(this);
        });
    }
}

// 观察者
class Observer {
    constructor() {
        console.log('Observer created');
    }

    // 更新方法
    update(...data) {
        console.log('Observer updated', data);
    }
}

// 使用示例
// 楼长通知 宿舍长们关灯
class DormitoryMaster extends Subject {
    constructor(name) {
        super();
        this.status = 'open';
        this.name = name;
        // 宿舍长们登记 list
        this.observers = [];
    }

    // 获取状态
    getState() {
        return this.status;
    }

    // 设置状态
    setState(status) {
        console.log(`${this.name}通知要${status === 'close' ? '关' : '开'}灯了`);
        this.status = status;
        this.notify();
    }
}

// 宿舍长
class DormManager extends Observer {
    constructor(name) {
        super();
        this.name = name;
    }

    // 重写一个具体的 update 方法
	update(publisher) {
		// 获取楼盘的状态
		const status = publisher.getState();
		this.handle(status);
	}

    // 楼长通知 宿舍长们关灯
    handle(data) {
		console.info(`${this.name} ${data === 'close' ? '已关灯' : '已开灯'}`)
    }
}

const test1 = new DormManager('熊大')
const test2 = new DormManager('熊二')
const test3 = new DormManager('光头强')

// 创建发布者: 楼长
const dormitory = new DormitoryMaster('楼长')

// 开始添加购房者的号码
dormitory.subscribe(test1)
dormitory.subscribe(test2)
dormitory.subscribe(test3)

// 要关灯了
dormitory.setState('close');
