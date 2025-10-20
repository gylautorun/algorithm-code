// 给定n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1
// 求在该柱状图中，能够勾勒出来的矩形的最大面积

// heights = [2,1,5,6,2,3]
// 10: 最大的矩形为图中红色区域，面积为 10

// heights = [2,4]
// 4: 最大的矩形为图中红色区域，面积为 4

// 1 <= heights.length <= 105
// 0 <= heights[i] <= 104

/**
 * 暴力
 */
function maxAreaRectangle(heights) {
    let max = 0; // 最大面积
    // 遍历每个值, 当前值作为最高高度, 去计算当前下能构成最大面积
    // 小于当前值停止遍历
    for (let i = 0; i < heights.length; i++) {
        let l = i - 1;
        let r = i + 1;
        let count = 1;
        while (l >= 0 && heights[l] >= heights[i]) {
            count++;
            l--;
        }
        while (r < heights.length && heights[r] >= heights[i]) {
            count++;
            r++;
        }
        max = Math.max(max, count * heights[i]);
    }
    return max
}

function maxAreaStack(heights) {
    let max = 0;
    const stack = [];
    heights = [0, ...heights, 0];
    for (let i = 0; i < heights.length; i++) {
        while (heights[i] < heights[stack[stack.length - 1]]) {
            const stackTopIdx = stack.pop();
            max = Math.max(
                max, 
                heights[stackTopIdx] * (i - stack[stack.length - 1] - 1)
            );
        }
        stack.push(i);
    }
    return max;
}
console.log(maxAreaRectangle([2,1,5,6,2,3]));
console.log(maxAreaStack([2,1,5,6,2,3]));