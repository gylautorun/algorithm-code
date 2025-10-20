// 给定一个仅包含数字 0-9 的字符串 num 和一个目标值整数 target ，
// 在 num 的数字之间添加 二元 运算符（不是一元）+、-，返回 所有 能够得到 target 的表达式。
// 注意，返回表达式中的操作数 不应该 包含前导零。


// 输入: num = "123", target = 6
// 输出: ["1+2+3"] 
// 解释: “1+2+3” 的值都是6。


// 1 <= num.length <= 10
// num 仅含数字
// -2^31 <= target <= 2^31 - 1

const findExpressions = function(digits, target) {
    const result = [];
    const n = digits.length;

    /**
     * 回溯算法函数
     *
     * @param {number} index - 当前处理的索引
     * @param {Array} path - 当前路径
     * @param {number} value - 当前值
     * @param {number} prev - 上一个处理的值 (用于乘法)
     */
    function backtrack(index, path, value, prev) {
        // 结束条件：如果已经处理完所有数字
        if (index === n) {
            // 如果当前值等于目标值，则将路径加入结果
            if (value === target) {
                result.push(path);
            }
            return;
        }

        for (let i = index; i < n; i++) {
            if (i !== index && digits[index] === '0') {
                break; // 跳过前导零
            }

            const str = digits.substring(index, i + 1);
            const num = parseInt(str, 10);
            if (index === 0) {
                // 第一个数字，直接作为操作数
                backtrack(i + 1, str, num, num);
            }
            else {
                // 添加加法
                backtrack(i + 1, path + '+' + str, value + num, num);
                // 添加减法
                backtrack(i + 1, path + '-' + str, value - num, -num);
                // 添加乘法 new_value = value - prev + prev * num
                // 1+2+3*4
                // value: 6  num: 4  prev: 3
                // value => 6 - 3 + 3 * 4
                // prev => 3 * 4
                backtrack(i + 1, path + '*' + str, value - prev + prev * num, prev * num);
            }
        }
    }

    backtrack(0, '', 0, 0);

    return result;
};
/**
回溯中的状态维护
在回溯过程中，维护以下变量：

path：当前已构建的表达式字符串（如 "1+2*3"）。
value：当前表达式的计算结果（如 1+2*3=7）。
prev：上一次操作的数值（如 2），用于处理乘法的优先级。
3. 乘法的特殊处理
假设当前表达式是 1+2，value=3，prev=2。现在要插入 *3：

直接乘法：prev * num = 2 * 3 = 6。
修正表达式值：
之前 value = 1 + 2 = 3 中，prev=2 是加法操作的一部分。
现在要将 +2 替换为 +2*3，因此需要：
先减去旧的 prev：value - prev = 3 - 2 = 1（回退到未加 2 的状态）。
再加回 prev * num：1 + (2 * 3) = 7。
最终表达式为 1+2*3=7，prev 更新为 6（即 2*3）。
公式：
new_value = value - prev + prev * num

4. 为什么不能直接 value * num？
乘法优先级高于加减法，不能直接对整个表达式做乘法。 例如：1+2*3 ≠ (1+2)*3（前者是 7，后者是 9）。
prev 记录了上一次操作的数值，通过修正 value 可以局部调整乘法的计算。
5. 具体例子
假设当前状态：

path = "1+2", value = 3, prev = 2（因为上一次操作是 +2）。
现在要插入 *3：
计算 prev * num = 2 * 3 = 6。
修正 value：
value - prev = 3 - 2 = 1（回退到 1）。
1 + (prev * num) = 1 + 6 = 7。
更新 prev = 6（新的乘法结果）。
新表达式 path + "*3" = "1+2*3"，值为 7。
6. 代码中的乘法处理
JavaScript
// 乘法操作
backtrack(i + 1, path + '*' + numStr, value - prev + prev * num, prev * num);
value - prev：撤销上一次操作的影响。
+ prev * num：应用乘法后的新值。
prev * num：更新 prev 为乘法结果（用于后续可能的连续乘法）。
7. 对比加减法
加法：直接 value + num，prev = num。
减法：直接 value - num，prev = -num。
乘法：需要修正 value 和 prev，因为乘法优先级更高。
 */

function consoleResult(solutions, target) {
    console.log(`所有能够得到目标结果为 ${target}一共有 ${solutions.length} 种解法:`);
    solutions.forEach(solution => {
        console.log(`${solution} = ${eval(solution)}`);
    });
}

// 测试用例
consoleResult(findExpressions('123456789', 100), 100);
consoleResult(findExpressions('123456789', 200), 200);
consoleResult(findExpressions('123456789', 1000), 1000);