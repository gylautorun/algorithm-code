class binaryTree {

    constructor () {
        this.root = null;
        // 节点构造函数
        this.Node = function(value) {
            return {
                key: value,
                left: null,
                right: null,
            }
        }
    }

    // 插入方法
    insert = (key) => {
        let newNode = this.Node(key);
        if (this.root === null) {
            return this.root = newNode;
        }

        return this.insertNode(this.root, newNode)
    }
    insertNode = (node, newNode) => {
        if (node.key < newNode.key) {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode)
            }
        }
        else {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode)
            }
        }
    }

    // 前序遍历： 根节点 => 左子树 => 右子树
    // 可以用来构建文件的目录结构，输出所有目录并分层
    preTravel = (callback) => {
        this.preTravelNode(this.root, callback);
    }
    preTravelNode = (node, callback) => {
        if (node !== null) {
            callback(node.key);
            this.preTravelNode(node.left, callback);
            this.preTravelNode(node.right, callback);
        }
    }

    // 中序遍历: 左子树 => 根节点 => 右子树
    // 可以进行排序，输出的结果是一个递增的序列
    middleTravel = (callback) => {
        this.middleTravelNode(this.root, callback);
    }
    middleTravelNode = (node, callback) => {
        if (node !== null) {
            this.middleTravelNode(node.left, callback);
            callback(node.key);
            this.middleTravelNode(node.right, callback);
        }
    }

    // 后续遍历: 左子树 => 右子树 => 根节点
    // 后续遍历是先遍历子树，最后到根节点，可以实现统计节点数、计算文件夹大小的功能
    nextTravel = (callback) => {
        this.nextTravelNode(this.root, callback);
    }
    nextTravelNode = (node, callback) => {
        if (node !== null) {
            this.nextTravelNode(node.left, callback);
            this.nextTravelNode(node.right, callback);
            callback(node.key);
        }
    }
}

let nodes = [8,7,3,4,6,5,2,9,12];
let binary = new binaryTree();
nodes.forEach((item)=>{
    binary.insert(item)
});
//测试前序遍历
binary.preTravel((key)=>{
    console.log(key) // 8,7,3,2,4,6,5,9,12
});
console.log('--------------------')
//中序遍历
binary.middleTravel((key)=>{
    console.log(key) // 2,3,4,5,6,7,8,9,12
});
console.log('--------------------')
//后续遍历
binary.nextTravel((key)=>{
    console.log(key) // 2,5,6,4,3,7,12,9,8
});