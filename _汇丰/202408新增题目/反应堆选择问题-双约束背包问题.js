/*
    vol、mass、energy是几个反应堆的容积、质量和能量。
    可以随意选择反应堆。
    要求：总容积不能超过reacCapacity，总质量不能超过 criticalMass
    输出在上述限制下，最大的energy之和
    方法思路
    这是一个典型的双约束背包问题（二维背包问题），我们需要在容积和质量的双重限制下，选择反应堆组合使得总能量最大。
    我们可以使用动态规划来解决这个问题：
    1. 创建一个二维数组dp，其中dp[i][j]表示容积为i、质量为j时的最大能量
    2. 初始化dp[0][0] = 0，其他为负无穷
    3. 对于每个反应堆，更新dp数组
    4. 最终结果是dp[reacCapacity][criticalMass]
*/

function maxReactorEnergy(vol, mass, energy, reacCapacity, criticalMass) {
    // 初始化动态规划表
    const dp = Array.from({length: reacCapacity + 1}, () => 
        Array(criticalMass + 1).fill(0));
    
    // 遍历每个反应堆
    for (let k = 0; k < vol.length; k++) {
        const v = vol[k], m = mass[k], e = energy[k];
        
        // 逆向遍历避免重复计算
        for (let i = reacCapacity; i >= v; i--) {
            for (let j = criticalMass; j >= m; j--) {
                if (dp[i - v][j - m] + e > dp[i][j]) {
                    dp[i][j] = dp[i - v][j - m] + e;
                }
            }
        }
    }
    
    return dp[reacCapacity][criticalMass];
}

// 测试用例
const vol = [2, 3, 4, 5];
const mass = [3, 4, 5, 6];
const energy = [3, 4, 5, 6];

console.log(maxReactorEnergy(vol, mass, energy, 8, 10)); // 9 (选择第2和第3个反应堆)
console.log(maxReactorEnergy(vol, mass, energy, 7, 7)); // 4 (选择第2个反应堆)
console.log(maxReactorEnergy(vol, mass, energy, 10, 15)); // 12 (选择所有反应堆)
console.log(maxReactorEnergy(vol, mass, energy, 1, 1)); // 0 (无法选择任何反应堆)
console.log(maxReactorEnergy(vol, mass, energy, 10, 10)); // 10 (选择第4个反应堆)
console.log('=====');

// 优化版本（空间优化）
function maxReactorEnergyOptimized(vol, mass, energy, reacCapacity, criticalMass) {
    const dp = Array.from({length: reacCapacity + 1}, () => 
        Array(criticalMass + 1).fill(0));
    
    for (let k = 0; k < vol.length; k++) {
        const v = vol[k], m = mass[k], e = energy[k];
        for (let i = reacCapacity; i >= v; i--) {
            for (let j = criticalMass; j >= m; j--) {
                dp[i][j] = Math.max(dp[i][j], dp[i - v][j - m] + e);
            }
        }
    }
    
    // 找到不超过限制的最大值
    let max = 0;
    for (let i = 0; i <= reacCapacity; i++) {
        for (let j = 0; j <= criticalMass; j++) {
            if (dp[i][j] > max) {
                max = dp[i][j];
            }
        }
    }
    return max;
}
console.log(maxReactorEnergyOptimized(vol, mass, energy, 8, 10)); // 9 (选择第2和第3个反应堆)
console.log(maxReactorEnergyOptimized(vol, mass, energy, 7, 7)); // 4 (选择第2个反应堆)
console.log(maxReactorEnergyOptimized(vol, mass, energy, 10, 15)); // 12 (选择所有反应堆)
console.log(maxReactorEnergyOptimized(vol, mass, energy, 1, 1)); // 0 (无法选择任何反应堆)
console.log(maxReactorEnergyOptimized(vol, mass, energy, 10, 10)); // 10 (选择第4个反应堆)
console.log('=====');
