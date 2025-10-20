// 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组
//（子数组最少包含一个元素），返回其最大和
// 子数组 是数组中的一个连续部分

// 示例 1：
// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 

// 示例 2：
// 输入：nums = [1]
// 输出：1

// 示例 3：
// 输入：nums = [5,4,-1,7,8]
// 输出：23

// 提示：
// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104

var maxSubArray = function(nums) {
    if (nums.length === 1) {
        return nums[0];
    }
    let res = nums[0];
    let sum = 0;
    let i = 0;
    while (i < nums.length) {
        if (sum > 0) {
            sum += nums[i];
        }
        else {
            sum = nums[i];
        }
        
        res = Math.max(sum, res);
        i++;
    }
    return res;
};

// [-2,1,-3,4,-1,2,1,-5,4]
var maxSubArray = function(nums) {
    if (nums.length === 1) {
        return nums[0];
    }
    let res = nums[0];
    const f = [nums[0]];
    let i = 1;
    while (i < nums.length) {
        if (f[i - 1] >= 0) {
            f[i] = nums[i] + f[i - 1];
        }
        else {
            f[i] = nums[i];
        }
        
        res = Math.max(f[i], res);
        i++;
    }
    return res;
};