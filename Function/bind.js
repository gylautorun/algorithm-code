// this 绑定有 4 种绑定规则：
//       默认绑定
//       隐式绑定
//       显式绑定
//       new 绑定
// 四种绑定规则的优先级从上到下，依次递增，默认绑定优先级最低，new 绑定最高
// 显式绑定就是运用 apply(...) 和 call(...) 方法，在调用函数时，绑定 this，也即是可以指定调用函数中的 this 值

/**
 * bind 函数有哪些功能：
 *      - 改变原函数的 this 指向，即绑定 this
 *      - 返回原函数的拷贝
 *      - 注意，还有一点，当 new 调用绑定函数的时候，thisArg 参数无效。也就是 new 操作符修改 this 指向的优先级更高
 * @param that
 * @return {*}
 */

Function.prototype.myBind = Function.prototype.bind || function (that) {
    if (typeof this !== 'function') {
        return;
    }

    /**
     * Array.prototype.slice.call()能把类数组对象转化成数组
     *
     *
     * Arguments [arr[0], arr[1], ..., arr[arr.length - 1], callee: ƒ, Symbol(Symbol.iterator): ƒ]
     * Array.prototype.slice.call(arguments, 1): 从索引1开始截取 Array.prototype.slice.call()能把类数组对象转化成数组
     *       截取Arguments 返回数组 [arr[1], ..., arr[arr.length - 1]]
     * Array.prototype.slice.call(arguments) 返回数组
     *
     * arguments是类数组对象，并没有slice这个方法, 不能写arguments.slice(1), 要使用Array.prototype.slice.call(arguments, 1)
     */

    var target = this;
    var bindArgs = Array.prototype.slice.call(arguments, 1); // arguments:[that, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    return function () {
        // arguments 为此函数的 [callee: ƒ, Symbol(Symbol.iterator): ƒ]
        var callArgs = Array.prototype.slice.call(arguments); // []
        return target.apply(that, bindArgs.concat(callArgs))
    }

    // 函数调用中的 this 永远执行指定的对象，而不能根据如果是 new 调用而绑定到 new 创建的对象
};

function foo(name) {
    this.name = name;
}

var obj = {};
var bar = foo.myBind(obj);
bar('Jack');
console.log(obj.name); // Jack 符合预期

// 使用 new new调用绑定函数，并不会更改 this 的指向
var alice = new bar('Alice');
console.log(obj.name);      // Alice
console.log(alice.name);    // undefined


/**
 * new 操作符在调用构造函数的时候，会进行一个什么样的过程：
 *       创建一个全新的对象
 *       这个对象被执行 [[Prototype]] 连接
 *       将这个对象绑定到构造函数中的 this
 *       如果函数没有返回其他对象，则 new 操作符调用的函数则会返回这个对象
 * 修改后:
 */

Function.prototype.myBestBind = function (that) {
    if (typeof this !== 'function') {
        return;
    }
    const self = this; // 构造函数
    const args = Array.prototype.slice.call(arguments, 1);
    // 空函数
    const Empty = function() {};
    const bound = function () {
        const callArgs = Array.prototype.slice.call(arguments);
        return self.apply(
            // 检测是否是 new 创建
            // new 创建: this 为 new 出来实例
            // 非 new, this 指向 bind(that) that
            (this instanceof self ? this : that),
            args.concat(callArgs)
        );
    };
    // 思考下为什么要链接原型？提示：如果不连接，上面的检测是否会成功
    if (this.prototype) {
        Empty.prototype = this.prototype;
        // bound.prototype = this.prototype; 
        // Empty.prototype = this.prototype 解决bound.prototype 原型修改原函数的原型也会影响
    }
    bound.prototype = new Empty();
    // 上述可以 bound.prototype = Object.create(this.prototype)

    return bound;
};

// 测试
function foo(name) {
    this.name = name;
}
var obj = {};
var bar = foo.myBestBind(obj);
bar('Jack');
console.log(obj.name);  // Jack
var alice = new bar('Alice');
console.log(obj.name);  // Jack
console.log(alice.name);    // Alice

// 1. 首先，变量 bar 是绑定之后的函数，也就是 fBound。self 是原函数 foo 的引用。

// 2. 对于 bound 函数中的 this 的指向，如果是 bar('Jack') 这样直接调用，this 指向全局变量或者 undefined (视是否在严格模式下)
//    但是如果是 new bar('Alice') ，根据上面给出的 new 执行过程，我们知道，bound 函数中的 this 会指向 new 表达式返回的对象，即 alice。

// 3. 捋清楚变量之后，我们接着分析。我们首先忽略掉原型连接，也即忽略 bound.prototype = this.prototype 这行代码。

// 4. 如果是直接调用 bar('Jack')，this instanceof self ? this : that 这句判断，根据上述变量分析，
//    所以此判断为 false，绑定函数的 this 指向 that，也即是指定的 this 对象。

// 5. 如果是 new 调用绑定函数，此时绑定函数中的 this 是由 new 调用绑定函数返回的实例对象，这个对象的构造函数是 bound，
//    当我们忽略掉原型连接那行代码时，其原型对象并不等于原函数 self 的原型，
//    所以 this instanceof self ? this : that 得到的值还是指定的对象，而不是 new 返回的对象。

// 6. 所以，知道为什么要在绑定的时候，绑定函数要与原函数进行原型连接了吧？
//    每次绑定的时候，将绑定函数 bound 的原型指向原函数的原型，如果 new 调用绑定函数，得到的实例的原型，也是原函数的原型。
//    这样在 new 执行过程中，执行绑定函数的时候对 this 的判断就可以判断出是否是 new 操作符调用
