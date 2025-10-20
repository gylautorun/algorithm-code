// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

// 示例 1：
// 输入：digits = "23"
// 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]

// 示例 2：
// 输入：digits = ""
// 输出：[]

// 示例 3：
// 输入：digits = "2"
// 输出：["a","b","c"]

// 提示：
// 0 <= digits.length <= 4
// digits[i] 是范围 ['2', '9'] 的一个数字。

/**
 * @param {string} digits
 * @return {string[]}
 */

const base = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
};
// 回溯递归
var letterCombinations = function(digits) {
    if (!digits) {
        return [];
    }
    const res = [];
    const recursion = (str, n) => {
        if (n > digits.length - 1) {
            res.push(str);
            return;
        }
        const values = base[digits[n]];
        
        for (const v of values) {
            recursion(str + v, n + 1);
        }
    }
    recursion('', 0);
    return res;
};

// BFS 解法: 队列
var letterCombinations = function(digits) {
    if (!digits) {
        return [];
    }
    const queue = [];
    queue.push('');
    for (let i = 0; i < digits.length; i++) { // bfs的层数，即digits的长度
        const size = queue.length;         // 当前层的节点个数
        for (let j = 0; j < size; j++) {   // 逐个让当前层的节点出列
            const str = queue.shift();         // 出列
            const values = base[digits[i]];   
            for (const v of values) {
                queue.push(str + v); // 生成新的字母串入列
            }
        }
    }
    
    return queue;
};