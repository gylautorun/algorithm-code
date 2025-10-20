function Stack() {
    this.stack = [];
    this.top = 0;
}
Stack.prototype.push = function(val) {
    this.stack[this.top++] = val;
}
Stack.prototype.clear = function() {
    this.top = 0;
    this.stack = [];
}
Stack.prototype.length = function(val) {
    return this.top;
}
Stack.prototype.pop = function() {
    return this.stack[--this.top];
}
Stack.prototype.shift = function() {
    this.top = 0;
    return this.stack.shift();
}
Stack.prototype.peek = function() {
    return this.stack[this.top - 1];
}

module.exports = exports = Stack;