/**
方法思路
要计算两个数组的非公共元素个数，我们需要：
1. 找出只存在于第一个数组中的元素
2. 找出只存在于第二个数组中的元素
3. 统计这两部分元素的总数

需要考虑的边界情况：
* 数组可能包含重复元素
* 元素可能是对象或复杂类型（需要特殊处理）
* 数组可能为空
* 需要考虑严格相等比较
*/

function countNonCommonElements(arr1, arr2) {
    // 处理简单数据类型（数字、字符串等）
    function isPrimitive(value) {
        return value !== Object(value);
    }

    // 对象比较函数（简单版，仅适用于可序列化对象）
    function isEqual(a, b) {
        if (isPrimitive(a) && isPrimitive(b)) {
            return a === b;
        }
        return JSON.stringify(a) === JSON.stringify(b);
    }

    // 统计元素出现次数
    function countElements(arr) {
        const countMap = new Map();
        arr.forEach(item => {
            let found = false;
            // 检查是否已存在相同元素
            for (const [key, value] of countMap.entries()) {
                if (isEqual(key, item)) {
                    countMap.set(key, value + 1);
                    found = true;
                    break;
                }
            }
            if (!found) {
                countMap.set(item, 1);
            }
        });
        return countMap;
    }

    // 获取数组1独有的元素计数
    function getUniqueElements(countMap1, countMap2) {
        const uniqueElements = [];
        for (const [key, count] of countMap1.entries()) {
            let found = false;
            for (const [key2, count2] of countMap2.entries()) {
                if (isEqual(key, key2)) {
                    found = true;
                    // 计算差异数量
                    const diff = count - count2;
                    if (diff > 0) {
                        uniqueElements.push({ element: key, count: diff });
                    }
                    break;
                }
            }
            if (!found) {
                uniqueElements.push({ element: key, count: count });
            }
        }
        return uniqueElements;
    }

    // 主逻辑
    const countMap1 = countElements(arr1);
    const countMap2 = countElements(arr2);

    const uniqueToArr1 = getUniqueElements(countMap1, countMap2);
    const uniqueToArr2 = getUniqueElements(countMap2, countMap1);

    // 计算总非公共元素个数（考虑重复元素）
    const totalUniqueCount = uniqueToArr1.reduce((sum, item) => sum + item.count, 0)
        + uniqueToArr2.reduce((sum, item) => sum + item.count, 0);

    return totalUniqueCount;
}

// 测试用例
console.log(countNonCommonElements([1, 2, 3], [2, 3, 4])); // 2 (1和4)
/**
对于输入：

数组1: [1, 2, 2, 3]
数组2: [2, 3, 3, 4]
正确的非公共元素计算应该是：

数组1独有的元素：
1 出现1次
2 出现2次 - 数组2中2出现1次 = 多出1次
数组2独有的元素：
3 出现2次 - 数组1中3出现1次 = 多出1次
4 出现1次
总非公共元素个数：1 (1) + 1 (2) + 1 (3) + 1 (4) = 4
 */
console.log(countNonCommonElements([1, 2, 2, 3], [2, 3, 3, 4])); // 4 (1, 2, 3, 4)
console.log(countNonCommonElements([], [1, 2, 3])); // 3
console.log(countNonCommonElements([1, 2, 3], [])); // 3
console.log(countNonCommonElements([1, 2, 3], [1, 2, 3])); // 0
console.log(countNonCommonElements(
    [{id: 1}, {id: 2}], 
    [{id: 2}, {id: 3}]
)); // 2 (第一个数组的{id:1}和第二个数组的{id:3})
console.log(countNonCommonElements(
    [{id: 1, name: 'a'}, {id: 1, name: 'b'}], 
    [{id: 1, name: 'a'}, {id: 2, name: 'c'}]
)); // 2 (第一个数组的{id:1,name:'b'}和第二个数组的{id:2,name:'c'})
console.log('=========');

// 优化版本（使用哈希函数处理对象）
function countNonCommonElementsOptimized(arr1, arr2) {
    // 为对象生成哈希键
    function getHashKey(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return String(obj);
        }
        return JSON.stringify(obj);
    }

    // 统计元素出现次数
    function countElements(arr) {
        const countMap = new Map();
        arr.forEach(item => {
            const key = getHashKey(item);
            countMap.set(key, (countMap.get(key) || 0) + 1);
        });
        return countMap;
    }

    const countMap1 = countElements(arr1);
    const countMap2 = countElements(arr2);

    let total = 0;

    // 统计arr1独有的元素
    for (const [key, count] of countMap1.entries()) {
        if (!countMap2.has(key)) {
            total += count;
        } else if (count > countMap2.get(key)) {
            total += count - countMap2.get(key);
        }
    }

    // 统计arr2独有的元素
    for (const [key, count] of countMap2.entries()) {
        if (!countMap1.has(key)) {
            total += count;
        } else if (count > countMap1.get(key)) {
            total += count - countMap1.get(key);
        }
    }

    return total;
}
// 测试用例
console.log(countNonCommonElementsOptimized([1, 2, 3], [2, 3, 4])); // 2 (1和4)
/**
 * 对于输入：

数组1: [1, 2, 2, 3]
数组2: [2, 3, 3, 4]
正确的非公共元素计算应该是：

数组1独有的元素：
1 出现1次
2 出现2次 - 数组2中2出现1次 = 多出1次
数组2独有的元素：
3 出现2次 - 数组1中3出现1次 = 多出1次
4 出现1次
总非公共元素个数：1 (1) + 1 (2) + 1 (3) + 1 (4) = 4
 */
console.log(countNonCommonElementsOptimized([1, 2, 2, 3], [2, 3, 3, 4])); // 4 (1, 2, 3, 4)
console.log(countNonCommonElementsOptimized([], [1, 2, 3])); // 3
console.log(countNonCommonElementsOptimized([1, 2, 3], [])); // 3
console.log(countNonCommonElementsOptimized([1, 2, 3], [1, 2, 3])); // 0
console.log(countNonCommonElementsOptimized(
    [{id: 1}, {id: 2}], 
    [{id: 2}, {id: 3}]
)); // 2 (第一个数组的{id:1}和第二个数组的{id:3})
console.log(countNonCommonElementsOptimized(
    [{id: 1, name: 'a'}, {id: 1, name: 'b'}], 
    [{id: 1, name: 'a'}, {id: 2, name: 'c'}]
)); // 2 (第一个数组的{id:1,name:'b'}和第二个数组的{id:2,name:'c'})
console.log('=========');
