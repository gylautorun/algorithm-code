const tree = {
    name: 'root',
    children: [
        {
            name: 'c1',
            children: [
                {
                    name: 'c11',
                    children: []
                },
                {
                    name: 'c12',
                    children: []
                }
            ]
        },
        {
            name: 'c2',
            children: [
                {
                    name: 'c21',
                    children: []
                },
                {
                    name: 'c22',
                    children: []
                }
            ]
        }
    ]
}

// 深度优先的方式遍历 打印 name
// ['root', 'c1','c11', 'c12', 'c2', 'c21', 'c22']

// 深度优先的方式遍历
function solve(root) {
    let stack = [],
        result = [];
    if(!root) return [];
    stack.push(root)
    while(stack.length) {
        let node = stack.pop()
        if(node == null ) continue
        result.push(node.name)
        for(let i = node.children.length-1; i >= 0; i--) {
            // 这里就是面试的重点,应该从后面的节点压入栈中
            stack.push(node.children[i])
        }
    }
    return result
}

console.log(solve(tree));