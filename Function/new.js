/**
 *
 * 构造函数，new时发生了什么？
 *  1. 创建一个新的对象 obj;
 *  2. 将这个空对象的proto成员指向了Base函数对象prototype成员对象
 *  3. Base函数对象的this指针替换成obj, 相当于执行了Base.call(obj);
 *  4. 如果构造函数显示的返回一个对象，那么则这个实例为这个返回的对象。 否则返回这个新创建的对象
 * @param Base
 * @param args
 * @private
 */

function _New(Base, ...args) {
    let obj = {}; // 新建对象
    let result = Base.call(obj, ...args); // 执行构造函数
    obj.__proto__ = Base.prototype; // 设置原型链

    // 判断: 原构造函数有Object类型的返回值
    let isObject = typeof result === 'object' && result !== null;
    let isFunction = typeof result === 'function';
    if (isObject || isFunction) {
        return result;
    }

    // 原构造函数没有Object类型的返回值, 返回新对象
    return obj;
}


