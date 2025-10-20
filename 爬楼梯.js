
function step(n) {
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }

    return step(n-1) + step(n-2);
}
console.log(step(10));

/**
 * 上面存在重复计算
 * 
 * 下面我们缓存已计算的结果, 当访问已存在结果时候直接返回
 */
const map = new Map();
function step2(n) {
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }

    if (map.get(n)) {
        return map.get(n);
    }
    const res = step2(n-1) + step2(n-2);
    map.set(n, res);
    return res;
}

console.log(step2(70));

/**
 * 循环, 1 -> n 累加
 * @param {*} n 
 * @returns 
 */
function step3(n) {
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }

    let res = 0;
    let pre = 2;
    let prePre = 1;
    for(let i = 3; i <= n; i++) {
        res = pre + prePre;
        prePre = pre;
        pre = res;
    }
    return res;
}
console.log(step3(70));


/**
 * 尾调用
 * @param {*} n 
 * @returns 
 */
function step4(n, n1, n2) {
    if (n === 1) {
        return n1;
    }
    return step4(n - 1, n2, n1 + n2);
}

console.log(step4(70, 1, 2));