// 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
// candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 
// 对于给定的输入，保证和为 target 的不同组合数少于 150 个

// 输入：candidates = [2,3,6,7], target = 7
// 输出：[[2,2,3],[7]]
// 解释：
// 2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
// 7 也是一个候选， 7 = 7 。
// 仅有这两种组合。

// 输入: candidates = [2,3,5], target = 8
// 输出: [[2,2,2,2],[2,3,3],[3,5]]

// 输入: candidates = [2], target = 1
// 输出: []


// 我们定义递归函数 dfs(target,combine,idx) 表示当前在 candidates数组的第 idx 位，
// 还剩 target 要组合，已经组合的列表为 combine。
// 递归的终止条件为 target≤0 或者 candidates 数组被全部用完。
// 那么在当前的函数中，每次我们可以选择跳过不用第 idx 个数，即执行 dfs(target,combine,idx+1)。
// 也可以选择使用第 idx 个数，即执行 dfs(target−candidates[idx],combine,idx)，
// 注意到每个数字可以被无限制重复选取，因此搜索的下标仍为 idx。

// 更形象化地说，如果我们将整个搜索过程用一个树来表达，即如下图呈现，每次的搜索都会延伸出两个分叉，直到递归的终止条件，这样我们就能不重复且不遗漏地找到所有可行解
// ./组合总和.png

// 搜索回溯的过程一定存在一些优秀的剪枝方法来使得程序运行得更快，而这里只给出了最朴素不含剪枝的写法
const combinationSum = function(candidates, target) {
    const res = [];
    const dfs = (target, combine, idx) => {
        if (target === 0) {
            res.push(combine);
            return;
        }
        if (idx === candidates.length) {
            return;
        }
        
        // 跳过
        dfs(target, combine, idx + 1);
        // 选择当前数
        if (target - candidates[idx] >= 0) {
            dfs(target - candidates[idx], [...combine, candidates[idx]], idx);
        }
    };
    dfs(target, [], 0);
    return res;
};

const combinationSum1 = function(candidates, target) {
    const result = [];
    dfs(result, [], candidates, target, 0);
    return result;

    function dfs(result, tempList, nums, target, index){
        if (target === 0) {
            return result.push([...tempList]);
        }
        if (target < 0) {
            return;
        }
        for (let i = index; i < nums.length; i++) {
            tempList.push(nums[i]);
            dfs(result, tempList, nums, target - nums[i], i); // i代表数据可重复
            tempList.pop();
        }
    };
}

console.time();
console.log(combinationSum([2,3,6,7], 7));
console.log(combinationSum([2,3,5], 8));
console.log(combinationSum([2], 1));
console.timeEnd();