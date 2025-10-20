// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母

// 输入：digits = "23"
// 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]

// 输入：digits = ""
// 输出：[]

// 输入：digits = "2"
// 输出：["a","b","c"]

const digitMap = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
};
const letterCombinations = function(digits) {
    if (!digits.length) {
        return [];
    }
    const res = [];
    const dfs = (str, i) => {
        if (i === digits.length) {
            res.push(str);
            return;
        }
        const values = digitMap[digits[i]];
        for (const v of values) {
            dfs(str + v, i + 1);
        }
    };
    dfs('', 0);
    return res;
};

const letterCombinations2 = function(digits) {
    if (!digits.length) {
        return [];
    }
    const queue = [];
    queue.push('');

    for (let i = 0; i < digits.length; i++) {
        for (let j = 0; j < queue.length; j++) {
            const str = queue.shift();
            const values = digitMap[digits[i]];
            for (const v of values) {
                queue.push(str + v);
            }
        }
    }

    return queue;
};

console.log(letterCombinations2('23'));
console.log(letterCombinations2('2'));
console.log(letterCombinations2(''));