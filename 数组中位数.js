// 有序数组 从某个点反转后, 根据反转后的数组求出原数组中位数? 注意: 不能使用排序? 
// [1,3,5,7,8,9,12,14] => [9,12,14,1,3,5,7,8] 这个数组找原有序数组的中位数
function getArray(n) {
    const arr = [1,3,5,7,8,9,12,14];
    const t = n % arr.length;
    return [...arr.slice(t), ...arr.slice(0, t)];
}
function midNumber(nums) {
    const l = nums.length;

    let i = 0;
    while (i < l - 1) {
        if (nums[i] > nums[i + 1]) {
            break;
        }
        i++;
    }
    const mid = Math.floor(l / 2);
    const start = (l - mid + i) % l;
    // 数组长度 奇数
    if (l % 2) {
        return nums[start];
    }
    else {
        const end = (start + 1) % l;
        return (nums[start] + nums[end]) / 2;
    }
}

// 双指针
function midNumber2(nums) {
    const l = nums.length;

    let i = 0;
    let j = 1;
    while (i < l - 1) {
        if (nums[i] < nums[j]) {
            // 完全有序
            if (j === l - 1) {
                return 
            }
            i++;
            j++;
        }
        // j 在临界点的右边
        else {
            // 完全有序
            if (j === l - 1) {
                return 
            }
        }
    }
    const mid = Math.floor(l / 2);
    const start = (l - mid + i) % l;
    // 数组长度 奇数
    if (l % 2) {
        return nums[start];
    }
    else {
        const end = (start + 1) % l;
        return (nums[start] + nums[end]) / 2;
    }
}

function consoleLog(n) {
    const arr = getArray(n);
    console.log(arr);
    console.log(midNumber2(arr));
}
consoleLog(0);
consoleLog(1);
consoleLog(2);
consoleLog(3);
consoleLog(4);
consoleLog(5);
consoleLog(6);
consoleLog(7);
