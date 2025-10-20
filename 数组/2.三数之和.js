// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？
// 请你找出所有和为 0 且不重复的三元组
// 注意：答案中不可以包含重复的三元组

// 示例 1：
// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]

// 示例 2：
// 输入：nums = []
// 输出：[]

// 示例 3：
// 输入：nums = [0]
// 输出：[]

// 提示：
// 0 <= nums.length <= 3000
// -105 <= nums[i] <= 105

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {
    if (nums.length < 3) {
        return [];   
    }
    nums.sort((a, b) => a - b);
    const result = [];
    let i = 0;
    while (i < nums.length) {
        if(nums[i] > 0 || nums[nums.length - 1] < 0) {
            break;
        };
        if (nums[i] !== nums[i - 1]) {
            let l = i + 1;
            let r = nums.length - 1;
            // 此处
            while(l < r && nums[r] >= 0){
                const res = nums[i] + nums[l] + nums[r];
                if(res === 0){
                    result.push([nums[i], nums[l], nums[r]]);

                    while (nums[l] === nums[l + 1] && l < r) {
                        l++;
                    }
                    while (nums[r] === nums[r-1] && l < r) {
                        r--;
                    }
                    l++;
                    r--;
                }
                else {
                    res < 0 ? l++ : r--;
                }
            }
        }
        i++;
    }
    return result;
};