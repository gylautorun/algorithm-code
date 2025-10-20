/**
    求N个字符串的公共前缀
    方法思路
    要找到N个字符串的最长公共前缀，我们可以：
    1. 以第一个字符串作为初始公共前缀
    2. 依次与其他字符串比较，逐步缩短公共前缀
    3. 最终返回找到的最长公共前缀
 */

function longestCommonPrefix(strs) {
    if (strs.length === 0) return "";
    
    let prefix = strs[0];
    
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") return "";
        }
    }
    
    return prefix;
}

// 测试用例
console.log(longestCommonPrefix(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefix(["dog","racecar","car"])); // ""
console.log(longestCommonPrefix(["interspecies","interstellar","interstate"])); // "inters"
console.log(longestCommonPrefix(["apple"])); // "apple"
console.log(longestCommonPrefix([])); // ""
console.log('===========');


/**
 * 优化版本（垂直扫描）
 * @param {*} strs 
 * @returns 
 */
function longestCommonPrefixOptimized(strs) {
    if (strs.length === 0) return "";
    
    for (let i = 0; i < strs[0].length; i++) {
        const char = strs[0][i];
        for (let j = 1; j < strs.length; j++) {
            if (i === strs[j].length || strs[j][i] !== char) {
                return strs[0].substring(0, i);
            }
        }
    }
    
    return strs[0];
}
// 测试用例
console.log(longestCommonPrefixOptimized(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefixOptimized(["dog","racecar","car"])); // ""
console.log(longestCommonPrefixOptimized(["interspecies","interstellar","interstate"])); // "inters"
console.log(longestCommonPrefixOptimized(["apple"])); // "apple"
console.log(longestCommonPrefixOptimized([])); // ""
console.log('===========');

/**
 * 分治解法
 * @param {*} strs 
 * @returns 
 */
function longestCommonPrefixDivideConquer(strs) {
    if (strs.length === 0) return "";
    return divideConquer(strs, 0, strs.length - 1);
}
function divideConquer(strs, left, right) {
    if (left === right) {
        return strs[left];
    }
    
    const mid = Math.floor((left + right) / 2);
    const lcpLeft = divideConquer(strs, left, mid);
    const lcpRight = divideConquer(strs, mid + 1, right);
    
    return commonPrefix(lcpLeft, lcpRight);
}
function commonPrefix(left, right) {
    const minLen = Math.min(left.length, right.length);
    for (let i = 0; i < minLen; i++) {
        if (left[i] !== right[i]) {
            return left.substring(0, i);
        }
    }
    return left.substring(0, minLen);
}

// 测试用例
console.log(longestCommonPrefixDivideConquer(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefixDivideConquer(["dog","racecar","car"])); // ""
console.log(longestCommonPrefixDivideConquer(["interspecies","interstellar","interstate"])); // "inters"
console.log(longestCommonPrefixDivideConquer(["apple"])); // "apple"
console.log(longestCommonPrefixDivideConquer([])); // ""
console.log('===========');

/**
 * 二分查找解法
 * @param {*} strs 
 * @returns 
 */
function longestCommonPrefixBinarySearch(strs) {
    if (strs.length === 0) return "";
    
    let minLen = Infinity;
    for (const str of strs) {
        minLen = Math.min(minLen, str.length);
    }
    
    let low = 1;
    let high = minLen;
    
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (isCommonPrefix(strs, mid)) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    
    return strs[0].substring(0, (low + high) / 2);
}

function isCommonPrefix(strs, len) {
    const prefix = strs[0].substring(0, len);
    for (let i = 1; i < strs.length; i++) {
        if (!strs[i].startsWith(prefix)) {
            return false;
        }
    }
    return true;
}

// 测试用例
console.log(longestCommonPrefixBinarySearch(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefixBinarySearch(["dog","racecar","car"])); // ""
console.log(longestCommonPrefixBinarySearch(["interspecies","interstellar","interstate"])); // "inters"
console.log(longestCommonPrefixBinarySearch(["apple"])); // "apple"
console.log(longestCommonPrefixBinarySearch([])); // ""
console.log('===========');

