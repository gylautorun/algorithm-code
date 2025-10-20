/**
 * 计算字符串a中子串b出现的次数 (找字符串子串出现的次数)
 * @param {*} a: 字符串
 * @param {*} b: 子串
 * @returns {number}
 */
function countOccurrences(a, b) {
    if (b.length === 0) return 0; // 空字符串不算
    
    let count = 0;
    let pos = a.indexOf(b);
    
    while (pos !== -1) {
        count++;
        pos = a.indexOf(b, pos + 1); // 从下一个位置继续查找
    }
    
    return count;
}

// 测试用例
console.log(countOccurrences("abababab", "aba")); // 输出3
console.log(countOccurrences("abababab", "ab")); // 4
console.log(countOccurrences("hello world", "l")); // 3
console.log(countOccurrences("aaaaa", "aa")); // 4 (重叠情况)
console.log(countOccurrences("abcde", "xyz")); // 0
console.log(countOccurrences("", "a")); // 0