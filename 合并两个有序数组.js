const arr1 = [1, 2, 3];
const arr2 = [2, 5, 6];
/**
 * 数组非递减, 长度为m, n:
 * nums1: [] m
 * nums2: [] n
 * 合并两个有序有效数组, 合并nums2 to nums1 中, 
 * 由于存储到nums1中, nums1 长度为 m + n
 */
// 创建新数组, 最后赋值给nums1
function mergeNums(nums1, nums2) {
    const result = [];
    const m = nums1.length;
    const n = nums2.length;

    let i = 0;
    let i1 = 0;
    let i2 = 0;
    while (i < m + n) {
        if (i1 >= m) {
            // nums1取完, 直接取 nums2后续即可
            result[i] = nums2[i2++];
        }
        else if (i2 >= n) {
            // nums2取完, 直接取 nums1后续即可
            result[i] = nums1[i1++];
        }
        else if (nums1[i1] > nums2[i2]) {
            result[i] = nums2[i2++];
        }
        else {
            result[i] = nums1[i1++];
        }
        i++;
    }
    for (let i = 0; i < m + n; i++) {
        nums1[i] = result[i];
    }
}
mergeNums(arr1, arr2);
console.log(arr1);


/**
 * 直接在nums1 上操作, 需要从后面对比, 依次加入nums1 m+n 位置补全
 * @param {*} nums1 
 * @param {*} nums2 
 */
function mergeNums2(nums1, nums2) {
    const m = nums1.length;
    const n = nums2.length;

    let i = m + n - 1;
    let i1 = m - 1;
    let i2 = n - 1;
    while (i >= 0) {
        if (i1 < 0) {
            // nums1取完, 直接取 nums2后续即可
            nums1[i] = nums2[i2--];
        }
        else if (i2 < 0) {
            // nums2取完, 就不用对比了
            break;
        }
        else if (nums1[i1] >= nums2[i2]) {
            nums1[i] = nums1[i1--];
        }
        else if (nums1[i1] < nums2[i2]) {
            nums1[i] = nums2[i2--];
        }
        i--;
    }
}
const arr3 = [1, 2, 3];
const arr4 = [2, 5, 6];
mergeNums2(arr3, arr4);
console.log(arr3);
