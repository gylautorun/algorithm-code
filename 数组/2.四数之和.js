// 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 
// 请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] 
// （若两个四元组元素一一对应，则认为两个四元组重复）：
// 0 <= a, b, c, d < n
// a、b、c 和 d 互不相同
// nums[a] + nums[b] + nums[c] + nums[d] == target
// 你可以按 任意顺序 返回答案 。

// 示例 1：
// 输入：nums = [1,0,-1,0,-2,2], target = 0
// 输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

// 示例 2：
// 输入：nums = [2,2,2,2,2], target = 8
// 输出：[[2,2,2,2]]

// 提示：
// 1 <= nums.length <= 200
// -109 <= nums[i] <= 109
// -109 <= target <= 109

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
function fourSum(nums, target) {
    if (nums.length < 4) {
        return [];   
    }
    const map = new Set();
    nums.sort((a, b) => a - b);
    const result = [];
    let i = 0;
    while (i < nums.length) {
        let j = i + 1;
        while (j < nums.length) {
            let l = j + 1;
            let r = nums.length - 1;
            // 此处
            while(l < r){
                const res = nums[i] + nums[j] + nums[l] + nums[r];
                if(res === target){
                    const temp = [nums[i], nums[j], nums[l], nums[r]];
                    if (!map.has(temp.toString())) {
                        result.push(temp);
                        map.add(temp.toString());
                    }
                    
                    // 判断左界和右界是否和下一位置重复，去除重复解
                    // 同时将 L,R移到下一位置，寻找新解
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
                    res < target ? l++ : r--;
                }
            }
            j++;
        }
        i++;
    }
    return result;
};