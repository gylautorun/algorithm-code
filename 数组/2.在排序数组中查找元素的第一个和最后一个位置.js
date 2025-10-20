// 给定一个按照升序排列的整数数组 nums，和一个目标值 target。
// 找出给定目标值在数组中的开始位置和结束位置。
// 如果数组中不存在目标值 target，返回 [-1, -1]。

// 进阶：
// 你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？

// 示例 1：
// 输入：nums = [5,7,7,8,8,10], target = 8
// 输出：[3,4]

// 示例 2：
// 输入：nums = [5,7,7,8,8,10], target = 6
// 输出：[-1,-1]

// 示例 3：
// 输入：nums = [], target = 0
// 输出：[-1,-1]

// 提示：
// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109
// nums 是一个非递减数组
// -109 <= target <= 109

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {
    const res = [-1, -1];
    if (!nums.length) {
        return res;
    }
    let i = 0;
    while (i < nums.length) {
        if (nums[i] === target) {
            if (res[0] > -1) {
                res[1] = i
            }
            else {
                res[0] = i;
                res[1] = i;
            }
        }
        if (res[1] > -1 && nums[i] > target) {
            return res;
        }
        i++;
    }
    return res;
};
var searchRange = function(nums, target) {
    if (!nums.length || nums[nums.length - 1] < target || nums[0] > target) {
        return [-1, -1];
    }
    let l = 0;
    let r = nums.length - 1;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2)
        if (nums[mid] > target) {
            r = mid - 1;
        }
        else if (nums[mid] < target) {
            l = mid + 1;
        }
        else {
            l = r = mid;
            while(nums[r] === target || nums[l] === target) {
                if (nums[l] === target) {
                    l = l - 1;
                }
                if (nums[r] === target) {
                    r = r + 1;
                }
            }

            return [l + 1, r - 1];
            
        }
        
    }
    return [-1, -1];
};
