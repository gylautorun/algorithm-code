
// proxy
function singleton(state) {
    let instance;
    return new Proxy(state, {
        construct(target, args) {
            if (instance) {
                return instance;
            }
            instance = Reflect.construct(target, args)
            // instance = new target(...args);
            return instance;
        }
    })
}
// @singleton
class State {
    count = 1;
    
    increase() {
        this.count++;
    }
}
const MySingleton = singleton(State);
const one = new MySingleton();
const two = new MySingleton();
console.log(one.count); // 1
one.increase();
console.log(one.count); // 2
console.log(two.count); // 2
console.log('proxy: ', two === one);


function User() {
    if (!(this instanceof User)) {
        return;
    }
    if (!User.instance) {
        User.instance = this;
    }
    return User.instance;
}
const u1 = new User()
const u2 = new User()
console.log('User: ', u1 === u2);

function User2() {}
User2.getInstance = function() {
    if(!User2.instance){
        User2.instance = new User2();
    }
    return User2.instance;
};
const u2Test1 = User2.getInstance()
const u2Test2 = User2.getInstance()
console.log('User2: ', u2Test1 === u2Test2);

function User3() {}
User3.getInstance = (function() {
    let instance;
    return function() {
        if(!instance) {
            instance = new User3();
        }
        return instance;
    }
})();
const u3Test1 = User3.getInstance()
const u3Test2 = User3.getInstance()
console.log('User3: ', u3Test1 === u3Test2);

const User4 = (function() {
    function user() {}
    return function() {
        if(!user.instance) {
            user.instance = new user();
        }
        return user.instance;
    }
})();
const u4Test1 = new User4()
const u4Test2 = new User4()
console.log('User4: ', u4Test1 === u4Test2);

// 在频繁使用到单例的情况下，推荐使用类似此方法的方案，当然内部实现可以采用上述任意一种
function SingleWrapper(fn) {
    // 排除非函数与箭头函数
    if (!(fn instanceof Function) || !fn.prototype) {
        throw new Error('不是合法的构造函数')
    }
    let instance;
    return function () {
        if (!instance) {
            instance = new fn();
        }
        return instance;
    }
}
function User5(){}
const SingleUser = SingleWrapper(User5)
const u5Test1 = new SingleUser()
const u5Test2 = new SingleUser()
console.log('User5: ', u5Test1 === u5Test2);


// 在构造函数中利用new.target判断是否使用new关键字
class User6 {
    constructor() {
        if (new.target !== User6) {
            return;
        }
        if (!User6.instance) {
            User6.instance = this;
        }
        return User6.instance;
    }
}
const u6Test1 = new User6()
const u6Test2 = new User6()
console.log('User6: ', u6Test1 === u6Test2);

class User7 {
    static getInstance() {
        if (!User7.instance) {
            User7.instance = new User7();
        }
        return User7.instance;
    }
}
const u7Test1 = User7.getInstance();
const u7Test2 = User7.getInstance();
console.log('User7: ', u7Test1 === u7Test2);


// 惰性单例模式: 在需要的时候才创建对象实例
const createModal = (function () {
    let modal = null;
    return function () {
        if (!modal) {
            modal = {
                visible: false,
            };
        }
        return modal;
    }
})();
const modalWrap = createModal();
console.log('start', modalWrap.visible); // false
Promise.resolve().then(() => {
    const modal = createModal();
    console.log('resolve', modalWrap === modal); // true true
    modal.visible = true;
}).finally(() => {
    const modal = createModal();
    console.log('end', modal.visible, modalWrap === modal); // true true
});

// 抽离
function getSingle(fn) {
	let result;
	return function(...args) {
        if (!result) {
            result = fn.apply(args);
        }
		return result;
	}
}
const createModal2 = function () {
    return {
        visible: false,
    };
}
const createSingleModal = getSingle(createModal2)
const modalWrap2 = createSingleModal();
console.log('start2', modalWrap2.visible); // false
Promise.resolve().then(() => {
    const modal = createSingleModal();
    console.log('resolve2', modalWrap2 === modal); // true true
    modal.visible = true;
}).finally(() => {
    const modal = createSingleModal();
    console.log('end2', modal.visible, modalWrap2 === modal); // true true
});