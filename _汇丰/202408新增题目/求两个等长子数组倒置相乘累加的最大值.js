/**
    给定一个数组，取大小相等的两个子数组，第二个子数组倒置，两个子数组对应位置相乘并对结果累加，问能得到的最大值是多少
    （该题目原题会比较绕，需要仔细理解才能捋清楚题目的要求）
    方法思路
    这个问题可以分解为以下步骤：
    1. 将数组分成两个等长的子数组（如果原数组长度为奇数，则中间元素不参与计算）
    2. 将第二个子数组倒置
    3. 计算两个子数组对应位置元素的乘积之和
    4. 找出所有可能分割方式中的最大值
 */

function maxRotatedSum(arr) {
    const n = arr.length;
    let maxSum = -Infinity;
    
    // 所有可能的分割点（从1到n-1）
    for (let k = 1; k < n; k++) {
        // 确保两个子数组长度相等
        const len = Math.min(k, n - k);
        if (len === 0) continue;
        
        // 获取第一个子数组（前k个元素中的后len个）
        const subArr1 = arr.slice(k - len, k);
        // 获取第二个子数组（后n-k个元素中的前len个），并倒置
        const subArr2 = arr.slice(k, k + len).reverse();
        
        // 计算对应位置乘积之和
        let currentSum = 0;
        for (let i = 0; i < len; i++) {
            currentSum += subArr1[i] * subArr2[i];
        }
        
        // 更新最大值
        if (currentSum > maxSum) {
            maxSum = currentSum;
        }
    }
    
    return maxSum;
}
console.log('===============================');
// 测试用例
console.log(maxRotatedSum([-1, -2, -3, -4])); // 输出: 12  [-3][-4] 最大
// 输出: 22 (分割为[2,3]和[5,4], 2*5 + 3*4 = 10 + 12 = 22)
console.log(maxRotatedSum([1, 2, 3, 4, 5])); 
console.log(maxRotatedSum([5, 4, 3, 2, 1])); // 输出: 22
console.log(maxRotatedSum([1, 1, 1, 1])); // 输出: 2 (分割为[1,1]和[1,1], 1*1 + 1*1 = 2)
console.log(maxRotatedSum([10, 20, 30])); // 输出: 600 (分割为[20]和[30], 20*30 = 600)

function maxRotatedSubarrayProductSum(nums) {
    const n = nums.length;
    let maxSum = -Infinity;
    
    // 遍历所有可能的子数组长度
    for (let len = 1; len <= Math.floor(n / 2); len++) {
      // 遍历所有可能的起始位置
        for (let i = 0; i <= n - 2 * len; i++) {
            const sub1 = nums.slice(i, i + len);
            const sub2 = nums.slice(i + len, i + 2*len).reverse();
            
            // 计算对应位置乘积和
            let currentSum = 0;
            for (let j = 0; j < len; j++) {
                currentSum += sub1[j] * sub2[j];
            }
            
            maxSum = Math.max(maxSum, currentSum);
        }
    }
    
    return maxSum;
}

// 示例用法
console.log('===============================');
console.log(maxRotatedSubarrayProductSum([-1, -2, -3, -4])); // 正确输出: 12
console.log(maxRotatedSubarrayProductSum([1, 2, 3, 4, 5]));  // 22
console.log(maxRotatedSubarrayProductSum([5, 4, 3, 2, 1]));  // 22
console.log(maxRotatedSubarrayProductSum([1, 1, 1, 1]));     // 2
console.log(maxRotatedSubarrayProductSum([10, 20, 30]));     // 600
