Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
        /**
         * arguments对象第一个元素被截去, 剩下[2]
         */
        var obj = Array.prototype.shift.call(arguments);
        /**
         * 相当于 Array.prototype.push.call(obj, 2)
         */
        return self.apply(obj, arguments);
    }
};

var push = Array.prototype.push.uncurrying();
var obj = {
    length: 1,
    '0': 1
};
push(obj, 2);
console.log(obj); // {0: 1, 1: 2, length: 2}

// Two 方法
Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
        return Function.prototype.call.apply(self, arguments);
    }
}