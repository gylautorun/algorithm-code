// 数组扁平化
// 不能使用原生的Array.prototype.flat
// [1, [2], [3, [4, [5]]]] => [1, 2, 3, 4, 5]

let list = [1, [2], [3, [4, [5]]]];

// (toString || join) & split
function flattenString(arr) {
    return arr.toString().split(',').map(item => parseInt(item));
}
function flattenJoin(arr) {
    return arr.join().split(',').map(item => parseInt(item)); // join 默认 ','
}

// reduce
function flattenReduce(arr) {
    return arr.reduce((result, item) => {
        return result.concat(Array.isArray(item) ? flattenReduce(item) : item)
    }, [])
}

// 递归: 递归的遍历每一项，若为数组则继续遍历 && concat, 否则 push
function flatten(arr) {
    let result = [];

    arr.map(item => {
        if (Array.isArray(item)) {
            result = result.concat(flatten(item))
        }
        else {
            result.push(item);
        }
    });

    return result;
}

// ES6 扩展运算符
function flattenES6(arr) {
   while(arr.some(it => Array.isArray(it))) {
       arr = [].concat(...arr);
   }

   return arr;
}

console.log(flattenString(list));
console.log(flattenJoin(list));
console.log(flattenReduce(list));
console.log(flatten(list));
console.log(flattenES6(list));