
let currying = function (fn) {
    let args = [];

    return function () {
        if (arguments.length === 0) {
            // 空参数代表求值arguments.length为0
            return fn.apply(this, args)
        }
        else {
            [].push.apply(args, arguments)
            return arguments.callee
        }
    }
};

let cost = (function () {
    let money = 0
    return function () {
        // for (let i = 0, l = arguments.length; i < l; i++) {
        //     money += arguments[i]
        // }
        Array.from(arguments).forEach(v => money += v)
        return money
    }
})();

let consumption = currying(cost);
consumption(100)
consumption(200)
consumption(300)
consumption(400)
consumption(500)
console.log(consumption()) // 1500

