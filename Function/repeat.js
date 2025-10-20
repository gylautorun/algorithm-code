let cont = 'abc|';
// function repeat1(str, count) {
//     console.time('start1')
//     let result = str;
//     let total = '';
//     while (count > 0) {
//         if (count % 2 === 1) {
//             total += result;
//         }
//         if (count === 1) {
//             break;
//         }
//         result += result;
//         count = count >> 1 //count / 2;
//     }
//     console.timeEnd('start1');
//     return total;
// }
//
// repeat1(cont, 1000); // 0.057ms
//
// function repeat2(str, count) {
//     console.time('start2')
//     let result = str;
//     for (let i = 0; i < count; i++) {
//         result += str;
//     }
//     console.timeEnd('start2');
//     return result;
// }
//
// repeat2(cont, 1000) // 0.075ms

// 分开运行
// function repeat(str, count) {
//     return (count > 0) ? str.concat(repeat(str, --count)) : '';
// }
// function repeat(str, count) {
//     return (count > 0) ? str + repeat(str, count - 1) : '';
//
// }
function repeat(str, count) {
    if (count <= 0) return '';
    if (count === 1) return str;
    return repeat(str, --count);
}
console.time('start')
// repeat(cont, 1000000000000)

function factorial2 (n, total = 1) {
    // if (n <= 1) return 1
    // return n * factorial2(n - 1); // Maximum call stack size exceeded

    if (n <= 1) return total
    return factorial2(n - 1, total * n)
}
console.log(factorial2(500000, 1)) // 6

function fib(n) {
    if (n === 1 || n === 2) return n - 1;
    return fib(n - 1) + fib(n - 2)
}
// console.log(fib(100)); // 34

console.timeEnd('start')


