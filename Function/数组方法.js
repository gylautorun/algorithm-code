// 会改变自身的方法
// array.fill(value [,statrt = 0[, end = this.length]]), 将数组中指定区间的所有元素的值，都替换成value, start，end允许为负值，同上
console.log([1, 2, 3, 4].fill('list', 1, 3)); // [ 1, 'list', 'list', 4 ]

// array.pop(): 删除一个数组中的最后一个元素，并且返回这个元素

// array.push(element1, ...elementN): 添加一个或多个元素到数组的末尾，并返回数组新的长度

// array.reverse(): 前后颠倒数组中元素的位置，第一个元素会成为最后一个
let list = [1, 2, 3, 4];
list.reverse();
console.log(list); //[ 4, 3, 2, 1 ]

// array.shift(): 删除数组的第一个元素，并返回这个元素

// array.unshift(element1, ...elementN): 在数组的开头插入一个或多个元素，并返回数组的新长度

// array.sort([function(a, b)]): 对数组的元素做原地的排序，并返回这个数组。sort可能不稳定，默认按照字符串的unicode码位点排序
// 记a和b是两个将要被比较的元素：
//     如果函数function（a， b）返回值小于0， 则a会排在b之前
//     如何函数返回值等于0， 则a和b的相对位置不变（并不被保证）
//     如果函数返回值大于0，则a会排在b之后
//     比较函数输出结果必须稳定，否则排序的结果将是不确定的

// array.splice(start, deleteCount[, item1[, item2...]): 在任意的位置给数组添加或删除任意个元素（拼接），返回被删除的元素组成的数组，没有则返回空数组


// 不会改变自身的方法

// array.concat(value1, value2.....):
// 将传入的数组或非数组值与原数组合并，组成一个新的数组并返回
// 注意：concat方法在拷贝原数组的过程中，
//    对象引用（非对象直接量）：concat方法会复制对象引用放到组合的新数组里，原数组和新数组中的对象引用都指向同一个实际的对象，所以，当实际的对象被修改时，两个数组也同时被修改
//    字符串和数字（是原始值，而不是包装原始值的string和number对象）：concat方法会复制字符串和数字的值放到新数组里

// 一个栗子：
var arr1 = [1, 2, {a: 'test'}]
var arr2 = ['a', 'b', 'c']

var output = arr1.concat(arr2)
console.log(output) // output[2].a == 'test'
setTimeout(function () {
    arr1[2].a = 'has changed'
    console.warn(output)  //output[2].a == 'has changed'
}, 5000)

// 另一个栗子：
var arr1 = [1, 2, 3]
var arr2 = ['a', 'b', 'c']

var output = arr1.concat(arr2)
console.log(output)
setTimeout(function () {
    arr1[2] = 99
    console.warn(output)      //output值并不会改变
}, 5000)

// 将非数组值合并到数组里：
var alpha = ['a', 'b', 'c']
var output = alpha.concat(1, [2, 3]) //['a', 'b', 'c', 1, 2, 3]

// array.includes(searchElement, [, fromIndex])[实验性质，es7，可能会改变或删除]
// 用来判断当前数组是否包含某指定的值，如果是，则返回true，否则false

// array.join([separator = ','])
// 将数组中的所有元素连接成一个字符串(默认用逗号作为分隔符，如果separator是一个空字符串，那么数组中的所有元素将被直接连接)
// 如果元素是undefined或者null，则会转化成空字符串

// array.slice([begin = 0 [, end = this.length - 1]])
// 把数组中一部分的浅复制（shallow copy）存入一个新的数组对象中，并返回这个新的数组
// 不修改原数组，只会返回一个包含了原数组中提取的部分元素的一个新数组
// 具体拷贝规则同concat函数


// array.toString()
// 返回一个字符串，该字符串由数组中的每个元素的toString（）返回值经调用join（）方法连接（由逗号隔开）组成。
// 一个例子：
var arr = ['abc', 2, {a: 'test'}]
console.log(arr.toString())        //'abc,2,[object Object]'

