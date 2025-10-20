function Node(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
}
function BothwayList() {
    this.head = new Node('head');
}
BothwayList.prototype.find = function(value) {
    let currentNode = this.head;
    while (currentNode.value !== value) {
        currentNode = currentNode.next;
    }
    return currentNode;
}
BothwayList.prototype.insert = function(value, target) {
    const node = new Node(value);
    const current = this.find(target);
    node.next = current.next;
    node.previous = current;
    current.next = node;
}
BothwayList.prototype.findLast = function(value) {
    const node = this.head;
    while (node.next !== null) {
        node = node.next;
    }
    return node;
}
BothwayList.prototype.remove = function(value) {
    const current = this.find(value);
    if (current.next !== null) {
        current.previous.next = current.next;
        current.next.previous = current.previous;
        current.next = null;
        current.previous = null;
    }
}

module.exports = exports = BothwayList;