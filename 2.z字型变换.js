// 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
// 比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
// P   A   H   N
// A P L S I I G
// Y   I   R
// 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
// 请你实现这个将字符串进行指定行数变换的函数：
// string convert(string s, int numRows);

// 示例 1：
// 输入：s = "PAYPALISHIRING", numRows = 3
// 输出："PAHNAPLSIIGYIR"

// 示例 2：
// 输入：s = "PAYPALISHIRING", numRows = 4
// 输出："PINALSIGYAHRPI"
// 解释：
// P     I    N
// A   L S  I G
// Y A   H R
// P     I

// 示例 3：
// 输入：s = "A", numRows = 1
// 输出："A"

// 提示：
// 1 <= s.length <= 1000
// s 由英文字母（小写和大写）、',' 和 '.' 组成
// 1 <= numRows <= 1000

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
 function convert(s, numRows) {
    if (numRows === 1 || s.length <= numRows) {
        return s;
    }
    const maxInterval = 2 * (numRows - 1); // 最大间隔
    let res = '';
    let i = 0; // 当前运行行数
    while (i < numRows) {
        let j = i;
        // 前间隔 (最后一行前间隔为0)
        let pre = maxInterval - i * 2;
        // 后间隔 (第一行后间隔为0)
        let next = i * 2;
        res += s[j];
        while(j < s.length) {
            if (pre > 0) {
                j += pre;
                // j 在 s 范围内
                if (j < s.length) {
                    res += s[j];
                }
            }
            
            if (next > 0) {
                j += next;
                // j 在 s 范围内
                if (j < s.length) {
                    res += s[j];
                }
            }
        }
        i++;
    }
    return res;
};