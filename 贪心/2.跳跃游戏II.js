// 给你一个非负整数数组 nums ，你最初位于数组的第一个位置
// 数组中的每个元素代表你在该位置可以跳跃的最大长度
// 你的目标是使用最少的跳跃次数到达数组的最后一个位置。
// 假设你总是可以到达数组的最后一个位置。

// 示例 1:
// 输入: nums = [2,3,1,1,4]
// 输出: 2
// 解释: 跳到最后一个位置的最小跳跃数是 2。
//      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
// 示例 2:
// 输入: nums = [2,3,0,1,4]
// 输出: 2

// 提示:
// 1 <= nums.length <= 104
// 0 <= nums[i] <= 1000
// 题目保证可以到达 nums[n-1]

/**
 * @param {number[]} nums
 * @return {number}
 */
 
 var jump = function(nums) {
    if (nums.length < 2) {
        return 0;
    }
    if (nums.length < 3) {
        return 1;
    }
    let res = 0; // 结果步数
    let prev = 0; // 当前覆盖的最远距离下标
    let next = nums[0]; // 下一步覆盖的最远距离下标: 索引 + 当前值
    let i = 0;
    while (i < nums.length) {
        next = Math.max(i + nums[i], next);
        if (next >= nums.length - 1) {
            return res + 1;
        };
        if (i === prev) {
            res++;
            prev = next;
        }
        i++;
    }
    return res;
};