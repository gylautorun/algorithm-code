/**
    Ethan是一个由N名成员组成的团队的领导者。他根据在特定团队成员的任务中发现的错误，为团队中的每个成员分配了一个错误分数。因为错误分数已经增加到一个非常大的值，他希望给所有团队成员一个机会来提高他们的错误分数，
    从而提高他们在组织中的声誉。他引入了一条新规则，即每当团队成员成功完成一个项目时，该成员的错误分数会减少计数P，所有其他得分大于零的团队成员的错误得分会减少计数Q。
    编写一个算法，帮助Ethan找到团队必须完成的最小项目数，以使所有团队成员的错误分数为零。
    输入
    输入的第一行由一个整数errorScore_size组成，表示团队成员的总数（N）。第二行由N个空格分隔的整数errorScore组成，表示团队成员的初始错误分数。第三行由一个整数compP组成，表示成功完成项目的团队成员的错误分数减少的计数（P）。
    最后一行由一个整数-othQ组成，表示错误分数大于零的团队成员的错误分数减少的计数（Q）。
    输出
    打印一个整数，表示团队必须完成的最小项目数，以使所有团队成员的错误分数为零。如果不需要完成任何项目，则打印0
    约束条件
    1<=错误评分大小<=2*10^5
    1<=othQ<=compP<=10^9
    0<=错误分数<=10^9
    笔记
    任何团队成员的错误分数都不能低于零。
    例子
    输入：
    3.
    641
    4.
    1.
    输出：
    3.


    方法思路
    这个问题可以通过贪心算法解决。关键点在于：

    - 每次选择当前错误分数最高的成员完成项目，这样可以最大化减少其他成员的分数
    - 每次操作会减少选中成员的分数P，其他所有分数大于0的成员减少Q
    - 需要计算最少需要多少次这样的操作才能使所有成员的分数归零
 */




function minProjectsToZero(errorScore_size, errorScore, compP, othQ) {
    // 将错误分数数组排序（降序）
    errorScore.sort((a, b) => b - a);
    
    let projects = 0;
    
    while (errorScore[0] > 0) {
        // 找到第一个非零的分数
        let i = 0;
        while (i < errorScore_size && errorScore[i] > 0) {
            // 当前选中的成员减少P，其他减少Q
            if (i === 0) {
                errorScore[i] = Math.max(0, errorScore[i] - compP);
            } else {
                errorScore[i] = Math.max(0, errorScore[i] - othQ);
            }
            i++;
        }
        projects++;
        
        // 重新排序（因为操作可能改变了顺序）
        errorScore.sort((a, b) => b - a);
    }
    
    return projects;
}

// 测试用例
console.log(minProjectsToZero(3, [6, 4, 1], 4, 1)); // 3
console.log(minProjectsToZero(2, [5, 2], 3, 1)); // 2
console.log(minProjectsToZero(4, [10, 5, 5, 0], 6, 2)); // 3
console.log(minProjectsToZero(1, [100], 10, 1)); // 10
console.log(minProjectsToZero(3, [0, 0, 0], 1, 1)); // 0
console.log('=======================');

/**
 * 优化版本（数学计算）
 * @param {*} errorScore_size 
 * @param {*} errorScore 
 * @param {*} compP 
 * @param {*} othQ 
 * @returns 
 */
function minProjectsToZeroOptimized(errorScore_size, errorScore, compP, othQ) {
    errorScore.sort((a, b) => b - a);
    let projects = 0;
    
    while (errorScore[0] > 0) {
        const diff = compP - othQ;
        const max = errorScore[0];
        
        // 计算需要多少次操作才能将当前最大值减到<=0
        const needed = Math.ceil(max / (diff + othQ * errorScore_size));
        
        // 应用这些操作
        for (let i = 0; i < errorScore_size; i++) {
            if (i === 0) {
                errorScore[i] = Math.max(0, errorScore[i] - needed * compP);
            } else {
                errorScore[i] = Math.max(0, errorScore[i] - needed * othQ);
            }
        }
        
        projects += needed;
        errorScore.sort((a, b) => b - a);
    }
    
    return projects;
}
// 测试用例
console.log(minProjectsToZeroOptimized(3, [6, 4, 1], 4, 1)); // 3
console.log(minProjectsToZeroOptimized(2, [5, 2], 3, 1)); // 2
console.log(minProjectsToZeroOptimized(4, [10, 5, 5, 0], 6, 2)); // 3
console.log(minProjectsToZeroOptimized(1, [100], 10, 1)); // 10
console.log(minProjectsToZeroOptimized(3, [0, 0, 0], 1, 1)); // 0
console.log('=======================');