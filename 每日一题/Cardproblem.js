/**
 * 第一题:
 * 有一堆扑克牌，将牌堆第一张放到桌子上，再将接下来的牌堆的第一张放到牌底，如此往复；
 *
 * 最后桌子上的牌顺序为：(牌底) 1,2,3,4,5,6,7,8,9,10,11,12,13 (牌顶)；
 *
 * 问：原来那堆牌的顺序，用函数实现。
 *
 * 预期: [7, 6, 8, 5, 9, 4, 10, 3, 11, 2, 12, 1, 13]
 *
 * @param arr: 桌子上最后牌顺序
 * @return result: 纸牌最初始顺序
 *
 */
function cardOrder(arr) {
    // 当总数为单数时候, 最后牌是牌顶
    // 当总数为双数时候, 最后牌是牌底

    // 中间平分数组 左侧倒着放, 右侧正向放 (一个一个间接来)

    let len = arr.length;
    let point = parseInt(len / 2);

    // left arr.slice(0, point)
    // right arr.slice(point + len % 2) 索引 + 取余
    // center arr.slice(point, point + len % 2)

    let leftArr = arr.slice(0, point);

    return arr.slice(point + len % 2).reduce((result, item, i) => {
        return result.concat(leftArr.pop()).concat(item);
        // return [...result, leftArr.pop(), item];
    }, arr.slice(point, point + len % 2))


}

console.log(cardOrder([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]));
console.log(cardOrder([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]));