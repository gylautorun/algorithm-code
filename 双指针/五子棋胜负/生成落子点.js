
const colorMap = { white: '白', black: '黑' };
function GenerateBoard(size = 25) {
    // 初始化棋盘
    const board = Array.from({ length: size }, () => Array(size).fill(null));
    
    // 落子点集合
    const points = [];
    
    // 随机落子
    for (let i = 0; i < 100; i++) { // 例如，生成100个落子点
        let x = Math.floor(Math.random() * size);
        let y = Math.floor(Math.random() * size);
        let color = Math.random() < 0.5 ? colorMap.black : colorMap.white;
        
        // 确保不重复落子
        if (board[x][y] === null) {
            board[x][y] = color;
            points.push({ x, y, color });
        }
    }
    
    return { board, points, color: colorMap };
}

// 生成测试数据
const data = GenerateBoard(25);
// console.log('棋盘:', data.board);
// console.log('落子点:', data.points);

module.exports = {
    GenerateBoard,
    generateBoardData: data,
};