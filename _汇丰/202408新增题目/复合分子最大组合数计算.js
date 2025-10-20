/**
    复合分子最大组合数计算
    给定4 个数 a, b, c, d ，表示分子的重量（？记不清概念了），要用来合成一种复合分子。复合分子的重量，由组成的分子重量之和，
    但是c , d需要先乘以2. 输入这4个数和一个复合分子的重量，求可以最多可以用多少个分子组合成复合分子。
    例如a = 5, b = 6,c = 2, d = 4   X = 21那么所用分子最多的组合可以是：c * 2 = 4, 21 % 4 = 15 个 c， 
    无法组成4 个 c，加1个a，（c * 2 * 4 + a ) = X所以答案是5.

    方法思路
    我们需要计算使用给定的4种分子（a, b, c, d）组合成指定重量X的复合分子时，最多可以使用多少个分子。其中c和d的重量需要先乘以2。
    1. 预处理：将c和d的重量乘以2
    2. 贪心算法：优先使用重量最小的分子，以最大化分子数量
    3. 组合计算：尝试所有可能的组合方式，找出使用分子数量最多的方案

 */



/**
 * 优化版本（动态规划）
 * @param {*} a 分子重量
 * @param {*} b 分子重量
 * @param {*} c 分子重量
 * @param {*} d 分子重量
 * @param {*} X 复合分子重量
 */
function maxMoleculesDP(a, b, c, d, X) {
    c *= 2;
    d *= 2;
    const molecules = [a, b, c, d].filter(w => w <= X).sort((x, y) => x - y);
    
    // dp[i]表示重量i时的最大分子数
    const dp = new Array(X + 1).fill(-Infinity);
    dp[0] = 0;
    
    for (let w = 1; w <= X; w++) {
        for (const m of molecules) {
            if (m <= w && dp[w - m] + 1 > dp[w]) {
                dp[w] = dp[w - m] + 1;
            }
        }
    }
    
    return dp[X] > 0 ? dp[X] : -1;
}
// 测试用例
console.log(maxMoleculesDP(5, 6, 2, 4, 21)); // 5 (4c + 1a = 4*4 + 5 = 21)
console.log(maxMoleculesDP(1, 2, 3, 4, 10)); // 10 (10a = 8*1 = 10)
console.log(maxMoleculesDP(2, 3, 4, 5, 1)); // -1 (无法组成)
console.log(maxMoleculesDP(1, 1, 1, 1, 8)); // 8 (8a = 8*1 = 8)
console.log(maxMoleculesDP(3, 5, 7, 9, 30)); // 10 (10a = 10*3 = 30)
console.log('===================================================');

function maxMolecules(a, b, c, d, X) {
    // c和d的重量需要乘以2
    c *= 2;
    d *= 2;
    
    // 按重量从小到大排序，方便贪心选择
    const molecules = [a, b, c, d].sort((x, y) => x - y);
    
    let maxCount = 0;
    
    // 尝试所有可能的组合方式
    for (let i = 0; i <= Math.floor(X / molecules[0]); i++) {
        for (let j = 0; j <= Math.floor((X - i * molecules[0]) / molecules[1]); j++) {
            for (let k = 0; k <= Math.floor((X - i * molecules[0] - j * molecules[1]) / molecules[2]); k++) {
                const remaining = X - i * molecules[0] - j * molecules[1] - k * molecules[2];
                if (remaining % molecules[3] === 0) {
                    const l = remaining / molecules[3];
                    const total = i + j + k + l;
                    if (total > maxCount) {
                        maxCount = total;
                    }
                }
            }
        }
    }
    
    return maxCount > 0 ? maxCount : -1; // 返回-1表示无法组成
}

// 测试用例
console.log(maxMolecules(5, 6, 2, 4, 21)); // 5 (4c + 1a = 4*4 + 5 = 21)
console.log(maxMolecules(1, 2, 3, 4, 10)); // 5 (1a + 2b = 1 + 2*2 = 5)
console.log(maxMolecules(2, 3, 4, 5, 1)); // -1 (无法组成)
console.log(maxMolecules(1, 1, 1, 1, 8)); // 8 (8a = 8*1 = 8)
console.log(maxMolecules(3, 5, 7, 9, 30)); // 10 (10a = 10*3 = 30)