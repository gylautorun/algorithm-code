/**
 * 检查玩家是否获胜
 *
 * @param board 游戏棋盘，15x15的二维数组，元素值为玩家颜色或空
 * @param point 当前棋子的坐标
 * @param color 当前棋子的颜色
 * @returns 如果玩家获胜返回true，否则返回false
 */
function checkWinner(board, point, color) {
    const [row, col] = point;
    const rowSize = board.length;
    const colSize = board[0].length;
    // 遍历四个方向
    const directions = [
        [0, 1],  // 水平方向
        [1, 0],  // 垂直方向
        [1, 1],  // 左上到右下
        [1, -1]  // 右上到左下
    ];

    for (const [dx, dy] of directions) {
        let count = 1;
        // 向一个方向遍历
        for (let step = 1; step < 5; step++) {
            const nx = row + step * dx;
            const ny = col + step * dy;
            if (nx >= 0 && nx < rowSize && ny >= 0 && ny < colSize && board[nx][ny] === color) {
                count++;
            } else {
                break;
            }
        }
        for (let step = 1; step < 5; step++) {
            const nx = row - step * dx;
            const ny = col - step * dy;
            if (nx >= 0 && nx < 15 && ny >= 0
                && ny < 15 && board[nx][ny] === color) {
                count++;
            }
            else {
                break;
            }
            if (count >= 5) {
                return true;
            }
        }
    }
}


function generateTestBoard(size = 25) {
    // 初始化棋盘
    const board = Array.from({ length: size }, () => Array(size).fill(null));
    
    // 落子点集合
    const points = [];
    
    // 随机落子
    for (let i = 0; i < 100; i++) { // 例如，生成100个落子点
        let x = Math.floor(Math.random() * size);
        let y = Math.floor(Math.random() * size);
        let color = Math.random() < 0.5 ? '黑' : '白';
        
        // 确保不重复落子
        if (board[x][y] === null) {
            board[x][y] = color;
            points.push({ x, y, color });
        }
    }
    
    return { board, points };
}

// 生成测试数据
const testData = generateTestBoard(25);
console.log('棋盘:', testData.board);
console.log('落子点:', testData.points);
