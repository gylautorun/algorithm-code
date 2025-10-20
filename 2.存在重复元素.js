// 给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，
// 满足 nums[i] == nums[j] 且 abs(i - j) <= k 
// 如果存在，返回 true ；否则，返回 false 。

// 示例 1：
// 输入：nums = [1,2,3,1], k = 3
// 输出：true

// 示例 2：
// 输入：nums = [1,0,1,1], k = 1
// 输出：true

// 示例 3：
// 输入：nums = [1,2,3,1,2,3], k = 2
// 输出：false

// 提示：
// 1 <= nums.length <= 105
// -109 <= nums[i] <= 109
// 0 <= k <= 105

/**
 * 
 * @param {number[]} nums 
 * @param {number} k 
 * @return {boolean}
 */
function containsNearbyDuplicate(nums, k) {
    const len = nums.length;
    if (len < 2 || k < 0) {
        return false;
    }
    const temps = {};
    let i = 0;
    while (i < len) {
        let num = temps[nums[i]];
        if (num !== undefined && Math.abs(num - i) <= k) {
            return true;
        }
        temps[nums[i]] = i;
        i++;
    }
    return false;
}
// 滑动窗口 k+1作为一个窗口单元, 超过此单元不符合, 在此单元绝对符合
function containsNearbyDuplicate(nums, k) {
    const len = nums.length;
    if (len < 2 || k < 0) {
        return false;
    }
    const temps = {};
    let i = 0;
    while (i < len) {
        if (i > k) {
            delete temps[nums[i - k - 1]];
        }
        if (temps[nums[i]] !== undefined) {
            return true;
        }
        temps[nums[i]] = i;
        i++;
    }
    return false;
}