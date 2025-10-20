/**
 有一个二维表，里面有数字0 1 9，0代表墙，1代表路，9是终点，有一个人从某个坐标开始移动，判断他是否能到达终点
这个问题类似于 迷宫寻路问题，我们需要判断从起点出发是否能到达终点 9。可以使用 深度优先搜索（DFS） 或 广度优先搜索（BFS） 来解决。
方法思路
1. 输入表示：

    * 二维数组 grid，其中：
        * 0 代表墙（不可通过）
        * 1 代表路（可以通过）
        * 9 代表终点

    * 起点可以是任意 1 或 9 的位置（通常题目会给定起点，如果没有给定，可以假设从 (0, 0) 开始）。

2. 算法选择：

    * BFS（广度优先搜索） 更适合找最短路径，但本题只需要判断是否能到达终点，所以 DFS 或 BFS 均可。
    * 这里使用 BFS，因为它可以更高效地判断连通性，并且避免递归栈溢出。

3. 关键步骤：

    * 从起点出发，逐层遍历所有可达的路径。
    * 遇到 9 时返回 true。
    * 如果队列为空仍未找到 9，则返回 false。

4. 注意事项：

    * 需要记录已访问的位置，避免重复访问。
    * 边界检查：不能越界 grid 的范围。
 */

/**
 * @param {number[][]} grid - 二维数组，包含 0（墙）、1（路）、9（终点）
 * @return {boolean} - 是否能到达终点
 */
function canReachDestination(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) return false;
    
    const rows = grid.length;
    const cols = grid[0].length;
    const visited = new Array(rows).fill().map(() => new Array(cols).fill(false));
    const queue = [];
    
    // 找到起点（假设从 (0,0) 开始，如果题目有给定起点则替换）
    let startX = 0, startY = 0;
    let foundStart = false;
    
    // 如果题目没有给定起点，可以遍历整个 grid 找到第一个 1 或 9
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1 || grid[i][j] === 9) {
                startX = i;
                startY = j;
                foundStart = true;
                break;
            }
        }
        if (foundStart) break;
    }
    
    // 如果没有有效的起点，返回 false
    if (!foundStart) return false;
    
    queue.push([startX, startY]);
    visited[startX][startY] = true;
    
    // 四个方向：上、下、左、右
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    while (queue.length > 0) {
        const [x, y] = queue.shift();
        
        // 到达终点
        if (grid[x][y] === 9) {
            return true;
        }
        
        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            
            // 检查是否越界、是否是墙、是否已访问
            if (
                newX >= 0 && newX < rows &&
                newY >= 0 && newY < cols &&
                grid[newX][newY] !== 0 &&
                !visited[newX][newY]
            ) {
                visited[newX][newY] = true;
                queue.push([newX, newY]);
            }
        }
    }
    
    // 遍历完所有可能路径仍未找到终点
    return false;
}

// 测试用例
const grid1 = [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 9]
];
console.log(canReachDestination(grid1)); // true

const grid2 = [
    [1, 0, 0],
    [1, 0, 0],
    [1, 9, 0]
];
console.log(canReachDestination(grid2)); // true

const grid3 = [
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 9]
];
console.log(canReachDestination(grid3)); // false