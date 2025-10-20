// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合

// 示例 1：
// 输入：n = 3
// 输出：["((()))","(()())","(())()","()(())","()()()"]
// 示例 2：
// 输入：n = 1
// 输出：["()"]
// 提示：
// 1 <= n <= 8

// 每个括号中间添加括号
var generateParenthesis = function(n) {
    let set = new Set();
    set.add('()');
    const insert = '()';

    for (let i = 2; i <= n; i++) {
        const newSet = new Set();
        const preLen = 2 * (i - 1); // 在原有长度基础上 空格长度位置

        Array.from(set).forEach(item => {
            for (let j = 0; j <= preLen; j++) {
                const str = item.substr(0, j) + insert + item.substr(j);
                newSet.add(str);
            }
        })

        set = newSet;
    }

    return Array.from(set);
};

/**
 * 
 * "([)]"	false	交叉嵌套无效 
 * "{[]}"	true	正确嵌套 
 * "]()["	false	首字符为右括号
 */
function isValidBrackets(value) {
    // 空字符串是有效的
    if (!value) {
        return true;
    }
    // 长度为奇数，直接返回 false
    if (value.length % 2 !== 0) {
        return false;
    }
    // 如果第一个字符是右括号，直接返回 false
    if ([')', '}', ']'].includes(value[0])) {
        return false;
    }
    const stack = [];
    const map = {'(': ')', '[': ']', '{': '}'}; // 括号映射表
    
    for (let i = 0; i < value.length; i++) {
        const val = value[i];
        if (map[val]) {
            stack.push(val);
        }
        else {
            if (stack.length === 0) {
                // 栈空说明右括号无匹配
                return false;
            };
            const top = stack.pop();
            if (map[top] !== val) {
                // 栈顶元素和当前元素不匹配
                return false;
            }
        }
    }
    return stack.length === 0; // 栈空说明括号匹配
}