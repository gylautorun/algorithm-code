// 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
// 请你找出并返回这两个正序数组的 中位数 
// 算法的时间复杂度应该为 O(log (m+n)) 。

// 示例 1：
// 输入：nums1 = [1,3], nums2 = [2]
// 输出：2.00000
// 解释：合并数组 = [1,2,3] ，中位数 2

// 示例 2：
// 输入：nums1 = [1,2], nums2 = [3,4]
// 输出：2.50000
// 解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5

// 示例 3：
// 输入：nums1 = [0,0], nums2 = [0,0]
// 输出：0.00000

// 示例 4：
// 输入：nums1 = [], nums2 = [1]
// 输出：1.00000

// 示例 5：
// 输入：nums1 = [2], nums2 = []
// 输出：2.00000

// 提示：
// nums1.length == m
// nums2.length == n
// 0 <= m <= 1000
// 0 <= n <= 1000
// 1 <= m + n <= 2000
// -106 <= nums1[i], nums2[i] <= 106

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 function findMedianSortedArrays(nums1, nums2) {
    nums1 = nums1.concat(nums2).sort((a, b) => a - b);
    if (!nums1.length) {
        return 0;
    }
    if (nums1.length === 1) {
        return nums1[0];
    }
    const idx = Math.floor(nums1.length / 2);
    if (nums1.length % 2) {
        return nums1[idx];
    }
    return (nums1[idx] + nums1[idx - 1]) / 2;
    
    const mid = Math.floor((nums1.length + nums2.length) / 2);
    const mod = (nums1.length + nums2.length) % 2;
    if (!nums1.length) {
        return mod ? nums2[mid] : (nums2[mid] + nums2[mid - 1]) / 2;
    }
    if (!nums2.length) {
        return mod ? nums1[mid] : (nums1[mid] + nums1[mid - 1]) / 2;
    }
    const res = [];
    let i = j = 0;
    while (res.length <= mid) {
        if (nums2[j] === undefined) {
            res.push(nums1[i]);
            i++;
        }
        else if(nums1[i] === undefined) {
            res.push(nums2[j]);
            j++;
        }
        else {
            if (nums1[i] >= nums2[j]) {
                res.push(nums2[j]);
                j++;
            }
            else {
                res.push(nums1[i]);
                i++;
            }
        }
    }
    return mod ? res[res.length - 1] : (res[res.length - 1] + res[res.length - 2]) / 2;
};