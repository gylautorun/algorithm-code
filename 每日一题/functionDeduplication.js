/**
 *
 * 请按照下面的题目要求实现一个函数去重方法
 *
 *   [123, "meili", "123", "mogu", 123]
 *   =>
 *   [123, "meili", "123", "mogu"]
 *
 *   [123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]
 *   =>
 *   [123, [1, 2, 3], [1, "2", 3], "meili"]
 *
 *   [123, {a: 1}, {a: {b: 1,c:1}}, {a: "1"}, {a: {c: 1, b: 1}}, "meili"]
 *   =>
 *   [123, {a: 1}, {a: {b: 1,c: 1}}, {a: "1"}, "meili"]
 */

// 排除 JSON.stringify 判断, 对象顺序不一样就会判断对象不一样
function deduplication(arr) {

}

function equals(left, right) {
    let prev = left instanceof Object;
    let next = right instanceof Object;
    if (!prev || !next) {
        return left === right;
    }

    if (Object.keys(left).length !== Object.keys(right).length) {
        return false;
    }

    for (let k in left) {
        if (right.hasOwnProperty(k)) {
            if (!equals(left[k], right[k])) {
                return false;
            }
        }
        return false;
    }
    return true;
}


console.log([123, "meili", "123", "mogu", 123]);
console.log([123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]);
console.log([123, {a: 1}, {a: {b: 1, c: 1}}, {a: "1"}, {a: {c: 1, b: 1}}, "meili"]);











