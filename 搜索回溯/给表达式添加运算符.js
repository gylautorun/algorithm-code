// 给定一个仅包含数字 0-9 的字符串 num 和一个目标值整数 target ，
// 在 num 的数字之间添加 二元 运算符（不是一元）+、- 或 * ，返回 所有 能够得到 target 的表达式。
// 注意，返回表达式中的操作数 不应该 包含前导零。


// 输入: num = "123", target = 6
// 输出: ["1+2+3", "1*2*3"] 
// 解释: “1*2*3” 和 “1+2+3” 的值都是6。

// 输入: num = "232", target = 8
// 输出: ["2*3+2", "2+3*2"]
// 解释: “2*3+2” 和 “2+3*2” 的值都是8。

// 输入: num = "3456237490", target = 9191
// 输出: []
// 解释: 表达式 “3456237490” 无法得到 9191 。

// 1 <= num.length <= 10
// num 仅含数字
// -231 <= target <= 231 - 1

const addOperators = function(nums, target) {
    const result = [];
    const path = [];
    run(nums, 0, 0, 0);
    return result;

    function run(arr, index, res, prev) {
        if (index === arr.length) {
            if (res === target) {
                result.push(path.join(''));
            }
            return;
        }

        for (let i = index; i < arr.length; i++) {
            const str = arr.slice(index, i + 1);
            // 0开头
            if (str[0] === '0') {
                return;
            }
            const num = str - 0;
            if (path.length > 0) {
                path.push('+' + num);
                run(arr, i + 1, res + num, num);
                path.pop();

                path.push('-' + num);
                run(arr, i + 1, res - num, -num);
                path.pop();

                path.push('*' + num);
                // 1+2+3*4
                // res: 6  num: 4  prev: 3
                // res => 6 - 3 + 3 * 4
                // prev => 3 * 4
                const x = prev * num;
                run(arr, i + 1, res - prev + x, num * prev);
                path.pop();
            }
            else {
                path.push(num);
                run(arr, i + 1, res + num, num);
                path.pop();
            }
        }
    }
};

console.log(addOperators('123456789', 100));