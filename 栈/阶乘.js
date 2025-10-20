const Stack = require('./stack');
function factorial(n) {
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}
console.log(factorial(20));

function factorial(n) {
    const stack = new Stack();
    while (n > 0) {
        stack.push(n--);
    }
    let res = 1;
    while (stack.length() > 0) {
        res *= stack.pop();
    }
    return res;
}
console.log(factorial(20));