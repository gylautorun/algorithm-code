/**
 * http://39.106.197.44/views/LeetCode/3.html#%E8%87%AA%E6%88%91%E5%8F%8D%E7%9C%81
 * 在一个字符串数组中有红、黄、蓝三种颜色的球，且个数不相等、顺序不一致，
 * 请为该数组排序。使得排序后数组中球的顺序为:黄、红、蓝。
 *
 * 例如：红蓝蓝黄红黄蓝红红黄红，排序后为：黄黄黄红红红红红蓝蓝蓝。
 *
 */

let temp = '红蓝蓝黄红黄蓝红红黄红';
function ballSort(str){
    return ['黄','红','蓝'].map(v=>str.replace(new RegExp(`[^${v}]`,'g'),'')).join('')
}

console.log(ballSort(temp));

