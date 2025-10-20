// 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
// candidates 中的每个数字在每个组合中只能使用 一次 。
// 注意：解集不能包含重复的组合。 


// 输入: candidates = [10,1,2,7,6,1,5], target = 8,
// 输出:
// [
//   [1,1,6],
//   [1,2,5],
//   [1,7],
//   [2,6]
// ]

// 输入: candidates = [2,5,2,1,2], target = 5,
// 输出:
// [
//   [1,2,2],
//   [5]
// ]

const combinationSum1 = function(candidates, target) {
    candidates.sort((a, b) => a - b);
    const res = [];

    const dfs = (target, combine, idx) => {
        if (target === 0) {
            res.push(combine);
            return;
        }
        if (idx === candidates.length) {
            return;
        }

        // 初始化与当前元素不重复的后一个元素的索引
        let notRepeatIdx = idx + 1;
        // 相同的元素
        while(candidates[notRepeatIdx] === candidates[idx]) {
            notRepeatIdx++;
        };
        if (target - candidates[idx] >= 0) {
            // 跳到不重复的元素继续递归
            dfs(target, combine, notRepeatIdx);
            // 选择当前值，继续递归下一个元素
            dfs(target - candidates[idx], [...combine, candidates[idx]], idx + 1);
        }

    };

    dfs(target, [], 0);
    return res;
};

const combinationSum = function(candidates, target) {
    candidates.sort((a, b) => a - b);
    const res = [];
    dfs(res, [], candidates, target, 0);
    return res;
    function dfs(res, combine, nums, target, idx) {
        if (target === 0) {
            return res.push([...combine]);
        }
        if (target < 0) {
            return;
        }

        for (let i = idx; i < nums.length; i++) {
            // 去重
            if (i > idx && nums[i] === nums[i - 1]) {
                continue;
            }
            combine.push(nums[i]);
            dfs(res, combine, nums, target - nums[i], i + 1);
            combine.pop();
        }
    }
};
console.log(combinationSum([2,3,6,7], 7));
console.log(combinationSum([10,1,2,7,6,1,5], 8));
console.log(combinationSum([2,5,2,1,2], 5));