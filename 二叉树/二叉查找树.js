function Node(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
}
Node.prototype.show = function() {
    return this.value;
}
function BST() {
    this.root = null;
}
// 插入
BST.prototype.insert = function(value) {
    const node = new Node(value);
    if (this.root === null) {
        this.root = node;
    }
    else {
        let current = this.root;
        while (true) {
            if (value < current.show()) {
                if (current.left === null) {
                    current.left = node;
                    break;
                }
                current = current.left;
            }
            else {
                if (current.right === null) {
                    current.right = node;
                    break;
                }
                current = current.right;
            }
        }
    }
}
// 中序遍历
BST.prototype.inOrder = function(node) {
    if (node !== null) {
        this.inOrder(node.left);
        console.log('inOrder', node.show());
        this.inOrder(node.right);
    }
}
// 先序遍历
BST.prototype.prevOrder = function(node) {
    if (node !== null) {
        console.log('prevOrder', node.show());
        this.prevOrder(node.left);
        this.prevOrder(node.right);
    }
}
// 后序遍历
BST.prototype.postOrder = function(node) {
    if (node !== null) {
        this.postOrder(node.left);
        this.postOrder(node.right);
        console.log('postOrder', node.show());
    }
}
// 深度优先遍历
BST.prototype.depthOrder = function(node) {
    if (node !== null) {
        const stack = [node];
        if (stack.length) {
            const value = stack.pop();
            if (value.right) {
                stack.push(value.right);
            }
            if (value.left) {
                stack.push(value.left);
            }
            console.log('depthOrder', node.show());
        }
    }
}
// 广度优先遍历
BST.prototype.breadthOrder = function(node) {
    if (node !== null) {
        const stack = [node];
        if (stack.length) {
            const value = stack.unshift();
            if (value.left) {
                stack.push(value.left);
            }
            if (value.right) {
                stack.push(value.right);
            }
            console.log('breadthOrder', node.show());
        }
    }
}
// 查找最小值
BST.prototype.getMin = function() {
    let current = this.root;
    while (current.left !== null) {
        current = current.left;
    }
    return current.show();
}
// 查找最大值
BST.prototype.getMax = function() {
    let current = this.root;
    while (current.right !== null) {
        current = current.right;
    }
    return current.show();
}
// 查找值
BST.prototype.find = function(value) {
    let current = this.root;
    while (current !== null) {
        if (current.show() === value) {
            return current;
        }
        else if (value < current.show()) {
            current = current.left;
        }
        else {
            current = current.right;
        }
    }
    return null;
}

// 创建树
const createTree = function(nums) {
    const tree = new BST();
    nums.forEach(num => tree.insert(num));
    return tree;
}
console.log(createTree([3,5,8,22,34,56,78,32,43,55,66,88,77,9]));







