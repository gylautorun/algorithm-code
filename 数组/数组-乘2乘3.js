// 给定一个数组只有一个初始数字1对这个数组的每个数字k做k*2+1和k*3+1
// 然后加入数组要求这个数组是sorted并且没有重复元素返回第N个这个数组应该是
// [1,3,4,7,9,10,13]
// 算法
// 3(1*2+1) 4(1*3+1)
// 7(3*2+1) 10(3*3+1)
// 9(4*2+1) 13(4*3+1)
// 因为出现了3算出来的比4还大所以单纯用queue不行要用heap然后用set去重

function findNthArray(n) {
    const nums = [1];

    for (let i = 0; i < nums.length; i++) {
        const num1 = nums[i] * 2 + 1;
        const num2 = nums[i] * 3 + 1;
        if (num1 > n) {
            break;
        }
        if (num1 > nums[nums.length - 1]) {
            nums.push(num1);
        }
        else if (num1 < nums[nums.length - 1]) {
            const temp = nums[nums.length - 1];
            nums[nums.length - 1] = num1;
            nums.push(temp);
        }
        if (num2 > n) {
            break;
        }
        nums.push(num2);
    }

    return nums;
}

console.log(findNthArray(500));
