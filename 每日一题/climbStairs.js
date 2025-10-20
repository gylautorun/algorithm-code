// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
// 注意：给定 n 是一个正整数。


/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    // 性能问题
    // if (n <= 0) return 0;
    // if (n === 1) return 1;
    // if (n === 2) return 2;

    // return climbStairs(n - 1) + climbStairs(n - 2);

    // 斐波那契数列的公式
    const sqrt_5 = Math.sqrt(5);
    const fib_n = Math.pow((1 + sqrt_5) / 2, n + 1) - Math.pow((1 - sqrt_5) / 2, n + 1)
    // return Math.round(fib_n / sqrt_5);

    // 动态规划
    // 本问题其实常规解法可以分成多个子问题，爬第n阶楼梯的方法数量，等于 2 部分之和

    // 爬上 n-1 阶楼梯的方法数量。因为再爬1阶就能到第n阶
    // 爬上 n-2 阶楼梯的方法数量，因为再爬2阶就能到第n阶
    // 所以我们得到公式 dpList[n] = dpList[n-1] + dpList[n-2]
    // 同时需要初始化 dpList[1]=1 和 dpList[2]=2
    // 时间复杂度：O(n)
    let dpList = [];
    dpList[1] = 1;
    dpList[2] = 2;
    for (let i = 3; i <= n; i++) {
        dpList[i] = dpList[i - 1] + dpList[i - 2];
    }
    // return dpList[n];
    // 或
    let prev = 1;
    let cur = 1;
    for (let j = 2; j <= n; i++) {
        [prev, cur] = [cur, prev + cur]
    }
    return cur;


    if (n <= 0) return 0;
    if (n === 1) return 1;
    if (n === 2) return 2;

    return calc(n, 1, 2);

    // let stepsValue = {};
    // return calcSave(n, stepsValue);
};

function calc(count, firstNum, secondNum) {

    if (count <= 3) return firstNum + secondNum;

    return calc(count - 1, secondNum, firstNum + secondNum);
}

function calcSave(count, stepsValue) {

    if (count <= 2) return count;
    if (stepsValue[count]) return stepsValue[count];

    const result = calcSave(count - 1, stepsValue) + calcSave(count - 2, stepsValue);

    stepsValue[count] = result;

    return result;
}