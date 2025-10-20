// 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
// 如果反转后整数超过 32 位的有符号整数的范围 [−231,  231 − 1] ，就返回 0。
// 假设环境不允许存储 64 位整数（有符号或无符号）。

// 示例 1：
// 输入：x = 123
// 输出：321

// 示例 2：
// 输入：x = -123
// 输出：-321

// 示例 3：
// 输入：x = 120
// 输出：21

// 示例 4：
// 输入：x = 0
// 输出：0

// 提示：
// -231 <= x <= 231 - 1

/**
 * @param {number} x
 * @return {number}
 */
 function reverse(x) {
    let res = 0;
    while (x !== 0) {
        const digit = x % 10;
        // if (digit !== 0 && x < 0) {
        //     x = Math.floor(x / 10) + 1;
        // }
        // else {
        //     x = Math.floor(x / 10);
        // }
        // 或
        // x = parseInt(x / 10);
        // 或
        x = ~~(x / 10);
        res = res * 10 + digit;
        if (res < Math.pow(-2, 31) || res > Math.pow(2, 31) - 1) {
            return 0;
        }
    }
    return res;
};
function reverse(x) {
    const n = parseInt(Math.abs(x).toString().split('').reverse().join(''));
    if (n > Math.pow(2, 31) - 1 || n < Math.pow(-2, 31)) {
        return 0;
    }
    return x < 0 ? -n : n;
}