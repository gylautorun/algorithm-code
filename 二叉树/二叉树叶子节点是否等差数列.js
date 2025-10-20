const root = {
    value: 20,
    left: {
        value: 18,
        left: {
            value: 16,
            left: {
                value: 12,
                left: {
                    value: 4,
                    left: null,
                    right: null
                },
                right: {
                    value: 5,
                    left: null,
                    right: null
                }
            },
            right: {
                value: 13,
                left: {
                    value: 2,
                    left: null,
                    right: null
                },
                right: {
                    value: 3,
                    left: null,
                    right: null
                }
            }
        },
        right: {
            value: 17,
            left: {
                value: 10,
                left: {
                    value: 0,
                    left: null,
                    right: null
                },
                right: {
                    value: 1,
                    left: null,
                    right: null
                }
            },
            right: {
                value: 11,
                left: null,
                right: null
            } 
        }
    },
    right: {
        value: 19,
        left: {
            value: 14,
            left: {
                value: 8,
                left: null,
                right: null
            },
            right: {
                value: 9,
                left: null,
                right: null
            }
        },
        right: {
            value: 15,
            left: {
                value: 6,
                left: null,
                right: null
            },
            right: {
                value: 7,
                left: null,
                right: null
            }
        }
    }
}

const preorderList = [];
const preLeafList = [];
/**
 * 先序
 * 根左右
 * @param {*} node 
 */
function preorder(node) {
    if (node === null) {
        return;
    }
    preorderList.push(node.value);
    // 收集最后叶子节点
    if (node.left === null && node.right === null) {
        preLeafList.push(node.value);
    }
    preorder(node.left);
    preorder(node.right);
}

const inorderList = [];
const inLeafList = [];
/**
 * 中序
 * 左根右
 * @param {*} node 
 */
function inorder(node) {
    if (node === null) {
        return;
    }
    inorder(node.left);
    inorderList.push(node.value);
    // 收集最后叶子节点
    if (node.left === null && node.right === null) {
        inLeafList.push(node.value);
    }
    inorder(node.right);
}

const postorderList = [];
const postLeafList = [];
/**
 * 后序
 * 左右根
 * @param {*} node 
 */
function postorder(node) {
    if (node === null) {
        return;
    }
    postorder(node.left);
    postorder(node.right);
    postorderList.push(node.value);

    // 收集最后叶子节点
    if (node.left === null && node.right === null) {
        postLeafList.push(node.value);
    }
}

preorder(root);
inorder(root);
postorder(root);
console.log({
    preorderList,
    inorderList,
    postorderList,
    preLeafList,
    inLeafList,
    postLeafList
});

//                                           20
//                         18                                    19
//             16                       17             14                  15
//     12             13          10         11    8       9         6          7
//  4      5       2      3   0        1

