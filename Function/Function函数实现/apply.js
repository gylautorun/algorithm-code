Function.prototype.selfApply = function (target) {

    target = target || global;// window;

    // 对象调用指向 this
    target.fn = this;

    let args = []; // 参数收集

    for (let i = 0, len = arguments[1].length; i < len; i++) {
        args.push('arguments[1][' + i + ']');
    }

    // 利用eval展开参数 并执行函数
    let result = eval('target.fn(' + args + ')');

    // 删除附加对象属性 fn
    delete target.fn;

    return result;
}

let a = {
    name: 'hyh'
}
let name = 'hyhaa'

function exp(a, b, c) {
    console.log(this.name + a + b + c)
}

exp.apply(null, [' happy ', ' every', ' day']) //undefined happy  every day
exp.apply(a, [' happy ', ' every', ' day']) //hyh happy  every day

exp.selfApply(null, [' happy ', ' every', ' day']) //undefined happy  every day
exp.selfApply(a, [' happy ', ' every', ' day']) //hyh happy  every day