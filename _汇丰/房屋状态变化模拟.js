function simulateHouses(states, days) {
    let currentStates = [...states];
    const n = currentStates.length;
    
    for (let day = 0; day < days; day++) {
        const nextStates = [];
        
        for (let i = 0; i < n; i++) {
            const left = i === 0 ? 0 : currentStates[i - 1];
            const right = i === n - 1 ? 0 : currentStates[i + 1];
            
            if (left === right) {
                nextStates.push(0);
            } else {
                nextStates.push(1);
            }
        }
        
        currentStates = nextStates;
    }
    
    return currentStates;
}

// 从标准输入读取数据
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// let inputLines = [];
// rl.on('line', (line) => {
//     inputLines.push(line.trim());
    
//     if (inputLines.length === 3) {
//         const n = parseInt(inputLines[0]);
//         const states = inputLines[1].split(' ').map(Number);
//         const days = parseInt(inputLines[2]);
        
//         const result = simulateHouses(states, days);
//         console.log(result.join(' '));
//         rl.close();
//     }
// });

// 测试示例1
console.log(simulateHouses([1, 0, 0, 0, 0, 1, 0, 0], 1).join(' ')); 
// 输出: "0 1 0 0 1 0 1 0"

// 测试示例2
console.log(simulateHouses([1, 1, 1, 1, 1, 1, 1, 1], 1).join(' ')); 
// 输出: "1 0 0 0 0 0 0 1"

// 测试示例3
console.log(simulateHouses([0, 1, 0, 1, 0, 1, 0, 1], 2).join(' ')); 
// 第一天: 1 0 0 0 0 0 0 0  变化后的状态
// 输出: "0 1 0 0 0 0 0 0"  第二天基于第一天变化后的状态

// 测试示例4
console.log(simulateHouses([0, 1, 0, 1, 0, 1, 0, 1], 3).join(' ')); 
// 第一天: 1 0 0 0 0 0 0 0  变化后的状态
// 第二天: 0 1 0 0 0 0 0 0  变化后的状态
// 输出: "1 0 1 0 0 0 0 0"  第三天基于第二天变化后的状态