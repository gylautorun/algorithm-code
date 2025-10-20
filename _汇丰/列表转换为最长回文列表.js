function makePalindrome0(arr) {
    let left = 0;
    let right = arr.length - 1;
    let result = [];
    
    while (left <= right) {
        if (arr[left] === arr[right]) {
            result.push(arr[left]);
            left++;
            right--;
        } else if (arr[left] < arr[right]) {
            arr[left + 1] += arr[left];
            left++;
        } else {
            arr[right - 1] += arr[right];
            right--;
        }
    }
    
    // 构建完整的回文列表
    const palindrome = [...result];
    if (left > right) {
        // 如果是奇数长度，去掉最后一个重复元素
        palindrome.pop();
    }
    return [...palindrome, ...result.reverse()].join(' ');
}

// // 从标准输入读取数据（Node.js环境）
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// let inputLines = [];
// let num;
// let arr;

// rl.on('line', (line) => {
//     inputLines.push(line.trim());
    
//     if (inputLines.length === 1) {
//         num = parseInt(inputLines[0]);
//     } else if (inputLines.length === 2) {
//         arr = inputLines[1].split(' ').map(Number);
//         console.log(makePalindrome(arr));
//         rl.close();
//     }
// });

// 测试示例1
console.log(makePalindrome0([15, 10, 15, 34, 25, 15])); // 输出 "15 25 34 25 15"

// 测试示例2
console.log(makePalindrome0([1, 2, 3, 4, 5])); // 输出 "1 2 3 2 1"

// 测试示例3
console.log(makePalindrome0([10, 20, 30, 20, 10])); // 输出 "10 20 30 20 10"




function makePalindrome(arr) {
    let left = 0;
    let right = arr.length - 1;
    const result = [];

    while (left <= right) {
        if (arr[left] === arr[right]) {
            result.push(arr[left]);
            left++;
            right--;
        } else if (arr[left] < arr[right]) {
            arr[left + 1] += arr[left];
            left++;
        } else {
            arr[right - 1] += arr[right];
            right--;
        }
    }

    // 构建完整回文（前半部分 + 镜像部分）
    const mirrored = left > right 
        ? result.slice(0, -1).reverse() 
        : result.slice().reverse();
    return result.concat(mirrored).join(' ');
}

// 测试用例1 - 示例输入
console.log(makePalindrome([15, 10, 15, 34, 25, 15])); 
// 正确输出: "15 25 34 25 15"

// 测试用例2 - 简单情况
console.log(makePalindrome([1, 2, 1])); 
// 正确输出: "1 2 1"

// 测试用例3 - 需要多次合并
console.log(makePalindrome([1, 2, 3, 4, 5])); 
// 正确输出: "1 2 3 2 1"

// 测试用例4 - 已经是回文
console.log(makePalindrome([10, 20, 30, 20, 10])); 
// 正确输出: "10 20 30 20 10"

// 测试用例5 - 所有元素相同
console.log(makePalindrome([5, 5, 5, 5])); 
// 正确输出: "5 5 5 5"