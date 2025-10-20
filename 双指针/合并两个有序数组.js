/**
    给两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
    请 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
    1. 
    注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。
    为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
    示例 1：
    输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
    输出：[1,2,2,3,5,6]
    解释：需要合并 [1,2,3] 和 [2,5,6] 。 合并结果是 [1,2,2,3,5,6]分析：所谓 非递减顺序 可以理解为 升序。
    2. 
    注意：合并后数组应由函数返回
    为了应对这种情况，nums1 的初始长度为 m，nums2 的长度为 n 。
    示例 1：
    输入：nums1 = [1,2,3], m = 3, nums2 = [2,5,6], n = 3
    输出：[1,2,2,3,5,6]
    解释：需要合并 [1,2,3] 和 [2,5,6] 。 合并结果是 [1,2,2,3,5,6]分析：所谓 非递减顺序 可以理解为 升序。
 */


/**
 * 1. 修改nums1
 * 逆向双指针, 从后往前填充
 */
function mergeSolution(nums1, m, nums2, n) {
    if (n === 0) {
        return;
    }
    if (m === 0) {
        nums1.splice(0, nums1.length, ...nums2);
        return;
    }

    let p1 = m - 1;
    let p2 = n - 1;
    let tail = m + n - 1;
    while (p1 >= 0 || p2 >= 0) {
        const value1 = nums1[p1];
        const value2 = nums2[p2];
        if (p1 < 0) {
            nums1[tail] = value2;
            tail--;
            p2--;
        }
        else if (p2 < 0) {
            // 直接结束
            break;
        }
        else if (value1 >= value2) {
            nums1[tail] = value1;
            tail--;
            p1--;
        }
        else {
            nums1[tail] = value2;
            tail--;
            p2--;
        }
    }
}
const nums1 = [1, 2, 3, 0, 0, 0];
const nums2 = [2, 5, 6];
mergeSolution(nums1, 3, nums2, 3);
console.log(nums1);





/**
 * 2. 返回合并后的数组
 * 逆向双指针, 新数组从后往前填充
 */
function mergeSolution2(nums1, m, nums2, n) {
    const result = [];

    let p1 = m - 1;
    let p2 = n - 1;
    let tail = m + n - 1;

    while (p1 >= 0 || p2 >= 0) {
        const value1 = nums1[p1];
        const value2 = nums2[p2];
        // p2 >= 0
        if (p1 < 0) {
            result[tail--] = value2;
            p2--;
        }
        else if (p2 < 0) {
            result[tail--] = value1;
            p1--;
        }
        else if (value1 >= value2) {
            result[tail--] = value1;
            p1--;
        }
        else {
            result[tail--] = value2;
            p2--;
        }
    }
    return result;
}
console.log(mergeSolution2([1, 2, 3], 3, [2, 5, 6], 3))