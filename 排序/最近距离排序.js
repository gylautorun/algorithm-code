/**
 * 根据 target 距离, 为数组排序出离 target 最近的元素排序, 近的在前
 * @param {{name: string, value: number}[]} arr: 数组
 * @param {{name: string, value: number}} target: 目标值
 */
function sortByDistance(arr, target) {
    /**
     * 比较两个对象值与目标值之间的差的绝对值大小
     *
     * @param obj 对象a
     * @param tar 目标对象target
     * @returns 返回对象a与目标对象target之间差的绝对值减去对象b与目标对象target之间差的绝对值的结果
     */
    function compare(obj, tar) {
        return Math.abs(obj.value - tar.value);
    }
    // return arr.sort((a, b) => compare(a, target) - compare(b, target));
    return arr
        .map(item => ({...item, distance: compare(item, target)}))
        .sort((a, b) => a.distance - b.distance);
}





const info = {
    name: '张三',
    value: 700,
}
const list = [
    {
        name: '邓华',
        value: 500,
    },
    {
        name: '李四',
        value: 300,
    },
    {
        name: '王五',
        value: 1000,
    },
    {
        name: '赵六',
        value: 1500,
    },
    {
        name: '孙七',
        value: 701,
    },
    {
        name: '周八',
        value: 705,
    },
    {
        name: '吴九',
        value: 698,
    },
    {
        name: '郑十',
        value: 802,
    },
    {
        name: '冯一',
        value: 603,
    },
];

const res = sortByDistance(list, info);
console.log(res);