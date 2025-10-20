// 不用call和apply方法模拟实现ES5的bind方法
Function.prototype.newApply = function (context) {
    context = Object(context) || window
    var args = arguments[1] //获取传入的数组参数
    // var fn = Symbol(context);
    // context[fn] = this //假想context对象预先不存在名为fn的属性
    context.fn = this;
    var result;
    if (!args) { //没有传入参数直接执行
        // return context[fn]()
        return context.fn()
    }
    else {
        var argArr = [];
        for (var i = 0, len = args.length; i < len; i++) {
            argArr.push('args[' + i + ']');
        }
        // result = eval('context[fn](' + argArr + ')'); // 处理返回值
        result = eval('context.fn(' + argArr + ')'); // 处理返回值
    }

    // delete context[fn];
    delete context.fn; // context[fn] //执行完毕之后删除这个属性
    return result;
};

var obj = {
    name: 'jawil'
}
function sayHello(age) {
    return {
        name: this.name,
        age: age
    }
}
console.log(sayHello.newApply(obj, [24]));// 完美输出{name: "jawil", age: 24}

// Function.prototype.newCall = function (context) {
//     context = Object(context) ||window;
//     context.fn = this;
//     var args = [];
//     for(var i=1; i< arguments.length; i++) {
//         args.push('arguments[' + i + ']');
//     }
//     // args => [arguments[1], arguments[2], arguments[3], ...]
//     eval('context.fn(' + args + ')');
//     delete context.fn;
// };

Function.prototype.newCall = function (context) {
    return this.newApply(([].shift.newApply(arguments)), arguments)
    //巧妙地运用上面已经实现的newApply函数
};

var person = {
    name: "jayChou"
};

function say(age, sex) {
    console.log('name:' + this.name + ', age:' + age + ', sex:' + sex);
}

say.newCall(person, 18, '男');  // name: jayChou,age: 18, sex: 男


//简单模拟bind函数
Function.prototype.newBind =
    // Function.prototype.bind ||
    function (context) {
        var target = this;
        var args = Array.prototype.slice.newCall(arguments, 1);
        var F = function () {};
        var bound = function () {
            var innerArgs = Array.prototype.slice.newCall(arguments);
            return target.newApply(this instanceof F ? this : context || this, args.concat(innerArgs));
        };
        if (this.prototype) {
            F.prototype = this.prototype;
        }
        bound.prototype = new F();
        return bound;
    }

function foo(name) {
    this.name = name;
}
var obj = {};
var bar = foo.newBind(obj);
bar('Jack');
console.log(obj.name);  // Jack
var alice = new bar('Alice');
console.log(obj.name);  // Jack
console.log(alice.name);    // Alice

// https://blog.csdn.net/u010377383/article/details/80646415