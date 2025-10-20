// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
// 你可以按 任何顺序 返回答案。

// 输入：n = 4, k = 2
// 输出：
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]

// 输入：n = 1, k = 1
// 输出：[[1]]

const combine = function(n, k) {
    const result = [];

    const dfs = (n, k, combine, i) => {
        if (combine.length === k) {
            result.push(combine);
            return;
        }
        // 剪枝
        // combine 长度加上区间 [i, n] 的长度小于 k，不可能构造出长度为 k 的 combine
        if (combine.length + (n - i + 1) < k) {
            return;
        }

        for (let j = i; j <= n; j++) {
            // j + 1 递归
            // j + 1 代表不能重复数字
            dfs(n, k, [...combine, j], j + 1);
        }
        // 或
        // // 考虑选择当前位置
        // dfs(n, k, [...combine, i], i + 1);
        // // 考虑不选择当前位置
        // dfs(n, k, combine, i + 1);
    };
    dfs(n, k, [], 1);
    return result;
};

const combine2 = function(n, k) {
    const result = [];

    const dfs = (combine, i) => {
        if (combine.length === k) {
            result.push(combine);
            return;
        }
        // 剪枝
        // combine 长度加上区间 [i, n] 的长度小于 k，不可能构造出长度为 k 的 combine
        if (combine.length + (n - i + 1) < k) {
            return;
        }

        for (let j = i; j <= n; j++) {
            // j + 1 递归
            dfs([...combine, j], j + 1);
        }
        // 或
        // // 考虑选择当前位置
        // dfs([...combine, i], i + 1);
        // // 考虑不选择当前位置
        // dfs(combine, i + 1);
    };
    dfs([], 1);
    return result;
};

console.log(combine(4, 2));