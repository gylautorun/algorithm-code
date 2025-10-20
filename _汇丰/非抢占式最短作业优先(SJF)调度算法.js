// function calculateAverageWaitTime(n, arrivalTimes, burstTimes) {
//     // 创建任务数组，每个任务包含到达时间和持续时间
//     const tasks = [];
//     for (let i = 0; i < n; i++) {
//         tasks.push({
//             arrival: arrivalTimes[i],
//             burst: burstTimes[i],
//             index: i
//         });
//     }

//     // 按照到达时间排序
//     tasks.sort((a, b) => a.arrival - b.arrival);

//     let currentTime = 0;
//     let totalWaitTime = 0;
//     const completed = new Array(n).fill(false);

//     for (let i = 0; i < n; i++) {
//         // 找到所有已到达且未完成的任务
//         const availableTasks = [];
//         for (let j = 0; j < n; j++) {
//             if (!completed[j] && tasks[j].arrival <= currentTime) {
//                 availableTasks.push(tasks[j]);
//             }
//         }

//         // 如果没有任务到达，推进时间到下一个任务的到达时间
//         if (availableTasks.length === 0) {
//             currentTime = tasks.find(task => !completed[task.index]).arrival;
//             i--; // 重新尝试
//             continue;
//         }

//         // 选择持续时间最短的任务（如果相同，选择到达时间最早的）
//         availableTasks.sort((a, b) => {
//             if (a.burst !== b.burst) {
//                 return a.burst - b.burst;
//             }
//             return a.arrival - b.arrival;
//         });

//         const selectedTask = availableTasks[0];
//         const waitTime = currentTime - selectedTask.arrival;
//         totalWaitTime += waitTime;

//         // 更新当前时间和标记任务为已完成
//         currentTime += selectedTask.burst;
//         completed[selectedTask.index] = true;
//     }

//     // 计算平均等待时间
//     const averageWaitTime = totalWaitTime / n;
//     return averageWaitTime.toFixed(2);
// }

// // 从标准输入读取数据
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// let inputLines = [];
// let n;
// let arrivalTimes = [];
// let burstTimes = [];

// rl.on('line', (line) => {
//     inputLines.push(line.trim());
    
//     if (inputLines.length === 1) {
//         n = parseInt(inputLines[0]);
//     } else if (inputLines.length === 2) {
//         arrivalTimes = inputLines[1].split(' ').map(Number);
//     } else if (inputLines.length === 3) {
//         // 忽略第三行的n，因为题目描述可能有误
//     } else if (inputLines.length === 4) {
//         burstTimes = inputLines[3].split(' ').map(Number);
//         const avgWaitTime = calculateAverageWaitTime(n, arrivalTimes, burstTimes);
//         console.log(avgWaitTime);
//         rl.close();
//     }
// });

// // 测试用例1
// console.log(calculateAverageWaitTime(
//     4, 
//     [0, 1, 2, 3], 
//     [5, 3, 8, 6]
// )); // 预期输出: "4.50"

// // 测试用例2
// console.log(calculateAverageWaitTime(
//     3,
//     [0, 1, 2],
//     [3, 5, 2]
// )); // 预期输出: "1.33"

// // 测试用例3
// console.log(calculateAverageWaitTime(
//     5,
//     [0, 2, 4, 5, 7],
//     [3, 4, 2, 1, 5]
// )); // 预期输出: "3.40"


