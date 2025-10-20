// 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 
// 在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 
// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
// 说明：你不能倾斜容器。

// 示例 1：
// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49 
// 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。
// 在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49

// 示例 2：
// 输入：height = [1,1]
// 输出：1

// 示例 3：
// 输入：height = [4,3,2,1,4]
// 输出：16

// 示例 4：
// 输入：height = [1,2,1]
// 输出：2
//  
// 提示：
// n == height.length
// 2 <= n <= 105
// 0 <= height[i] <= 104


/**
 * @param {number[]} height
 * @return {number}
 */
 // 双指针移动, 移动小的, 比较大小
function maxArea(height) {
    let max = 0;
    let i = 0;
    let j = height.length - 1;
    while (i < j) {
        if (height[i] >= height[j]) {
            max =  Math.max(height[j] * (j - i), max);
            j--;
        }
        else {
            max =  Math.max(height[i] * (j - i), max);
            i++;
        }
    }
    return max;
};
// 双指针, 移动小的, 比较大小 (跳过小于当前高度的移动值)
function maxArea(height) {
    let max = 0;
    let i = 0;
    let j = height.length - 1;
    while (i < j) {
        if (height[i] >= height[j]) {
            let aj = j;
            max =  Math.max(height[j] * (j - i), max);
            j--;
            while (height[j] < height[aj] && i < j) {
                j--;
            }

        }
        else {
            let ai = i;
            max =  Math.max(height[i] * (j - i), max);
            i++;
            while (height[i] < height[ai] && i < j) {
                i++;
            }
        }
    }
    return max;
};
