// 给你一个字符串 s，找到 s 中最长的回文子串

// 示例 1：
// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案

// 示例 2：
// 输入：s = "cbbd"
// 输出："bb"

// 示例 3：
// 输入：s = "a"
// 输出："a"

// 示例 4：
// 输入：s = "ac"
// 输出："a"

// 提示：
// 1 <= s.length <= 1000
// s 仅由数字和英文字母（大写和/或小写）组成

/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
    function palindromes(str) {
        for(let i = 0; i < Math.floor(str.length / 2); i++) {
            if(str[i] !== str[str.length - 1 - i]) {
                return false;
            };
        }
        return true;
    }
    let max = 0;
    let res = '';
    for(let i = 0; i <= s.length; i++) {
        for(let j = i + 1; j <= s.length; j++) {
            const temp = s.substring(i, j);
            if (palindromes(temp) && temp.length > max) {
                max = temp.length;
                res = temp;
            }
        }
    }
    return res;
};

function longestPalindrome(s) {
    let res = '';
    const l = s.length;
    // const arr = new Array(l).fill(new Array(l).fill(0));
    const arr = Array.from(new Array(l),() => new Array(l).fill(0));
    for(let i = l - 1; i >= 0; i--) {
        for(let j = i; j < l; j++) {
            arr[i][j] = s[i] === s[j] && (j - i < 2 || arr[i + 1][j - 1])
            if (arr[i][j] && j - i + 1> res.length) {
                res = s.substring(i, j + 1);
            }
        }
    }
    return res;
};


function longestPalindrome(s) {
    if (!s || s.length === 0) return '';
    s = s.split('').join('#'); // 回文转奇数
    let result = '';

    const palind = (l, i, j) => {
        while (i >= 0 && j < l.length && l[i] === l[j]) {
            i -= 2;
            j += 2;
        }
        return l.slice(i + 2, j);
    };
    for (let i = 0; i < s.length; i += 2) {
        let temp = palind(s, i, i)
        if (temp.length > result.length) {
            result = temp;  
        }
    }
    return result.split('#').join('');
}

console.log(longestPalindrome('babad'));
