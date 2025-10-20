const tree = {
    name: '1',
    children: [
        {
            name: '11',
            children: [
                {
                    name: '111',
                    children: [
                        {
                            name: '1111'
                        },
                        {
                            name: '1112'
                        },
                        {
                            name: '1113'
                        },
                        {
                            name: '1114'
                        }
                    ]
                },
                {
                    name: '112',
                    children: [
                        {
                            name: '1121'
                        },
                        {
                            name: '1122'
                        },
                        {
                            name: '1123'
                        },
                        {
                            name: '1124'
                        }
                    ]
                },
                {
                    name: '113',
                    children: [
                        {
                            name: '1131'
                        },
                        {
                            name: '1132'
                        },
                        {
                            name: '1133'
                        },
                        {
                            name: '1134'
                        }
                    ]
                },
                {
                    name: '114',
                    children: [
                        {
                            name: '1141'
                        },
                        {
                            name: '1142'
                        },
                        {
                            name: '1143'
                        },
                        {
                            name: '1144'
                        }
                    ]
                }
            ]
        },
        {
            name: '12',
            children: [
                {
                    name: '121',
                    children: [
                        {
                            name: '1211',
                        },
                        {
                            name: '1212',
                        },
                        {
                            name: '1213',
                        }
                    ]
                },
                {
                    name: '122',
                    children: [
                        {
                            name: '1221',
                        },
                        {
                            name: '1222',
                        },
                        {
                            name: '1223',
                        }
                    ]
                },
                {
                    name: '123',
                    children: [
                        {
                            name: '1231',
                        },
                        {
                            name: '1232',
                        },
                        {
                            name: '1233',
                        }
                    ]
                }
            ]
        },
        {
            name: '13',
            children: [
                {
                    name: '131',
                    children: [
                        {
                            name: '1311',
                        },
                        {
                            name: '1312',
                        },
                        {
                            name: '1313',
                        }
                    ]
                },
                {
                    name: '132',
                    children: [
                        {
                            name: '1321',
                        },
                        {
                            name: '1322',
                        },
                        {
                            name: '1323',
                        }
                    ]
                }
            ]
        },
        {
            name: '14'
        }
    ]
};

// 递归
function collectNames(root) {
    let result = [];
    const collect = (arr) => {
        arr.forEach((item) => {
            result.push(item.name);
            if (item.children && item.children.length) {
                collect(item.children);
            }
        })
    };
    collect([root]);
    return result;
}
console.log(collectNames(tree));
// collect(item.children) 在 result.push 之前
// ["1111", "1112", "1113", "1114", "111", "1121", "1122", "1123", "1124", "112", "1131", "1132", "1133", "1134", "113", "1141", "1142", "1143", "1144", "114", "11", "1211", "1212", "1213", "121", "1221", "1222", "1223", "122", "1231", "1232", "1233", "123", "12", "1311", "1312", "1313", "131", "1321", "1322", "1323", "132", "13", "14", "1"]
// collect(item.children) 在 result.push 之后
// ["1", "11", "111", "1111", "1112", "1113", "1114", "112", "1121", "1122", "1123", "1124", "113", "1131", "1132", "1133", "1134", "114", "1141", "1142", "1143", "1144", "12", "121", "1211", "1212", "1213", "122", "1221", "1222", "1223", "123", "1231", "1232", "1233", "13", "131", "1311", "1312", "1313", "132", "1321", "1322", "1323", "14"]


// 深度优先
// stack.pop 出战
// 后到前遍历 stack.push 入栈
function collectNames(root) {
    if(!root) return [];

    let result = [];
    let stack = [];

    stack.push(root);

    while (stack.length) {
        let node = stack.pop();

        if (!node) continue;

        result.push(node.name);

        for (let i = (node.children || []).length - 1; i >= 0; i--) {
            stack.push(node.children[i]);
        }

    }

    return result;
}
console.log(collectNames(tree));
// ["1", "11", "111", "1111", "1112", "1113", "1114", "112", "1121", "1122", "1123", "1124", "113", "1131", "1132", "1133", "1134", "114", "1141", "1142", "1143", "1144", "12", "121", "1211", "1212", "1213", "122", "1221", "1222", "1223", "123", "1231", "1232", "1233", "13", "131", "1311", "1312", "1313", "132", "1321", "1322", "1323", "14"]

// 思路：跟深度优先遍历类似。
// 区别在于子节点不先执行遍历操作，而是先把所有的子节点放入队列 => 收集完成后，
// 利用while循环取出队列中的子节点，执行getName，继续把下一级的子节点放入队列 => 直到队列为空，则返回结果
// 广度优先
// stack.shift 出战
// 前到后遍历 stack.push 入栈
function collectNames(root) {
    if(!root) return [];

    let result = [];
    let stack = [];

    stack.push(root);

    while (stack.length) {
        let node = stack.shift();

        if (!node) continue;

        result.push(node.name);

        (node.children || []).forEach(item => stack.push(item));

    }

    return result;
}
console.log(collectNames(tree));

// ["1", "11", "12", "13", "14", "111", "112", "113", "114", "121", "122", "123", "131", "132", "1111", "1112", "1113", "1114", "1121", "1122", "1123", "1124", "1131", "1132", "1133", "1134", "1141", "1142", "1143", "1144", "1211", "1212", "1213", "1221", "1222", "1223", "1231", "1232", "1233", "1311", "1312", "1313", "1321", "1322", "1323"]
// 广度优先
function collectNames(root) {
    const result = []; // 利用闭包保存结果
    const stack = []; // 存放子节点的队列
    // 处理子节点的函数
    function getName(node) {
        (node.children || []).forEach(item => {
            result.push(item.name);

            if (item.children) {
                stack.push(item);
            }
        });
    }
    result.push(root.name);
    getName(root);
    // 队列中有节点则继续执行
    while (stack.length) {
        let current = stack.shift();
        getName(current);
    }
    return result;
}

console.log(collectNames(tree));
// ["11", "12", "13", "14", "111", "112", "113", "114", "121", "122", "123", "131", "132", "1111", "1112", "1113", "1114", "1121", "1122", "1123", "1124", "1131", "1132", "1133", "1134", "1141", "1142", "1143", "1144", "1211", "1212", "1213", "1221", "1222", "1223", "1231", "1232", "1233", "1311", "1312", "1313", "1321", "1322", "1323"]

