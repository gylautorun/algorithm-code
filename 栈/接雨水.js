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


const trap = function(height) {
    let res = 0;
    // 收集索引
    const stack = [];
    for (let i = 0; i < height.length; i++) {
        // 栈不为空 & 当前i 高度 > 上一个计算高度 (小于, 这里不能暂时不能接水)
        while (stack.length && height[i] > height[stack[stack.length - 1]]) {
            // 当前前进索引下, 已经计算的值
            // 当前 i = 5, top 为 4 已经计算过, 后续计算需要减去计算过的
            const top = stack.pop();
            // 栈空, 前面则无法再蓄水, 丢弃
            if (!stack.length) {
                // 栈空 提前结束
                break;
            }

            // 雨水 左侧索引
            const left = stack[stack.length - 1];
            // 宽度 = 坐标长度  3 -> 5 => 5 - 3 - 1 = 1 实际雨水宽度
            const width = i - left - 1;
            // 取小高度计算 雨水 Math.min(height[left], height[i])
            // 
            const _height = Math.min(height[left], height[i]) - height[top];
            res += _height * width;
        }
        stack.push(i);
    }

    return res;
};
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6
console.log(trap([4,2,0,3,2,5])); // 9