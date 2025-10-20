// 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
// 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
// 此外，你可以假设该网格的四条边均被水包围

// 分析:
// 某个构成岛屿条件是相链接的陆地都会沉没, 直至遇到水时候阻隔沉没
// 沉没的陆地相连接的也会促使沉没

const numIslands = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    let count = 0;
    const sink = (i, j) => {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') {
            return;
        }
        grid[i][j] = '0';
        sink(grid, i, j + 1);
        sink(grid, i, j - 1);
        sink(grid, i + 1, j);
        sink(grid, i - 1, j);
    };
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                count++;
                sink(i, j);
            }
        }
    }
    return count;
};

const numIslands = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    let count = 0;
    const queue = [];
    const sink = (queue, gird) => {
        const arr = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        while (queue.length) {
            const cur = queue.shift();
            for (const v of arr) {
                const i = cur[0] + v[0];
                const j = cur[1] + v[1];
                if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') {
                    continue;
                }
                grid[i][j] = '0';
                queue.push([i, j])
            }
        }
    };
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                count++;
                grid[i][j] = '0';
                queue.push([i, j])
                sink(queue, grid);
            }
        }
    }
    return count;
};
