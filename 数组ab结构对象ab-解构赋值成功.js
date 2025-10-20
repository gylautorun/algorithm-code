
// Object.prototype[Symbol.iterator] = function() {
//     // 使用 Object.values(this) 方法获取对象的所有值，并返回这些值的迭代器对象
//     return Object.values(this)[Symbol.iterator]();
// }

Object.prototype[Symbol.iterator] = function* () {
    console.log(Object.values(this))
    for (let key in this) {
        yield this[key];
    }
}

const [a, b, c] = {a: 1, b: 2, z: 3};

console.log(a, b, c);