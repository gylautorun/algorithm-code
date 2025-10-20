/**
 * 整数数组 nums []
 * 目标数字 target
 * 数组中找出和为目标数的两个整数的下标
 * 假设只对应一个答案, 且同一个元素答案中不能重复
 */

function findSum(nums, target) {
    const map = new Map();
    // const map = Object.create(null);
    const l = nums.length;
    const result = [];
    for (let i = 0; i < l; i++) {
        const res = target - nums[i];
        console.log(map);
        if (map.get(res)) {
            result[0] = map.get(res);
            result[1] = i;
            break;
        }
        else {
            map.set(nums[i], i); 
        }
    }
    return result;
}

console.log(findSum([6, 8, 23, 5, 14, 17, 9, 13], 30)); // [5, 7]