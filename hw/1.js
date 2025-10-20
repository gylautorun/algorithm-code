// 给你一个m x n 的矩阵board ，由若干字符'X' 和'O' ，找到所有被'X' 围绕的区域，并将
// 这些区域里所有的'O' 用'X' 填充。

// [
//   ["X","X","X","X"],
//   ["X","O","O","X"],
//   ["X","X","O","X"],
//   ["X","O","X","X"]
// ]

// [["X","X","X","X"],
// ["X","X","X","X"],
// ["X","X","X","X"],
// ["X","O","X","X"]]
// 说明
// 被围绕的区间不会存在于边界上，换句话说，任何边界上的'O' 都不会被填充为'X' 。
// 任何不在边界上，或不与边界上的'O' 相连的'O' 最终都会被填充为'X' 。如果两个元
// 素在水平或垂直方向相邻，则称它们是“相连”的。

// [["X"]]
// [["X"]]

// 提示
// m == board.length
// n == board[i].length
// 1 <= m, n <= 200
// board[i][j] 为 'X' 或 'O'


function solveFn(board) {
    const m = board.length;
    const n = board[0].length;

    // 'X' => 水
    // 'O' => 陆地

    function dfs(i, j) {
        // 边界
        if (i < 0 || i >= m || j < 0 || j >= n) {
            return;
        }
        // 周围是否有'O', 则变化
        if (board[i][j] === 'O') {
            board[i][j] = 0;
            // 四个方向 dfs
            dfs(i + 1, j);
            dfs(i - 1, j);
            dfs(i, j + 1);
            dfs(i, j - 1);
        }
    }

    // 从外层边界遍历, 内部陆地和外部陆地有连接处理
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 || i === m - 1 || j === 0 || j === n - 1) {
                if (board[i][j] === 'O') {
                    dfs(i, j);
                }
            }
        }
    }
    // [
    //     [ 'X', 'X', 'X', 'X' ],
    //     [ 'X', 'O', 'O', 'X' ],
    //     [ 'X', 'X', 'O', 'X' ],
    //     [ 'X', '0', 'X', 'X' ]
    // ]
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 恢复
            if (board[i][j] === 0) {
                board[i][j] = 'O';
            }
            // 变X
            else if (board[i][j] === 'O') {
                board[i][j] = 'X';
            }
        }
    }

    return board;
}

console.log(solveFn([
    ["X","X","X","X"],
    ["X","O","O","X"],
    ["X","X","O","X"],
    ["X","O","X","X"]
]));