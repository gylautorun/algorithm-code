// 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
// 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。
// 例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列
// 示例 1：
// 输入：nums = [10,9,2,5,3,7,101,18]
// 输出：4
// 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。

// 示例 2：
// 输入：nums = [0,1,0,3,2,3]
// 输出：4  => [0,1,2,3]

// 示例 3：
// 输入：nums = [7,7,7,7,7,7,7]
// 输出：1


// 提示：
// * 1 <= nums.length <= 2500
// -10^4 <= nums[i] <= 10^4

/**
 * 动态规划
 * @param {*} nums 
 * @returns 
 */
// [10,9,2,5,3,7,101,18]
const lengthOfLIS = function (nums) {
    const dp = new Array(nums.length).fill(1);
    let res = 1;
    for (let i = 0; i < nums.length; i++) {
        // i与i前面的元素比较
        for (let j = 0; j < i; j++) {
            // 找比i小的元素，找到一个，就让当前序列的最长子序列长度加1
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        res = Math.max(res, dp[i]);
    }
    // return Math.max(...dp);
    return res;
}

// [10,9,2,5,3,7,101,18]
/**
 * 二分 + 贪心
 */
const lengthOfLIS2 = function (nums) {
    if (nums.length <= 1) {
        return nums.length;
    }
    const res = [nums[0]];
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] > res[res.length - 1]) {
            res.push(nums[i]);
        }
        // 二分查找
        else {
            let l = 0;
            let r = res.length - 1;
            while (l < r) {
                const mid = Math.floor(l + r / 2);
                if (res[mid] < nums[i]) {
                    l = mid + 1;
                }
                else {
                    r = mid;
                }
            }
            res[l] = nums[i];
        }
    }

    return res.length;
}