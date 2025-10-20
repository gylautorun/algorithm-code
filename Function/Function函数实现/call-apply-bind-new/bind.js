let value = 2;
let foo = {
    value: 1
};
function bar(name, age) {
    return {
        value: this.value,
        name: name,
        age: age
    }
}

console.log(bar.call(foo, "Jack", 20));
// {value: 1, name: "Jack", age: 20}

let bindFoo1 = bar.bind(foo, "Jack", 20);
console.log(bindFoo1());
// {value: 1, name: "Jack", age: 20}

let bindFoo2 = bar.bind(foo, "Jack");
console.log(bindFoo2(20));
// {value: 1, name: "Jack", age: 20}

function bar1(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}
bar1.prototype.friend = 'kevin';

let bindFoo3 = bar1.bind(foo, 'Jack');
console.log(bindFoo3());
// 1
// Jack
// undefined

let obj = new bindFoo3(20);
console.log(obj);
// undefined
// Jack
// 20

console.log(obj.habit);
// shopping

console.log(obj.friend);
// kevin


/**
 * bind() 方法创建一个新的函数
 * 在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数
 * 而其余参数将作为新函数的参数，供调用时使用
 * bind 有如下特性：
 * 1、指定 this
 * 2、传入参数
 * 3、返回一个函数
 * 4、柯里化
 * 5、一个绑定函数也能使用 new 操作符创建对象：这种行为就像把原函数当成构造器，提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
 * @param context
 * @private
 */
Function.prototype._bind = function (context) {
    if (typeof this !== 'function') {
        throw new Error('bind is not callable');
    }

    // this 指向调用者
    const self = this;
    // 截取参数: 因为第1个参数是指定的this,所以只截取第1个之后的参数
    const args = Array.prototype.slice.call(arguments, 1);

    // 创建一个空函数
    const EmptyFn = function () {};

    const fn = function () {
        // 获取 bind 返回函数的参数
        const bindArgs = Array.prototype.slice.call(arguments);

        // 然后同传入参数合并成一个参数数组，并作为 self.apply() 的第二个参数
        return self.apply(this instanceof EmptyFn ? this : context, args.concat(bindArgs))
    };

    // 原型指向: 绑定函数指向空函数
    EmptyFn.prototype = this.prototype;
    // 空函数的实例赋值给 bind 函数
    fn.prototype = new EmptyFn();
    return fn;
};

// 注释1 ：
// 当作为构造函数时，this 指向实例，此时 this instanceof fBound 结果为 true ，可以让实例获得来自绑定函数的值，即上例中实例会具有 habit 属性。
// 当作为普通函数时，this 指向 window ，此时结果为 false ，将绑定函数的 this 指向 context
// 注释2 ：
// 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值，即上例中 obj 可以获取到 bar 原型上的 friend
// 至于为什么使用一个空对象 fNOP 作为中介，把 fBound.prototype 赋值为空对象的实例（原型式继承），这是因为直接 fBound.prototype = this.prototype 有一个缺点，修改 fBound.prototype 的时候，也会直接修改 this.prototype ；其实也可以直接使用ES5的 Object.create() 方法生成一个新对象，但 bind 和 Object.create() 都是ES5方法，部分IE浏览器（IE < 9）并不支