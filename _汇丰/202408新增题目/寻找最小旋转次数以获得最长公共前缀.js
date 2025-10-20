/**
    彼得有两个长度相同的字符串。第一个字符串是固定的，第二个字符串是可旋转的。左旋转时，移除第一个字符并将其添加到字符串末尾；
    右旋转时，移除最后一个字符并将其添加到字符串开头。彼得想知道这两个字符串的最长公共前缀。

    编写一个算法，帮助彼得找到找到最长公共前缀所需的最少旋转次数。如果没有公共前缀，则输出-1。

    输入
    输入的第一行包含一个字符串 firstString ，表示第一个字符串。
    第二行包含一个字符串 secondString ，表示第二个字符串。

    输出
    输出一个整数，表示找到最长公共前缀所需的最少旋转次数。如果没有公共前缀，则输出-1。

    约束条件
    0 < len，其中len是两个字符串的长度。

    注意
    输入的字符串是字母数字字符串。
    输入的字符串由大小写字母（即a - z和A - Z）和数字（即0 - 9）组成。
    字符串比较区分大小写，即abcd和ABCD不被视为相同。

    示例
    输入：
    a2abccc
    bddda2a
    输出：
    3

    解释：
    最长公共前缀是a2ab。
    获得最长公共前缀所需的最少旋转次数是3次（右旋转）。

    方法思路
    要找到使两个字符串具有最长公共前缀所需的最小旋转次数，我们可以：
    1. 生成所有可能的旋转字符串（左旋和右旋）
    2. 计算每个旋转字符串与固定字符串的最长公共前缀
    3. 记录产生最长公共前缀的最小旋转次数
    4. 如果没有公共前缀，返回-1
*/


function minRotationsForLCP(firstString, secondString) {
    const len = firstString.length;
    if (len !== secondString.length) return -1;
    
    let maxLen = -1;
    let minRotations = Infinity;
    let bestDirection = '';
    
    // 检查所有可能的左旋转
    for (let leftRotations = 0; leftRotations < len; leftRotations++) {
        const rotated = leftRotate(secondString, leftRotations);
        const lcpLen = getLCPLength(firstString, rotated);
        
        if (lcpLen > maxLen || (lcpLen === maxLen && leftRotations < minRotations)) {
            maxLen = lcpLen;
            minRotations = leftRotations;
            bestDirection = 'left';
        }
    }
    
    // 检查所有可能的右旋转
    for (let rightRotations = 1; rightRotations <= len; rightRotations++) {
        const rotated = rightRotate(secondString, rightRotations);
        const lcpLen = getLCPLength(firstString, rotated);
        
        if (lcpLen > maxLen || (lcpLen === maxLen && rightRotations < minRotations)) {
            maxLen = lcpLen;
            minRotations = rightRotations;
            bestDirection = 'right';
        }
    }
    
    return maxLen > 0 ? minRotations : -1;
}

// 左旋转字符串k次
function leftRotate(str, k) {
    k = k % str.length;
    return str.slice(k) + str.slice(0, k);
}

// 右旋转字符串k次
function rightRotate(str, k) {
    k = k % str.length;
    return str.slice(-k) + str.slice(0, -k);
}

// 计算两个字符串的最长公共前缀长度
function getLCPLength(str1, str2) {
    let len = 0;
    while (len < str1.length && len < str2.length && str1[len] === str2[len]) {
        len++;
    }
    return len;
}

// 测试用例
console.log(minRotationsForLCP("a2abccc", "bddda2a")); // 3 (右旋转3次得到"a2abddd"，LCP为"a2a")
console.log(minRotationsForLCP("abcd", "dabc")); // 1 (右旋转1次得到"dabc"，LCP为"d")
console.log(minRotationsForLCP("hello", "world")); // -1 (无公共前缀)
console.log(minRotationsForLCP("abc", "abc")); // 0 (无需旋转)
console.log(minRotationsForLCP("aabbcc", "ccaabb")); // 2 (左旋转2次得到"aabbcc"，LCP为"aabbcc")
console.log('======================');

function minRotationsForLCPOptimized(firstString, secondString) {
    const len = firstString.length;
    if (len !== secondString.length) return -1;
    
    let maxLen = -1;
    let minRotations = Infinity;
    
    // 检查所有可能的旋转（左旋和右旋合并处理）
    for (let rotations = 0; rotations < len; rotations++) {
        // 左旋转
        const leftRotated = leftRotate(secondString, rotations);
        const leftLCP = getLCPLength(firstString, leftRotated);
        
        if (leftLCP > maxLen || (leftLCP === maxLen && rotations < minRotations)) {
            maxLen = leftLCP;
            minRotations = rotations;
        }
        
        // 右旋转
        const rightRotated = rightRotate(secondString, rotations + 1);
        const rightLCP = getLCPLength(firstString, rightRotated);
        
        if (rightLCP > maxLen || (rightLCP === maxLen && (rotations + 1) < minRotations)) {
            maxLen = rightLCP;
            minRotations = rotations + 1;
        }
        
        // 提前终止条件：已经找到最大可能LCP
        if (maxLen === len) break;
    }
    
    return maxLen > 0 ? minRotations : -1;
}

// 测试用例
console.log(minRotationsForLCPOptimized("a2abccc", "bddda2a")); // 3 (右旋转3次得到"a2abddd"，LCP为"a2a")
console.log(minRotationsForLCPOptimized("abcd", "dabc")); // 1 (右旋转1次得到"dabc"，LCP为"d")
console.log(minRotationsForLCPOptimized("hello", "world")); // -1 (无公共前缀)
console.log(minRotationsForLCPOptimized("abc", "abc")); // 0 (无需旋转)
console.log(minRotationsForLCPOptimized("aabbcc", "ccaabb")); // 2 (左旋转2次得到"aabbcc"，LCP为"aabbcc")
console.log('======================');
