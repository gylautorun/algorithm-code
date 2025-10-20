// 给定一个 24 小时制（小时:分钟 "HH:MM"）的时间列表，找出列表中任意两个时间的最小时间差并以分钟数表示。

// 示例 1：
// 输入：timePoints = ["23:59","00:00"]
// 输出：1
// 示例 2：
// 输入：timePoints = ["00:00","23:59","00:00"]
// 输出：0

// 提示：
// 2 <= timePoints <= 2 * 104
// timePoints[i] 格式为 "HH:MM"

/**
 * 
 * @param {string[]} timePoints 
 * @return {number}
 */
function findMinDifference(timePoints) {
    const MAX_POINTS_NUM = 24 * 60;
    const len = timePoints.length;
    if (len >= MAX_POINTS_NUM) {
        return 0;
    }

    const getMinutes = (value) => {
        return value.split(':').reduce((res, val, i) => {
            if (i > 0) {
                return res + parseInt(val);
            }
            return parseInt(val) * 60;
        }, 0)
    };
    // 先排序, 不排序比较难搞
    timePoints.sort();
    let result = MAX_POINTS_NUM;
    let first = second = getMinutes(timePoints[0]);
    for (let i = 1; i < len; i++) {
        const n = getMinutes(timePoints[i]);
        result = Math.min(result, n - second);
        second = n;
    }
    result = Math.min(result, first + MAX_POINTS_NUM - second);
    return result;
}