// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。


//               3
//       2       3 2   2
// _ 1 _ 2 1 _ 1 3 2 1 2 1
// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 

// 输入：height = [4,2,0,3,2,5]
// 输出：9

// n == height.length
// 1 <= n <= 2 * 104
// 0 <= height[i] <= 105

// 双指针, 分别记录 左右最大值
const trap = function(height) {
    let res = 0;
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    while (left <= right) {
        // 最大高度 对比 每个索引下高度, 计算出可蓄水量
        leftMax = Math.max(leftMax, height[left]);
        rightMax = Math.max(rightMax, height[right]);
        if (height[left] < height[right]) {
            res += leftMax - height[left];
            left++;
        }
        else {
            res += rightMax - height[right];
            right--;
        }
    }

    return res;
};
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6
console.log(trap([4,2,0,3,2,5])); // 9