const obj = {};

const FnA = function() {}

const a = new FnA();

console.log(obj.__proto__);
console.log(a.__proto__);