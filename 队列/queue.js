function Queue() {
    this.queue = [];

}

Queue.prototype.enqueue = function(val) {
    this.queue.push(val);
}
Queue.prototype.length = function(val) {
    return this.queue.length;
}
Queue.prototype.dequeue = function() {
    return this.queue.shift();
}
Queue.prototype.front = function() {
    return this.queue[0];
}
Queue.prototype.back = function() {
    return this.queue[this.length() - 1];
}
Queue.prototype.isEmpty = function() {
    return this.length() === 0;
}
Queue.prototype.toString = function() {
    return this.queue.join('\n');
}


module.exports = exports = Queue;