// 给定一个整数数组 nums 和一个整数目标值 target，
// 请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
// 你可以按任意顺序返回答案。

// 示例 1：
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 

// 示例 2：
// 输入：nums = [3,2,4], target = 6
// 输出：[1,2]

// 示例 3：
// 输入：nums = [3,3], target = 6
// 输出：[0,1]

// 提示：
// 2 <= nums.length <= 104
// -109 <= nums[i] <= 109
// -109 <= target <= 109
// 只会存在一个有效答案

// 进阶：你可以想出一个时间复杂度小于 O(n2) 的算法吗？

/**
 * 时间复杂度O(2n2)
 * 空间复杂度小O(1)
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
    let i = 0;
    while(i < nums.length - 1) {
        const last = nums.lastIndexOf(target - nums[i]);
        if (last > i) {
            return [i, last];
        }
        i++;
    }
};

/**
 * 时间复杂度 < O(n2)
 * 空间复杂度O(n)
 * @param {number[]} nums 
 * @param {number} target
 * @return {number[]}
 */
function twoSum2(nums, target) {
    let i = 0;
    const result = {};
    while(i < nums.length) {
        // 对象存储差值的索引值
        // 存在两个一样值 后者会覆盖前者
        result[nums[i]] = i;
        // 数组 收集差值, 遍历直接获取到第一个值
        nums[i] = target - nums[i];
        i++;
    }

    let j = 0;
    while(j < nums.length) {
        const temp = result[nums[j]];
        // temp 存在(差值匹配到), 并且索引值不能和遍历索引相等
        if (temp && temp !== j) {
            return [j, temp];
        }
        j++;
    }
}

function twoSum3(nums, target) {
    let i = 0;
    const result = {};
    while(i < nums.length) {
        const temp = target - nums[i];
        // 对象存储差值的索引值
        // 存在两个一样值 后者会覆盖前者
        if (result[temp]) {
            return [result[temp], i];
        }
        result[nums[i]] = i;
        i++;
    }
}
