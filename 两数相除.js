// 给你两个整数，被除数 dividend 和除数 divisor。将两数相除，要求 不使用 乘法、除法和取余运算。
// 整数除法应该向零截断，也就是截去（truncate）其小数部分。例如，8.345 将被截断为 8 ，-2.7335 将被截断至 -2 。
// 返回被除数 dividend 除以除数 divisor 得到的 商 。
// 注意：假设我们的环境只能存储 32 位 有符号整数，其数值范围是 [−231,  231 − 1] 。
// 本题中，如果商 严格大于 2^31 − 1 ，则返回 2^31 − 1 ；如果商 严格小于 -2^31 ，则返回 -2^31 。


// 输入: dividend = 10, divisor = 3
// 输出: 3
// 解释: 10/3 = 3.33333.. ，向零截断后得到 3 。

// 输入: dividend = 7, divisor = -3
// 输出: -2
// 解释: 7/-3 = -2.33333.. ，向零截断后得到 -2 。

// -2^31 <= dividend, divisor <= 2^31 - 1
// divisor != 0

const divide = function(dividend, divisor) {
    if (divisor === 0) {
        return Infinity;
    }
    if (dividend === 0) {
        return 0;
    }
    if (divisor === 1) {
        return dividend;
    }

    let _dividend = Math.abs(dividend);
    let _divisor = Math.abs(divisor);
    const symbol = (dividend > 0 && divisor > 0) || (dividend < 0 && divisor < 0);
    let sum = 0;
    let result = 0;

    while (sum + _divisor <= _dividend) {
        let temp = _divisor;
        let count = 1;
        while (sum + temp + temp <= _dividend) {
            temp += temp;
            count += count;
        }

        sum += temp;
        result += count;
    }

    return symbol ? Math.min(result, Math.pow(2, 31) - 1) : Math.max(-result, Math.pow(-2, 31));

}
