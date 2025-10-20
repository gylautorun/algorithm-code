
/**
 * 判断两个数据是否相等
 * @param {*} x 
 * @param {*} y 
 */
function isChange(x, y) {
    if (x === y) { // +0 & -0
        return y === 0 && 1 / x !== 1 / y;
    }
    else { // NaN !== NaN NaN 和其他
        return x === x || y === y;
    }
}
console.log(isChange(Number('a'), Number('b')));