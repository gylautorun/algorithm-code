exports = {a: 1};
exports.b = 2;

// module.exports = exports;
// exports = 3;
const obj = {
    n: 1,
    add() {
        console.log(this === global);
        this.n++;
    }
}
const {n,add} = obj;

console.log(n);
add();
console.log(n);