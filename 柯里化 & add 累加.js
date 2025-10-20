// 柯里化
// 理解: 调用函数A运行后返回函数B，B处理A剩余参数并返回函数C，C处理B剩余参数并返回函数D，…，最后返回结果

// 累加

const curry_add = (a) => {
    let num = a || 0;
    const item = (b) => {
        num+= b
        item.num = num // 将 num 赋到函数上
        return item;
    };
    return item;
};

// 如何在执行结束后返回结果而中间步骤返回函数
// 自执行函数与隐式转换
const curry_add_2 = (a) => {
    let num = a || 0
    const item = (b) => {
        num+= b
        return item;
    };
    item.toString = () => {
        console.log('参数变化，自动触发')
        return num;
    };
    return item;
};

// Object.prototype.toString() 方法返回一个表示该对象的字符串，
// 当对象被表示为文本值时或者当以期望字符串的方式引用对象时，该方法被自动调用
// curry_add_2(1)(2) + 1 相当于 curry_add_2(1)(2).toString() + 1

// 如何实现 curry_add(1)(2, 3)(4)...
// 使用展开运算符
const curry_add_3 = (...a) => {
    let num = a.reduce((t, c) => t + c, 0)
    const item = (...b) => {
        num = num + b.reduce((t, c) => t + c, 0);
        return item;
    };
    item.toString = () => {
        return num;
    };
    return item;
};


