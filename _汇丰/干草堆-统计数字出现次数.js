function countOccurrences(needle, haystack) {
    // 将数字转换为字符串以便逐字符比较
    const needleStr = needle.toString();
    const haystackStr = haystack.toString();
    let count = 0;
    
    // 遍历haystack的每个数字
    for (let i = 0; i < haystackStr.length; i++) {
        if (haystackStr[i] === needleStr) {
            count++;
        }
    }
    
    return count;
}

// 从标准输入读取数据（Node.js环境）
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];
rl.on('line', (line) => {
    inputLines.push(line.trim());
    
    // 当读取到两行输入后开始处理
    if (inputLines.length === 2) {
        const needle = parseInt(inputLines[0]);
        const haystack = inputLines[1];
        
        // 检查输入是否有效
        if (isNaN(needle) || needle < 0 || needle > 9) {
            console.log("needle必须是0-9的数字");
            rl.close();
            return;
        }
        
        if (isNaN(haystack) || haystack < 0 || haystack > 99999999) {
            console.log("haystack必须是0-99999999的数字");
            rl.close();
            return;
        }
        
        console.log(countOccurrences(needle, haystack));
        rl.close();
    }
});

// 测试示例
console.log(countOccurrences(2, 123228)); // 输出3
console.log(countOccurrences(0, 102030)); // 输出2
console.log(countOccurrences(9, 99999999)); // 输出8
console.log(countOccurrences(5, 123456789)); // 输出1