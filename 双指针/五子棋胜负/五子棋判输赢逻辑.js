const {GenerateBoard} = require('./生成落子点.js');
/**
 * 五子棋判断胜负
 * 1. 给出棋盘和落子点，判断是否胜利, 这个遍历太冗余了
 * 2. 优化遍历逻辑
 *    - 从落子点向四个方向遍历，直到边界或出现非同色棋子
 *    - 统计连续同色棋子数量，判断是否满足胜利条件
 *    - 优化时间复杂度至O(1)
 *    - 空间复杂度O(1)
 * 3. 边界条件
 *    - 棋盘大小为15x15
 *    - 落子点在棋盘范围内
 *    - 棋子为黑或白
 *    - 胜利条件为连续五子
 *  4. 代码实现
 *    - 遍历四个方向
 *    - 统计连续同色棋子数量
 *    - 判断是否满足胜利条件
 * 5. 测试用例
 *    - 边界条件
 *    - 普通情况
 */

// 棋盘大小
const BOARD_SIZE = 25;
/**
 * 判断有效性
 * @param {*} board 棋盘
 * @param {*} point 落子点
 * @param {*} color 棋子颜色
 */
function isValid(board, point, color) {
    // 棋盘行数量
    const row = board.length;
    // 棋盘列数量
    const col = board[0].length;
    const [x, y] = point;
    // 判断不在棋盘范围内
    if (x < 0 || x >= row || y < 0 || y >= col) {
        return false;
    }
    // 判断是否为同色棋子
    return board[x][y] === color;
}

/**
 * 双指针移动方向, 计算连续棋子数量
 * @param {number} positiveMove 正方向移动
 * @param {number} negativeMove 反方向移动
 * @returns {Function} 判断是否胜利的函数
 */
function moveSteps(board, point, color, move) {
    let _point = point;
    let count = 1;
    while (true) {
        // 正指针移动
        _point = move(_point);
        if (isValid(board, _point, color)) {
            count++;
        }
        else {
            // 无效: 棋盘外或非同色棋子
            break;
        }
    }
    return count;
}


/**
 * 创建一个函数，用于判断给定棋盘上某个位置是否有胜利的可能性。
 *
 * @param {Function} positiveMove - 正指针移动函数，用于定义棋子如何正向移动。
 * @param {Function} negativeMove - 反指针移动函数，用于定义棋子如何反向移动。
 * @returns {Function} - 返回一个函数，用于判断给定棋盘上某个位置是否有胜利的可能性。
 */
function createIsWin(positiveMove, negativeMove) {
    return (board, point, color) => {
        let count = 1;
        // 正指针移动
        count += moveSteps(board, point, color, positiveMove);
        // 反指针移动
        count += moveSteps(board, point, color, negativeMove);
        return count >= 5;
    };
}

/**
 * @param {*Array} board 棋盘
 * @param {*} point 落子点
 * @param {*} color 棋子颜色
 */
// 横向是否胜利
const isHorizontalWin = createIsWin(
    ([x, y]) => [x + 1, y],
    ([x, y]) => [x - 1, y]
);
// 纵向是否胜利
const isVerticalWin = createIsWin(
    ([x, y]) => [x, y + 1],
    ([x, y]) => [x, y - 1]
);
// 左上到右下是否胜利
const isDiagonalWin = createIsWin(
    ([x, y]) => [x + 1, y + 1],
    ([x, y]) => [x - 1, y - 1]
);
// 右上到左下是否胜利
const isAntiDiagonalWin = createIsWin(
    ([x, y]) => [x + 1, y - 1],
    ([x, y]) => [x - 1, y + 1]
);
/**
 * 判断在指定位置下棋后，当前玩家是否获胜
 *
 * @param board 二维数组，表示棋盘状态
 * @param point 对象，包含两个属性：x和y，分别表示行和列的位置
 * @param color 字符串，表示当前玩家的颜色
 * @returns boolean，如果当前玩家获胜返回true，否则返回false
 */
function isWin(board, point, color) {
    // 横向是否胜利
    // 纵向是否胜利
    // 左上到右下是否胜利
    // 右上到左下是否胜利
    return (
        isHorizontalWin(board, point, color) ||
        isVerticalWin(board, point, color) ||
        isDiagonalWin(board, point, color) ||
        isAntiDiagonalWin(board, point, color)
    );
}

const boards = GenerateBoard(BOARD_SIZE);
const color = boards.color;
const board = boards.board;
const points = boards.points[Math.ceil(boards.points.length * Math.random())];
const point = [points.x, points.y];
console.log(point);
console.log(isWin(board, point, color.black));
console.log(isWin(board, point, color.white));


