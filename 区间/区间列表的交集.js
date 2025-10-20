// 给定两个由一些 闭区间 组成的列表，firstList 和 secondList ，其中 firstList[i] = [starti, endi] 而 secondList[j] = [startj, endj] 。每个区间列表都是成对 不相交 的，并且 已经排序 。
// 返回这 两个区间列表的交集 。
// 形式上，闭区间 [a, b]（其中 a <= b）表示实数 x 的集合，而 a <= x <= b 。
// 两个闭区间的 交集 是一组实数，要么为空集，要么为闭区间。例如，[1, 3] 和 [2, 4] 的交集为 [2, 3] 。

// 示例 1：
// 输入：firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]
// 输出：[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

// 示例 2：
// 输入：firstList = [[1,3],[5,9]], secondList = []
// 输出：[]

// 示例 3：
// 输入：firstList = [], secondList = [[4,8],[10,12]]
// 输出：[]

// 示例 4：
// 输入：firstList = [[1,7]], secondList = [[3,10]]
// 输出：[[3,7]]

// 提示：
// 0 <= firstList.length, secondList.length <= 1000
// firstList.length + secondList.length >= 1
// 0 <= starti < endi <= 109
// endi < starti+1
// 0 <= startj < endj <= 109 
// endj < startj+1

const intervalIntersection = function(firstList, secondList) {
    const m = firstList.length;
    const n = secondList.length;
    if (m * n === 0) {
        return [];
    }

    const result = [];
    let i= 0;
    let j = 0;
    while (i < m && j < n) {
        const [min_m, max_m] = firstList[i];
        const [min_n, max_n] = secondList[j];

        // m 第一个小 数据无交集
        if (max_m < min_n) {
            i++;
        }
        // n 第一个数据小 无交集
        else if (max_n < min_m) {
            j++;
        }
        // 有交集
        else {
            result[result.length] = [
                Math.max(min_m, min_n),
                Math.min(max_m, max_n),
            ];
            // first >= secont 下一个左区间, 有交集
            if (j + 1 < n && max_m >= secondList[j + 1][0]) {
                j++;
            }
            // secont >= first 下一个左区间, 有交集
            else if (i + 1 < m && max_n >= firstList[i + 1][0]) {
                i++;
            }
            // 下一个区间无交集
            else {
                i++;
                j++;
            }
        }
    }

    return result;
};