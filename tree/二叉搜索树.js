const INSERT_RECUSIVE = Symbol('BST#recursiveInsert');
const SEARCH_RECUSIVE = Symbol('BST#recursiveSearch');
const PRE_ORDER_TRAVERSE_RECUSIVE = Symbol('BST#recursivePreOrderTraverse');
const IN_ORDER_TRAVERSE_RECUSIVE = Symbol('BST#recursiveInOrderTraverse');
const POST_ORDER_TRAVERSE_RECUSIVE = Symbol('BST#recursivePostOrderTraverse');
const REMOVE_NODE_RECUSIVE = Symbol('BST#removeNodeRecusive');
const DESTORY_RECUSIVE = Symbol('BST#destoryRecusive');

/**
 * 二叉搜索树
 * @insert
 */
class BST {
    constructor () {
        this.root = null;
        this.count = 0;
        this.Node = function(value) {
            return {
                value,
                count: 1,
                left: null,
                right: null,
            }
        }

        this.CopyNode = function(node) {
            return {
                value: node.value,
                count: node.count,
                left: node.left,
                right: node.right,
            }
        }
    }

    /**
     * 二叉搜索树插入元素
     * @param { Number } value
     */
    insert(value) {
        this.root = this.recursiveInsert(this.root, value);
    }

    /**
     * 二叉树中搜索节点
     * @param { Number } value
     * @return { Boolean }
     */
    search(value) {
        return this.recursiveSearch(this.root, value);
    }

    /**
     * 先序遍历（前序遍历）
     * @param { Function } cb
     */
    preOrderTraverse(cb) {
        return this.recursivePreOrderTraverse(this.root, cb);
    }

    /**
     * 中序遍历
     * @param { Function } cb
     */
    inOrderTraverse(cb) {
        return this.recursiveInOrderTraverse(this.root, cb);
    }

    /**
     * 后序遍历
     * @param { Function } cb
     */
    postOrderTraverse(cb) {
        return this.recursivePostOrderTraverse(this.root, cb);
    }

    /**
     * 删除节点
     * 若删除节点为 n，找到删除节点的后继 s = min(n->right)
     */
    removeNode(value) {
        this.root = this.removeNodeRecusive(this.root, value);
    }

    /**
     * 二叉树销毁，可以利用后续遍历特性实现
     */
    destroy(){
        this.root = this.destoryRecusive(this.root);
    }

    minNode(node) {
        if (node === null) {
            return node;
        }

        while (node && node.left !== null) {
            node = node.left;
        }

        return node;
    }

    /**
     * 求二叉树中最小节点
     * 二叉树定义，一个父亲节点大于自己的左侧节点和小于自己的右侧节点
     * 查找最小值，往二叉树的左侧查找，直到该节点 left 为 null 没有左侧节点，证明其实最小值
     */
    minNodeValue() {
        const result = this.minNode(this.root);

        return result !== null ? result.value : null;
    }

    /**
     * 求二叉树中最大节点
     */
    maxNodeValue() {
        let node = this.root;

        if (node === null) {
            return node;
        }

        while(node && node.right !== null) {
            node = node.right;
        }

        return node.value;
    }
    /**
     * 最大深度
     * 采用递归，如果当前节点为空，返回0，如果不为空，返回 1 + 左右子节点的最大深度
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     *
     * @param {TreeNode} root
     * @return {number}
     */
    maxDepth(root = this.root) {
        if (root === null) {
            return 0;
        }
        else {
            let leftDepth = this.maxDepth(root.left);
            let rightDepth = this.maxDepth(root.right);
            let depth = leftDepth > rightDepth ? leftDepth : rightDepth;
            return depth + 1; // 根节点不为空高度至少为1
        }
    }

    /**
     * 递归插入
     * 插入过程和链表类似，建议先学习链表会更容易理解
     * @param { Object } node
     * @param { Number } value
     */
    recursiveInsert(node, value) {
        // 如果当前节点为空，创建一个新节点（递归到底）
        if (node === null) {
            this.count++; // 节点数加 1
            return new this.Node(value);
        }

        // 节点数不变，说明要更新的值等于二叉树中的某个节点值
        if (value === node.value) {
            node.count++; // 节点数加 1
        } else if (value < node.value) { // 新插入子节点在二叉树左边，继续递归插入
            node.left = this.recursiveInsert(node.left, value);
        } else if (value > node.value) {
            node.right = this.recursiveInsert(node.right, value);
        }

        return node;
    }

