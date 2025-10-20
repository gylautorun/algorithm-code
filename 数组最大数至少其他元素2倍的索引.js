// 给你一个整数数组 nums ，其中总是存在 唯一的 一个最大整数 。
// 请你找出数组中的最大元素并检查它是否 至少是数组中每个其他数字的两倍 。
// 如果是，则返回 最大元素的下标 ，否则返回 -1 。
// 示例 1：
// 输入：nums = [3,6,1,0]
// 输出：1
// 解释：6 是最大的整数，对于数组中的其他整数，6 大于数组中其他元素的两倍。6 的下标是 1 ，所以返回 1 。
// 示例 2：
// 输入：nums = [1,2,3,4]
// 输出：-1
// 解释：4 没有超过 3 的两倍大，所以返回 -1 。
// 示例 3：
// 输入：nums = [1]
// 输出：0
// 解释：因为不存在其他数字，所以认为现有数字 1 至少是其他数字的两倍。
// 示例 4：
// 输入：nums = [0,0,0,1]
// 输出：3
// 解释：因为不存在其他数字，所以认为现有数字 1 至少是其他数字的两倍。
 
// 提示：
// 1 <= nums.length <= 50
// 0 <= nums[i] <= 100
// nums 中的最大元素是唯一的

function dominantIndex(nums) {
    const len = nums.length;
    if (!len) {
        return -1;
    }
    if (len === 1) {
        return 0;
    }

    // 记录第一 和 第二 的索引, 比较两个数即可
    // let first = 0;
    // let second = -1;
    // for (let i = 1; i < len; i++) {
    //     let n = nums[i];
    //     if (n > nums[first]) {
    //         second = first;
    //         first = i;
    //     }
    //     else if(n > nums[second] || second < 0) {
    //         second = i;
    //     }
    // }
    // if (nums[first] < nums[second] * 2) {
    //     return -1;
    // }
    // return first;

    let first = 0;
    let secondNum = Number.MIN_VALUE;
    for (let i = 1; i < len; i++) {
        let n = nums[i];
        if (n > nums[first]) {
            secondNum = nums[first];
            first = i;
        }
        else if(n > secondNum) {
            secondNum = n;
        }
    }
    if (nums[first] < secondNum * 2) {
        return -1;
    }
    return first;
}