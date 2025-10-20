// 给定正整数 k ，你需要找出可以被 k 整除的、仅包含数字 1 的最 小 正整数 n 的长度。
// 返回 n 的长度。如果不存在这样的 n ，就返回-1。
// 注意： n 可能不符合 64 位带符号整数。
//  

// 输入：k = 1
// 输出：1
// 解释：最小的答案是 n = 1，其长度为 1。

// 输入：k = 2
// 输出：-1
// 解释：不存在可被 2 整除的正整数 n 。

// 输入：k = 3
// 输出：3
// 解释：最小的答案是 n = 111，其长度为 3。


const smallestRepunitDivByK = function(k) {
    // 2 | 5 倍数
    if (k % 2 === 0 || k % 5 === 0) {
        return -1;
    }

    // 只要不是 2 | 5 倍数, 一定存在
    let count = 1;
    let res = 1 % k;
    while (res !== 0) {
        res = (res * 10 + 1) % k;
        count++;
    }
    return count;

    // or

    // let count = 1;
    // let res = 1 % k;
    // const set = new Set();
    // set.add(res);
    // while (res !== 0) {
    //     res = (res * 10 + 1) % k;
    //     if (set.has(res)) {
    //         return -1;
    //     }
    //     count++;
    // }
    // return count;
};
