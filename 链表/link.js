function Node(value) {
    this.value = value;
    this.next = null;
}
function List() {
    this.head = new Node('head');
}
List.prototype.find = function(value) {
    let currentNode = this.head;
    while (currentNode.value !== value) {
        currentNode = currentNode.next;
    }
    return currentNode;
}
List.prototype.insert = function(value, target) {
    const node = new Node(value);
    const current = this.find(target);
    node.next = current.next;
    current.next = node;
}
List.prototype.findPrevious = function(value) {
    let currentNode = this.head;
    while (currentNode.next.value !== value && currentNode.next !== null) {
        currentNode = currentNode.next;
    }
    return currentNode;
}
List.prototype.remove = function(value) {
    const prevNode = this.findPrevious(value);
    if (prevNode.next !== null) {
        prevNode.next = prevNode.next.next;
    }
}

module.exports = exports = List;