// 给定一个 没有重复 数字的序列，返回其所有可能的全排列。

// 示例:

// 输入: [1,2,3]
// 输出:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]

// 思路
// 回溯的基本思路清参考上方的回溯专题。

// 以 [1,2,3] 为例，我们的逻辑是：

// 先从 [1,2,3] 选取一个数。
// 然后继续从 [1,2,3] 选取一个数，并且这个数不能是已经选取过的数。
// 如何确保这个数不能是已经选取过的数？我们可以直接在已经选取的数字中线性查找，也可以将已经选取的数字中放到 hashset 中，这样就可以在 
//  的时间来判断是否已经被选取了，只不过需要额外的空间。

// 重复这个过程直到选取的数字个数达到了 3。

const permute = function (nums) {
    const result = [];
    dfs(result, [], nums);
    return result;

    function dfs(res, tempList, nums) {
        if (tempList.length === nums.length) {
            res.push([...tempList]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            if (!tempList.includes(num)) {
                tempList.push(num);
                dfs(res, tempList, nums);
                tempList.pop();
            }
        }
    }
};
console.log(permute([1,2,3]));