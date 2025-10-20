/**
我们强调提交一个完全可用的代码，而不是部分正确但高效的代码。提交后，您将无法再次查看此问题。您可以使用system.out.println调试代码。如果出现语法/运行时错误，System.out.println（）可能无法工作。目前使用的Java 21版本是21.0.4列表的替代排序由给定列表的替代元素（从第一个位置开始）按升序排序后组成。您会得到一个未排序元素的列表。编写一个算法来找到给定列表的替代排序。
输入
输入的第一行由一个整数大小组成，表示给定列表的大小（N）。第二行由N个空格分隔的整数arro、arr、arrN组成，表示输入列表的元素。
输出
打印空格分隔的整数，表示给定列表中交替排序的元素。
约束条件
0<大小≤106
-10^6≤arri≤10^6
0≤i<大小
例子
输入：
8.
3 5 1 5 9 10 2 6
输出：
1 3 5 9
说明：
排序后，列表为[1,2,3,5,5,6,9,10]
因此，排序列表的替代元素是[1，3，5，9]

方法思路
要实现交替排序（从排序后的数组中每隔一个元素选取一个元素），我们可以：
1. 首先将输入数组进行升序排序
2. 然后从第一个元素开始，每隔一个元素选取一个
3. 返回这些选取的元素组成的新数组

*/

function alternateSort(arr) {
    // 先对数组进行升序排序
    const sorted = [...arr].sort((a, b) => a - b);
    
    // 从第一个元素开始，每隔一个取一个
    const result = [];
    for (let i = 0; i < sorted.length; i += 2) {
        result.push(sorted[i]);
    }
    
    return result;
}

// 测试用例
console.log(alternateSort([3, 5, 1, 5, 9, 10, 2, 6]).join(' ')); // "1 3 5 9"
console.log(alternateSort([1, 2, 3, 4, 5]).join(' ')); // "1 3 5"
console.log(alternateSort([9, 8, 7, 6, 5]).join(' ')); // "5 7 9"
console.log(alternateSort([10]).join(' ')); // "10"
console.log(alternateSort([]).join(' ')); // ""
console.log('==================');


function alternateSortOptimized(arr) {
    arr.sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < arr.length; i += 2) {
        result.push(arr[i]);
    }
    return result;
}

// 测试用例
console.log(alternateSortOptimized([3, 5, 1, 5, 9, 10, 2, 6]).join(' ')); // "1 3 5 9"
console.log(alternateSortOptimized([1, 2, 3, 4, 5]).join(' ')); // "1 3 5"
console.log(alternateSortOptimized([9, 8, 7, 6, 5]).join(' ')); // "5 7 9"
console.log(alternateSortOptimized([10]).join(' ')); // "10"
console.log(alternateSortOptimized([]).join(' ')); // ""
console.log('==================');