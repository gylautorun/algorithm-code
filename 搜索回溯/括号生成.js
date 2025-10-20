// 数字 n 代表⽣成括号的对数，请你设计⼀个函数，⽤于能够⽣成所有可能的并且 有效的 括号组合。
// 示例：
// 输⼊：n = 3
// 输出：[
//     "((()))",
//     "(()())",
//     "(())()",
//     "()(())",
//     "()()()"
// ]

function generateParenthesis(n) {
    const res = [];

    const run = (l, r, s) => {
        if (l > n || r > n) {
            return;
        }
        if (l === r && l === n) {
            res.push(s);
            return;
        }
        // 剪枝
        if (l < r) {
            return;
        }
        // 加左括号
        run(l + 1, r, s + '(');
        // 加右括号
        run(l, r + 1, s + ')');
    };
    run(0, 0, '');
    return res;
}
console.log(generateParenthesis(3));