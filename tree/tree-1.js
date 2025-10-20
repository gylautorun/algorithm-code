
function BinaryTree(){
    var root = null; //根节点默认为null
    //节点类型的构造函数
    function Node(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }
    //插入方法
    this.insert = function(key){
        var newNode = new Node(key);
        if(root === null){
            root = newNode;
        }else{
            insertNode(root,newNode)
        }
    }
    var insertNode = function(node,newNode){
        if(newNode.key < node.key){
            if(node.left === null){
                node.left = newNode;
            }else{
                insertNode(node.left,newNode)
            }
        }else{
            if(newNode.key > node.key){
                if(node.right === null){
                    node.right = newNode;
                }else{
                    insertNode(node.right,newNode)
                }
            }
        }
    }

    /*--------------------------------------------------------*/
    /*
        前序遍历： 根节点 => 左子树 => 右子树
    */
    this.preTravel = function(callback){
        //和上面插入操作类似，都用一个内部的函数来实现具体的逻辑，因为需要使用root
        preTravelNode(root,callback);
    }
    /*
        逻辑：
            1. 判断传入的节点是否为null，如果为null就直接return
            2. 如果不为null，则继续对该节点下的left和right进行递归调用
            3. 具体的调用顺序根据为 根节点 => 左子树 => 右子树
    */
    function preTravelNode(node,callback){
        if(node !== null){
            callback(node.key);
            preTravelNode(node.left,callback);
            preTravelNode(node.right,callback);
        }
    }

    //中序遍历
    this.middleTravel = function(callback){
        middleTravelNode(root,callback);
    }
    function middleTravelNode(node,callback){
        if(node !== null){
            middleTravelNode(node.left,callback);
            callback(node.key);
            middleTravelNode(node.right,callback);
        }
    }

    //后续遍历
    this.nextTravel = function(callback){
        nextTravelNode(root,callback);
    }
    function nextTravelNode(node,callback){
        if(node !== null){
            nextTravelNode(node.left,callback);
            nextTravelNode(node.right,callback);
            callback(node.key);
        }
    }
}

var nodes = [8,7,3,4,6,5,2,9,12]
var binaryTree = new BinaryTree();
nodes.forEach((item)=>{
    binaryTree.insert(item)
})
//测试前序遍历
binaryTree.beforeTravel((key)=>{
    console.log(key) // 8,7,3,2,4,6,5,9,10
})
console.log('--------------------')
//中序遍历
binaryTree.middleTravel((key)=>{
    console.log(key) // 2,3,4,5,6,7,8,9,10
})
console.log('--------------------')
//后续遍历
binaryTree.nextTravel((key)=>{
    console.log(key) // 2,5,6,4,3,7,10,9,8
})
