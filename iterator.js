// 生成器
function* iteratorFn(str) {
    let s = '';
    const list = ['.', '-'];

    for (let i = 0; i < str.length; i++) {
        if (list.includes(str[i])) {
            yield s;
            s = '';
        }
        else {
            s += str[i];
        }
    }
    if (s) {
        yield s;
    }
}

const iterator = iteratorFn('12.23.445-beta.9.4');
let n = iterator.next();
n = iterator.next()
n = iterator.next()
n = iterator.next()
n = iterator.next()
n = iterator.next()
n = iterator.next()
console.log(n);


Object.prototype[Symbol.iterator] = function () {
    return Object.values(this)[Symbol.iterator]();
}
// 使下面成立
const [a, b] = {a: 1, b: 2};

console.log(a, b);