function calculateAverageWaitTime0(n, arrivalTimes, burstTimes) {
    // 创建任务数组，每个任务包含到达时间、持续时间和原始索引
    const tasks = [];
    for (let i = 0; i < n; i++) {
        tasks.push({
            arrival: arrivalTimes[i],
            burst: burstTimes[i],
            index: i,
            completed: false
        });
    }

    let currentTime = 0;
    let totalWaitTime = 0;
    let completedCount = 0;

    while (completedCount < n) {
        // 找到所有已到达且未完成的任务
        const availableTasks = tasks.filter(
            task => !task.completed && task.arrival <= currentTime
        );

        if (availableTasks.length === 0) {
            // 如果没有任务到达，推进时间到下一个最早到达的任务
            const nextArrival = Math.min(
                ...tasks.filter(task => !task.completed).map(task => task.arrival)
            );
            currentTime = nextArrival;
            continue;
        }

        // 选择持续时间最短的任务（如果相同，选择到达时间最早的）
        availableTasks.sort((a, b) => {
            if (a.burst !== b.burst) return a.burst - b.burst;
            return a.arrival - b.arrival;
        });

        const selectedTask = availableTasks[0];
        const waitTime = currentTime - selectedTask.arrival;
        totalWaitTime += waitTime;

        // 更新当前时间和标记任务为已完成
        currentTime += selectedTask.burst;
        selectedTask.completed = true;
        completedCount++;
    }

    // 计算平均等待时间并保留两位小数
    const averageWaitTime = totalWaitTime / n;
    return averageWaitTime.toFixed(2);
}
function calculateAverageWaitTime(n, arrivalTimes, burstTimes) {
    // 读取输入数据（假设已通过某种方式获取）
    // const n = parseInt(readline()); // 任务数量
    // const arrivalTimes = readline().split(' ').map(Number); // 请求时间数组
    // const _n = parseInt(readline()); // 再次确认任务数量
    // const burstTimes = readline().split(' ').map(Number); // 持续时间数组
  
    // 创建任务队列（按请求时间排序，题目已保证）
    const tasks = [];
    for (let i = 0; i < n; i++) {
      tasks.push({
        id: i,
        arrival: arrivalTimes[i],
        burst: burstTimes[i],
        remaining: burstTimes[i]
      });
    }
  
    let currentTime = 0;
    let totalWaitTime = 0;
    const completedTasks = [];
  
    while (completedTasks.length < n) {
      // 找出当前可执行的任务（已到达且未完成）
      const availableTasks = tasks.filter(
        t => t.arrival <= currentTime && !completedTasks.includes(t.id)
      );
  
      if (availableTasks.length === 0) {
        currentTime++; // CPU空闲
        continue;
      }
  
      // 选择持续时间最短的任务（持续时间相同时选最早到达的）
      const nextTask = availableTasks.reduce((prev, curr) => 
        (curr.burst < prev.burst || 
         (curr.burst === prev.burst && curr.arrival < prev.arrival)) ? curr : prev
      );
  
      // 计算等待时间并执行
      const waitTime = currentTime - nextTask.arrival;
      totalWaitTime += waitTime;
      currentTime += nextTask.burst;
      completedTasks.push(nextTask.id);
    }
  
    // 计算平均等待时间（保留2位小数）
    const avgWaitTime = (totalWaitTime / n).toFixed(2);
    return avgWaitTime;
  }
// 测试用例
function test() {
    // 测试用例1
    let result1 = calculateAverageWaitTime(
        4, 
        [0, 1, 2, 3], 
        [5, 3, 8, 6]
    );
    console.log("测试用例1:", result1, "预期: 4.50");

    // 测试用例2
    let result2 = calculateAverageWaitTime(
        3,
        [0, 1, 2],
        [3, 5, 2]
    );
    console.log("测试用例2:", result2, "预期: 1.33");

    // 测试用例3
    let result3 = calculateAverageWaitTime(
        5,
        [0, 2, 4, 5, 7],
        [3, 4, 2, 1, 5]
    );
    console.log("测试用例3:", result3, "预期: 3.40");

    // 测试用例4 - 所有任务同时到达
    let result4 = calculateAverageWaitTime(
        3,
        [0, 0, 0],
        [3, 1, 2]
    );
    console.log("测试用例4:", result4, "预期: 1.00");

    // 测试用例5 - 任务按到达时间顺序执行
    let result5 = calculateAverageWaitTime(
        3,
        [0, 5, 10],
        [3, 3, 3]
    );
    console.log("测试用例5:", result5, "预期: 0.00");
}

test();