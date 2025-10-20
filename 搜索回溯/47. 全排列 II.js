// 给定一个可包含重复数字的序列，返回所有不重复的全排列。

// 示例:

// 输入: [1,1,2]
// 输出:
// [
//   [1,1,2],
//   [1,2,1],
//   [2,1,1]
// ]

const permuteUnique = function (nums) {
    const result = [];
    dfs(result, [], nums.sort((a,b) => a - b), []);
    return result;

    function dfs(result, stack, nums, usedList) {
        if (nums.length === stack.length) {
            result.push([...stack]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (usedList[i]) continue; // 同一数字不能用用次
            if (i > 0 && nums[i] === nums[i - 1] && usedList[i - 1]) continue; // 同样值的数字不能用两次
            stack.push(nums[i]);
            usedList[i] = true;
            dfs(result, stack, nums, usedList);
            usedList[i] = false;
            stack.pop();
        }
    }
};

console.log(permuteUnique([1,1,2]));