    /**
     * 递归搜索
     * @param { Object } node
     * @param { Number } value
     */
    recursiveSearch(node, value) {
        if (node === null) { // 节点为 null
            return false;
        } else if (value === node.value) { // 找到节点
            return true;
        } else if (value < node.value) { // 从左侧节点搜索
            return this.recursiveSearch(node.left, value);
        } else { // 从右侧节点搜索
            return this.recursiveSearch(node.right, value);
        }
    }

    /**
     * 前序遍历递归调用
     * 1. 先访问节点本身（从树的顶端开始）
     * 2. 访问左侧节点
     * 3. 访问右侧节点
     * @param { Object } node
     * @param { Function } cb
     */
    recursivePreOrderTraverse(node, cb) {
        if (node !== null) {
            cb(node.value); // 当前节点的值
            this.recursivePreOrderTraverse(node.left, cb);
            this.recursivePreOrderTraverse(node.right, cb);
        }
    }

    /**
     * 中序遍历递归调用（适用于从小到大排序）
     * 1. 访问左侧节点
     * 2. 取当前树的子节点的值（树的最底端）
     * 3. 访问右侧节点
     * @param { Object } node
     * @param {Function } cb
     */
    recursiveInOrderTraverse(node, cb) {
        if (node !== null) {
            this.recursiveInOrderTraverse(node.left, cb);
            cb(node.value); // 当前节点的值
            this.recursiveInOrderTraverse(node.right, cb);
        }
    }

    /**
     * 后序遍历递归调用
     * 先访问节点的后台节点，再访问节点本身，也就是当节点的左右节点都为 null 时才取节点本身
     * 1. 访问左侧节点
     * 2. 访问右侧节点
     * 3. 取当前节点本身
     * @param {*} node
     * @param {*} cb
     */
    recursivePostOrderTraverse(node, cb) {
        if (node !== null) {
            this.recursivePostOrderTraverse(node.left, cb);
            this.recursivePostOrderTraverse(node.right, cb);
            cb(node.value);
        }
    }

    /**
     * 销毁二叉搜索树递归调用
     * @param { Object } node
     */
    destoryRecusive(node) {
        if (node !== null) {
            this.destoryRecusive(node.left);
            this.destoryRecusive(node.right);

            node = null;
            this.count--;
            return node;
        }
    }

    /**
     * 删除一个节点递归调用
     * @param {*} node
     * @param {*} value
     */
    removeNodeRecusive(node, value) {
        // {1} 未查找到直接返回 null
        if (node === null) {
            return node;
        }

        // {2} 左侧节点递归删除
        if (value < node.value) {
            node.left = this.removeNodeRecusive(node.left, value);
            return node;
        }

        // {3} 右侧节点递归删除
        if (value > node.value) {
            node.right = this.removeNodeRecusive(node.right, value);
            return node;
        }

        // {4} value === node.value 节点找到

        // {4.1} 当前节点即无左侧节点又无右侧节点，直接删除，返回 null
        if (node.left === null && node.right === null) {
            node = null;
            this.count--;
            return node;
        }

        // {4.2} 若左侧节点为 null，就证明它有右侧节点，将当前节点的引用改为右侧节点的引用，返回更新之后的值
        if (node.left === null) {
            node = node.right;
            this.count--;
            return node;
        }

        // {4.3} 若右侧节点为 null，就证明它有左侧节点，将当前节点的引用改为左侧节点的引用，返回更新之后的值
        if (node.right === null) {
            node = node.left;
            this.count--;
            return node;
        }

        // {4.4} 若左侧节点、右侧节点都不为空情况
        // s = min(n->right)
        if (node.left !== null && node.right !== null) {
            // 找到最小节点，切断对象引用，复制一个新对象 s
            const s = new this.CopyNode(this.minNode(node.right));
            this.count++;
            s.left = node.left;
            s.right = this.removeNodeRecusive(node.right, s.value); // 删除最小节点
            node = null;
            this.count--;
            return s; // 返回 s 节点替换掉 node 节点
        }
    }
}

const bST = new BST();

bST.insert(30);
bST.insert(25);
bST.insert(36);
bST.insert(20);
bST.insert(28);
bST.insert(32);
bST.insert(40);

console.dir(bST, { depth: 4 })

// console.log(bST.search(20));
// console.log(bST.search(10));

// function printNode(value) {
//     console.log(value);
// }

// console.log('--------前序遍历----------');
// bST.preOrderTraverse(printNode);
// console.log('--------中序遍历----------');
// bST.inOrderTraverse(printNode);
// console.log('--------后序遍历----------');
// bST.postOrderTraverse(printNode);

bST.removeNode(30);
console.dir(bST, { depth: 4 });
bST.destroy();

console.dir(bST);