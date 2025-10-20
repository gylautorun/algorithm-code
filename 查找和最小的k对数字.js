// 给定两个以 升序排列 的整数数组 nums1 和 nums2 , 以及一个整数 k 。

// 定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2 。

// 请找到和最小的 k 个数对 (u1,v1),  (u2,v2)  ...  (uk,vk) 。

 

// 示例 1:

// 输入: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
// 输出: [1,2],[1,4],[1,6]
// 解释: 返回序列中的前 3 对数：
//      [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
// 示例 2:

// 输入: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
// 输出: [1,1],[1,1]
// 解释: 返回序列中的前 2 对数：
//      [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
// 示例 3:

// 输入: nums1 = [1,2], nums2 = [3], k = 3 
// 输出: [1,3],[2,3]
// 解释: 也可能序列中所有的数对都被返回:[1,3],[2,3]
 

// 提示:

// 1 <= nums1.length, nums2.length <= 105
// -109 <= nums1[i], nums2[i] <= 109
// nums1 和 nums2 均为升序排列
// 1 <= k <= 1000

// 循环遍历取和最小依次输出
// 比较 nums1 下一位 和 nums2 下一位 和 和当前比较
/**
 * 
 * @param {number[]} nums1 
 * @param {number[]} nums2 
 * @param {number} k
 * @return {number[][]}
 */
function KSmallestPairs(nums1, nums2, k) {
    const m = nums1.length;
    const n = nums2.length;
    const queues = new Array(Math.min(m, k)).fill(0);
    const result = [];
    // while (k-- > 0) {
    while (result.length < k) {
        let minIdx = -1;
        let minValue = Number.MAX_VALUE;
        for (let i = 0; i < queues.length; i++) {
            if (queues[queues.length - 1] === n) return result;
            if (queues[i] === n) {
                continue;
            }
            let current = nums1[i] + nums2[queues[i]];
            if (current < minValue) {
                minIdx = i;
                minValue = current;
            }
            if (queues[i] === 0) {
                break;
            }
        }
        result.push([nums1[minIdx], nums2[queues[minIdx]]]);
        queues[minIdx]++;
    }
    return result;
}
function KSmallestPairs3(nums1, nums2, k) {
    const len1 = nums1.length;
    const len2 = nums2.length;
    const queues = [];
    const result = [];
    for (let i = 0; i < Math.min(len1, k); i++) {
        queues.push([i, 0]);
    }
    while (k-- > 0 && queues.length) {
        const que = queues.shift();
        const items = [];
        items.push(nums1[que[0]]);
        items.push(nums2[que[1]]);
        result.push(items);

        if (que[1] + 1 < len2) {
            queues.push([que[0], que[1] + 1]);
        }
    }
    return result;
}
function KSmallestPairs2(nums1, nums2, k) {
    const len1 = nums1.length;
    const len2 = nums2.length;
    let left = nums1[0] + nums2[0];
    let right = nums1[len1 - 1] + nums2[len2 - 1];
    let sum = right;
    while (left <= right) {
        const mid = left + (Math.floor((right - left) / 2));
        let count = 0;
        let start = 0;
        let end = len2 - 1;
        while (start < len1 && end >= 0) {
            if (nums1[start] + nums2[end] > mid) {
                end--;
            }
            else {
                count += end + 1;
                start++;
            }
        }
        if (count < k) {
            left = mid + 1;
        }
        else {
            sum = mid;
            right = mid - 1;
        }
        
    }
    const result = [];
    let pos = len2 - 1;
    // 找小于目标值sum的数
    for (let i = 0; i < len1; i++) {
        while (pos >= 0 && nums1[i] + nums2[pos] > sum) {
            pos--;
        }
        for (let j = 0; j <= pos && k > 0; j++,k--) {
            result.push([nums1[i], nums2[j]])
        }
    }
    pos = len2 - 1;
    // 找等于目标值sum的数
    for (let i = 0; i < len1 && k > 0; i++) {
        while (pos >=0 && nums1[i] + nums2[pos] > sum) {
            pos--;
        }
        for (let j = i; j >= 0 && k > 0 && nums1[j] + nums2[pos] === sum; j--,k--) {
            result.push([nums1[j], nums2[pos]]);
        }
    }
    return result;
}
console.log(KSmallestPairs([1,7,11], [2,4,6], 3));





