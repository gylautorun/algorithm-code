/**
    给数组按照数字的频率排序
    方法思路
    要按照数字出现的频率对数组进行排序，我们可以：
    1. 统计每个数字出现的频率
    2. 根据频率和数字本身进行排序
    3. 频率高的排在前面，频率相同的按数字大小排序
 */

function sortByFrequency(arr) {
    // 统计频率
    const frequencyMap = {};
    for (const num of arr) {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }
    
    // 自定义排序
    return arr.sort((a, b) => {
        if (frequencyMap[b] !== frequencyMap[a]) {
            return frequencyMap[b] - frequencyMap[a]; // 频率高的在前
        }
        return a - b; // 频率相同则数值小的在前
    });
}

// 测试用例
console.log(sortByFrequency([1, 2, 2, 3, 3, 3, 4, 4, 4, 4])); 
// [4, 4, 4, 4, 3, 3, 3, 2, 2, 1]

console.log(sortByFrequency([5, 5, 5, 2, 2, 7, 7, 7, 7])); 
// [7, 7, 7, 7, 5, 5, 5, 2, 2]

console.log(sortByFrequency([1, 1, 1, 1, 2, 2, 3])); 
// [1, 1, 1, 1, 2, 2, 3]

console.log(sortByFrequency([9, 9, 9, 9, 9])); 
// [9, 9, 9, 9, 9]

console.log(sortByFrequency([1, 2, 3, 4, 5])); 
// [1, 2, 3, 4, 5] (所有频率相同，按数值排序)

console.log(sortByFrequencyStable([
    1,
    3, 3, 3,
    2, 2, 2,
    4, 4, 4, 4
])); 
// [4, 4, 4, 4, 3, 3, 3, 2, 2, 2, 1]

console.log('======='); 

function sortByFrequencyStable(arr) {
    const frequencyMap = {};
    const indexMap = {}; // 记录数字首次出现的索引
    
    arr.forEach((num, i) => {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
        if (indexMap[num] === undefined) {
            indexMap[num] = i;
        }
    });
    
    return arr.sort((a, b) => {
        // 频率高的在前
        if (frequencyMap[b] !== frequencyMap[a]) {
            return frequencyMap[b] - frequencyMap[a];
        }
        // 频率相同则按数值排序
        if (a !== b) {
            return a - b;
        }
        // 频率和数值都相同则按原始顺序排序
        return indexMap[a] - indexMap[b]; // 保持原始顺序
    });
}
// 测试用例
console.log(sortByFrequencyStable([1, 2, 2, 3, 3, 3, 4, 4, 4, 4])); 
// [4, 4, 4, 4, 3, 3, 3, 2, 2, 1]

console.log(sortByFrequencyStable([5, 5, 5, 2, 2, 7, 7, 7, 7])); 
// [7, 7, 7, 7, 5, 5, 5, 2, 2]

console.log(sortByFrequencyStable([1, 1, 1, 1, 2, 2, 3])); 
// [1, 1, 1, 1, 2, 2, 3]

console.log(sortByFrequencyStable([9, 9, 9, 9, 9])); 
// [9, 9, 9, 9, 9]

console.log(sortByFrequencyStable([1, 2, 3, 4, 5])); 
// [1, 2, 3, 4, 5] (所有频率相同，按数值排序)

// 频率和数值都相同则按原始顺序排序
console.log(sortByFrequencyStable([
    1,
    3, 3, 3,
    2, 2, 2,
    4, 4, 4, 4
])); 
// [4, 4, 4, 4, 2, 2, 2, 3, 3, 3, 1]