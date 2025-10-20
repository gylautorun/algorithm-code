Function.prototype.myApply = function (context, arr) {
    // 如果 无 arr arr = arguments[1] 获取数组
    context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')'); // 处理返回值
    }

    delete context.fn;
    return result; // 返回返回值
};

// ES6
Function.prototype.newApply = function(context, parameter) {

    //  context = Object(context) || window;
    if (typeof context === 'object') {
        context = context || global || window
    } else {
        context = Object.create(null) // 完全空的对象, 无__proto__
    }

    let fn = Symbol()
    context[fn] = this;
    let result = context[fn](...parameter);
    delete context[fn];
    return result;
}


var numbers = [5, 6, 2, 3, 7];
var max = Math.max.newApply(null, numbers);
console.log(max)
var min = Math.min.myApply(null, numbers);
console.log(min);




Function.prototype.selfApply = function (context, arr) {
    context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0; i < arr.length; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')');
    }

    delete context.fn;
    return result;
};