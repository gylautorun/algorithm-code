var root = [
    {
        value: 5,
        children:[
            {
                value:4,
                children:[
                    {
                        value:9,
                        children:[
                            {
                                value:11,
                                children:[
                                    {
                                        value:24
                                    },
                                    {
                                        value:32
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                value:16,
                children:[
                    {
                        value:14
                    },
                    {
                        value:13
                    }
                ]
            }
        ]
    },
    {
        value: 15,
        children:[
            {
                value:4,
                children:[
                    {
                        value:9,
                        children:[
                            {
                                value:11,
                                children:[
                                    {
                                        value:24
                                    },
                                    {
                                        value:32
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                value:16,
                children:[
                    {
                        value:14
                    },
                    {
                        value:13
                    }
                ]
            }
        ]
    }
];



// 遍历单个节点
function traverseNode(node){
    console.log('name', node.value);
    return node.name
}

// 递归遍历树
// 作者：张超
function traverseTree(node){
    if (!node) {
        return;
    }

    traverseNode(node);
    if (node.children && node.children.length > 0) {
        var i = 0;
        for (i = 0; i < node.children.length; i++) {
            this.traverseTree(node.children[i]);
        }
    }
}

traverseTree(root);


// 遍历单个节点
function traverseNode2(node){
    console.log('name2', node.value);
    return node.name
}

// 非递归遍历树
// 作者：张超
function traverseTree2(node){
    if (!node) {
        return;
    }

    var stack = [];
    stack.push(node);
    var tmpNode;
    while (stack.length > 0) {
        tmpNode = stack.pop();
        traverseNode2(tmpNode);
        if (tmpNode.children && tmpNode.children.length > 0) {
            var i = tmpNode.children.length - 1;
            for (i = tmpNode.children.length - 1; i >= 0; i--) {
                stack.push(tmpNode.children[i]);
            }
        }
    }
}

traverseTree2(root);