// 给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。
// 假设 nums 只有 一个重复的整数 ，返回 这个重复的数 。
// 你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。

// 示例 1：
// 输入：nums = [1,3,4,2,2]
// 输出：2

// 示例 2：
// 输入：nums = [3,1,3,4,2]
// 输出：3
 

// 提示：
// 1 <= n <= 105
// nums.length == n + 1
// 1 <= nums[i] <= n
// nums 中 只有一个整数 出现 两次或多次 ，其余整数均只出现 一次
 

// 进阶：
// 如何证明 nums 中至少存在一个重复的数字?
// 你可以设计一个线性级时间复杂度 O(n) 的解决方案吗？


const findDuplicate = function(nums) {
    // 排序
    nums.sort();
    let i = 0, j = 1;
    while (j < nums.length) {
        if (nums[i] === nums[j]) {
            return nums[i];
        }
        i++;
        j++;
    }
};


/**
 * 
 * 二分查找除了对索引二分，还有值域二分
    - 数组元素是 1 - n 中的某一个，出现的位置不确定，但值域是确定的。
        - 对索引二分，一般用于有序数组中找元素，因为索引的大小可以反映值的大小，因此对索引二分即可。
        - 对值域二分。重复数落在 [1, n] ，可以对 [1, n] 这个值域二分查找。
    - mid = (1 + n) / 2，重复数要么落在[1, mid]，要么落在[mid + 1, n]。
    - 遍历原数组，统计 <= mid 的元素个数，记为 k。
    - 如果k > mid，说明有超过 mid 个数落在[1, mid]，但该区间只有 mid 个“坑”，说明重复的数落在[1, mid]。
    - 相反，如果k <= mid，则说明重复数落在[mid + 1, n]。
    - 对重复数所在的区间继续二分，直到区间闭合，重复数就找到了。
   时间复杂度：二分法O(logN)O(logN)O(logN)，但二分法内部遍历了一次数组O(N)O(N)O(N)，综合为O(NlogN)O(NlogN)O(NlogN) 空间复杂度：O(1)O(1)O(1)
 */
const findDuplicate1 = function(nums) {
    let i = 0;
    let j = nums.length - 1;
    while (i < j) {
        const mid = Math.floor((i + j) / 2);
        let count = 0;
        for (const v of nums) {
            if (v <= mid) {
                count++;
            }
        }

        if (count > mid) {
            j = mid;
        }
        else {
            i = mid + 1;
        }
    }
    return i;
};

const obj = require('./1');
console.log(obj)
/**
快慢指针法
    分析这个数组，索引从 0～n0～n0～n ，值域是 1～n1～n1～n 。值域，在索引的范围内，值可以当索引使。
    比如，nums 数组：[4,3,1,2,2][4, 3, 1, 2, 2][4,3,1,2,2]
    以 nums[0] 的值 4 作为索引，去到 nums[4]
    以 nums[4] 的值 2 作为索引，去到 nums[2]
    以 nums[2] 的值 1 作为索引，去到 nums[1]……
    从一项指向另一项，将nums数组抽象为链表：4->2->1->3->2，如下图，链表有环

有环链表，重复数就是入环口
*/
const findDuplicate3 = function(nums) {
    let slow = 0;
    let fast = 0;
    while (true) {
        slow = nums[slow];
        fast = nums[nums[fast]]
        
        if (slow === fast) {
            fast = 0;
            while (true) {
                if (slow === fast) {
                    return slow;
                }
                slow = nums[slow];
                fast = nums[fast];
            }
        }
    }
};

// console.log(findDuplicate3(nums));
