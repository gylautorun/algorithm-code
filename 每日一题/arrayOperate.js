// 题目一
// 请实现一个洗牌算法，将一个数组进行乱序

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);


    // 类似解法
    for (let i = 0; i < arr.length; i++) {
        let currentRandom = parseInt(Math.random() * (arr.length - 1));
        [arr[i], arr[currentRandom]] = [arr[currentRandom], arr[i]]
    }

    return arr;
}

let arr = [1, 2, 3, 4, 5, 6, 7]
// 输出乱序之后的数组
console.log(shuffle(arr))
// 输出[1,2,3,4,5,6,7]


// 题目二
// 请实现一个flat方法，将数组拍平，不能使用原生的Array.prototype.flat

let list = [1, [2], [3, [4, [5]]]]

function flat(array = []) {
    //在此处实现代码
    array = array.toString().split(','); // array.join().split(',')
    return array.map(it => +it);

    return array.reduce((result, item) => {
        return result.concat(Array.isArray(item) ? flat(item) : item);
    }, []);

}

console.log(flat(list)) // [1, 2, 3, 4, 5]

// 如下有一个数组，请实现一个函数可以将数组转换成指定的树形数据格式

let objList = [
    {id: 3, parent: 2},
    {id: 1, parent: null},
    {id: 2, parent: 1},
    {id: 4, parent: 1}
]
// 输出结果为
let finalResult = {
    id: 1,
    parent: null,
    children: [{
        children: [{
            id: 3,
            parent: 2
        }],
        id: 2,
        parent: 1
    }, {
        id: 4,
        parent: 1
    }]
}
console.log(toTree(objList))

function toTree(arr) {
    let rootId = undefined
    const obj = {}
    arr.forEach(({id, parent}) => {
        obj[id] = {
            ...(obj[id] || {}),
            id,
            parent
        }
        if (parent) {
            obj[parent] = {
                children: [],
                ...(obj[parent] || {})
            }
            obj[parent].children.push(obj[id])
        } else {
            rootId = id
        }
    })
    return obj[rootId]
}