// array.toLocaleString()
// 返回一个字符串表示数组中的元素。数组中的元素将使用各自的toLocaleString方法转化成字符串，这些字符串将使用一个特定语言环境的字符串（例如逗号）隔开

// array.indexOf(searchElement[, fromIndex = 0])
// 返回指定元素能在数组中找到的第一个索引值，否则返回-1
// fromIndex可以为负，表示从倒数第n个开始（此时仍然从前向后查询数组）
// 使用“严格相等”（===）进行匹配
// 一个例子：
var obj = {a: 'test'}
var arr = ['a', 'b', {a: 'test'}]
console.log(arr.indexOf(obj))     //-1

var arr2 = [1, 'b', {a: 'test'}]
console.log(arr2.indexOf('1'))      //-1

// array.lastIndexOf(searchElement[, fromIndex = arr.length - 1])
// 返回指定元素在数组中的最后一个的索引，如果不存在则返回-1， 从数组的后面向前查找

// 遍历方法
// array.forEach((v, i, a) => {})
// 让数组的每一项都执行一次给定的函数
// v表示当前项的值，i表示当前索引，a表示数组本身
// forEach遍历的范围在第一次调用 callback前就会确定。调用forEach后添加到数组中的项不会被 callback访问到。如果已经存在的值被改变，则传递给 callback的值是 forEach遍历到他们那一刻的值。已删除的项不会被遍历到。

// array.entries()
// 返回一个Array Iterator对象，该对象包含数组中每一个索引的键值对
// 一个例子：
var arr = ["a", "b", "c"];
var eArr = arr.entries();

console.log(eArr.next().value); // [0, "a"]
console.log(eArr.next().value); // [1, "b"]
console.log(eArr.next().value); // [2, "c"]

// array.every(callback(v, i, a){})
// callback只会为那些已经被赋值的索引调用，不会为那些被删除或从来没有被赋值的索引调用
// 和forEach函数类似
// 注意：array.every()返回一个布尔值，即对每个元素的callback函数结果作逻辑“&”操作

// array.some()
// 使用方法同上，
// 注意：对每个元素的callback函数结果作逻辑“||”操作

// array.filter((v, i, a) => {})
// 使用指定的函数测试所有元素，并创建一个包含所有测试通过的元素的新数组
// callback函数返回一个布尔值，true即通过测试
// callback只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用
// 不会改变原数组

// array.find((v, i, a) =>{})【有兼容性问题目前】
// 返回数组中满足测试条件的第一个元素，如果没有满足条件的元素，则返回undefined

// array.keys()
// 返回一个数组索引的迭代器（类似于array.entries()方法）

// array.map((v, i, a) => {})
// 返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组
// map 不修改调用它的原数组本身（当然可以在 callback 执行时改变原数组）

// array.reduce(callback[, initialValue])
// 该方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始合并，最终为一个值
// callback参数：
//         previousValue:上一次调用回调返回的值，或者是提供的初始值（initialValue）
//         currentValue: 数组中当前被处理的元素
//         index： index
//         array： 调用的数组
// 如果 initialValue 在调用 reduce 时被提供，那么第一个 previousValue 等于 initialValue ，并且currentValue 等于数组中的第一个值；
// 如果initialValue 未被提供，那么previousValue 等于数组中的第一个值，currentValue等于数组中的第二个值。
// 一个例子
[0, 1, 2, 3, 4, 5].reduce((p, v, i, a) => {
    return p + v
})
//15

// 数组扁平化：
var flattened = [[0, 1], [2, 3], [4, 5]].reduce((a, b) => {
    return a.concat(b)
})
//flattened is [0, 1, 2, 3, 4, 5]

// array.reduceRight()
// 使用同上，与reduce（）的执行方向相反
