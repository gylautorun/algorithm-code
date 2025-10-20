// 给定n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1
// 求在该柱状图中，能够勾勒出来的矩形的最大面积

// heights = [2,1,5,6,2,3]
// 10: 最大的矩形为图中红色区域，面积为 10

// heights = [2,4]
// 4: 最大的矩形为图中红色区域，面积为 4

// 1 <= heights.length <= 105
// 0 <= heights[i] <= 104

function maxAreaStack(heights) {
    let max = 0;
    const stack = [];
    heights.push(0);
    heights.unshift(0);

    for (let i = 0, n = heights.length; i < n; i++) {
        while (heights[i] < heights[stack[stack.length - 1]]) {
            const topIndex = stack.pop();
            max = Math.max(
                max,
                heights[topIndex] * (i - stack[stack.length - 1] - 1)
            );
        }
        stack.push(i);
    }
    return max;
}

console.log(maxAreaStack([2,1,5,6,2,3]));