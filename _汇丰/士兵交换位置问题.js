/**
    有 N个士兵站成一排，编号从 1 到 N，按升序排列。他们要参加一个由Q这动作组成的训练。在第i这动作中，少校喊出S个数字 row：和 coli。位于 row：位置和 col：位置的士兵交换位置；然后位于 （row+1）位置和（col-1）位置的士兵交换位置，以此类推，直到（row；+m）<（col:m）。每个士兵的ID在最多一次动作中，会处于范围 ［rowi,coli］内。
    編写一个算法，找到在所有动作完成后，队伍中第K个位置的士兵的ID

    这个问题描述了一排士兵经过一系列特定交换操作后，找出最终第K个位置的士兵ID。我们需要高效地处理这些交换操作，并跟踪每个位置的最终士兵ID。
 */

/**
 * 找出最终第K个位置的士兵ID
 * @param {number} N - 士兵总数
 * @param {number[][]} operations - 交换操作数组，每个操作是[row, col]
 * @param {number} K - 要查询的位置
 * @return {number} - 最终第K个位置的士兵ID
 */
function findSoldierID_1(N, operations, K) {
    // 初始化士兵数组，索引0不使用，从1到N
    const soldiers = new Array(N + 1);
    for (let i = 1; i <= N; i++) {
        soldiers[i] = i;
    }

    // 处理每个交换操作
    for (const [row, col] of operations) {
        let left = row;
        let right = col;
        
        // 执行对称交换直到中间位置
        while (left < right) {
            // 交换两个位置的士兵
            [soldiers[left], soldiers[right]] = [soldiers[right], soldiers[left]];
            left++;
            right--;
        }
    }

    // 返回第K个位置的士兵ID（注意K是1-based）
    return soldiers[K];
}
function findSoldierID(N, operations, K) {
    let soldiers = Array.from({ length: N }, (_, i) => i + 1); // 初始化士兵排列 [1, 2, ..., N]

    for (const [row, col] of operations) {
        let left = row - 1; // 转换为 0-based 索引
        let right = col - 1;
        
        // 对称交换 [left, right] 区间
        while (left < right) {
            [soldiers[left], soldiers[right]] = [soldiers[right], soldiers[left]]; // 交换
            left++;
            right--;
        }
    }

    return soldiers[K - 1]; // 返回第 K 个位置的士兵（转换为 K - 1 索引）
}

// 测试用例
/**
 * - 1 2 3 4 5
 * - 3 2 1 4 5 [1, 3]
 * - 3 4 1 2 5 [2, 4]
 * - 4
 */
const n_0 = findSoldierID(5, [[1, 3], [2, 4]], 2); // 输出4
/**
 * - 1 2 3 4 5 6 7
 * - 5 4 3 2 1 6 7 [1, 5]
 * - 5 6 1 2 3 4 7 [2, 6]
 * - 1
 */
const n_1 = findSoldierID(7, [[1, 5], [2, 6]], 3); // 输出1
const n_2 = findSoldierID(10, [[2, 8], [3, 7]], 5); // 输出5
const n_3 = findSoldierID(10, [[1, 10]], 7); // 输出4

console.log(n_0, n_1, n_2, n_3);