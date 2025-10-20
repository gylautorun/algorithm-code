/**
 * leetcode: https://leetcode.cn/problems/ZL6zAn/submissions/633305530/
 * @param {*} grid 
 * @returns 
 */
function largestHouseArea(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let maxArea = 0;
    
    // 定义四个方向的移动：上、下、左、右
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    // 深度优先搜索函数
    function dfs(row, col) {
        // 检查边界条件和是否为0
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] !== 1) {
            return 0;
        }
        
        // 标记当前单元格为已访问（设为0）
        grid[row][col] = 0;
        let area = 1; // 当前单元格
        
        // 向四个方向搜索
        for (const [dr, dc] of directions) {
            area += dfs(row + dr, col + dc);
        }
        
        return area;
    }
    
    // 遍历整个网格
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) {
                const currentArea = dfs(i, j);
                maxArea = Math.max(maxArea, currentArea);
            }
        }
    }
    
    return maxArea;
}

// 从标准输入读取数据（Node.js环境）
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];
let rows, cols;
let grid = [];
let currentRow = 0;

rl.on('line', (line) => {
    inputLines.push(line.trim());
    
    // 第一行读取行数和列数
    if (inputLines.length === 1) {
        [rows, cols] = line.trim().split(' ').map(Number);
    }
    // 读取网格数据
    else if (inputLines.length > 1 && inputLines.length <= rows + 1) {
        const rowData = line.trim().split(' ').map(Number);
        grid.push(rowData);
        currentRow++;
        
        // 当读取完所有行后开始处理
        if (currentRow === rows) {
            console.log(largestHouseArea(grid));
            rl.close();
        }
    }
});

// 测试示例1
const grid1 = [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 1]
];
console.log(largestHouseArea(grid1)); // 输出4

// 测试示例2
const grid2 = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1]
];
console.log(largestHouseArea(grid2)); // 输出1

// 测试示例3
const grid3 = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
];
console.log(largestHouseArea(grid3)); // 输出8