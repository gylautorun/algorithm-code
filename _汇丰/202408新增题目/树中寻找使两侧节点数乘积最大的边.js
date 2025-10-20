/**
    在一棵树中找到一条边，使得其两侧节点数的乘积最大
    方法思路
    要找到树中一条边，使得删除该边后两侧子树节点数的乘积最大，我们可以：
    1. 使用深度优先搜索（DFS）遍历树
    2. 计算每个节点的子树大小（包含该节点的子树中的节点数）
    3. 对于每条边(u, v)，计算两侧子树大小的乘积
    4. 找出所有可能乘积中的最大值
 */

// 使用Map表示邻接表的版本
function maxProductOfTreeSplitMap(tree) {
    // 收集所有唯一节点
    const nodes = new Set();
    for (const [u, v] of tree) {
        nodes.add(u);
        nodes.add(v);
    }
    const nodeList = Array.from(nodes);
    const n = nodeList.length;
    
    // 使用Map构建邻接表，支持任意类型的节点标识
    const children = new Map();
    nodeList.forEach(node => children.set(node, []));
    
    // 构建树的邻接表表示
    for (const [u, v] of tree) {
        children.get(u).push(v);
        children.get(v).push(u);
    }
    
    let maxProduct = 0;
    const subtreeSize = new Map();
    
    // 计算每个节点的子树大小
    function dfs(node, parent) {
        let size = 1; // 包括自己
        for (const child of children.get(node)) {
            if (child !== parent) {
                size += dfs(child, node);
            }
        }
        subtreeSize.set(node, size);
        return size;
    }
    
    // 假设第一个节点是根节点
    const root = nodeList[0];
    dfs(root, null);
    
    // 计算每条边分割后的乘积
    function findMaxProduct(node, parent) {
        for (const child of children.get(node)) {
            if (child !== parent) {
                const product = subtreeSize.get(child) * (n - subtreeSize.get(child));
                maxProduct = Math.max(maxProduct, product);
                findMaxProduct(child, node);
            }
        }
    }
    
    findMaxProduct(root, null);
    return maxProduct;
}
// 使用对象表示邻接表的版本
function maxProductOfTreeSplit(tree) {
    // 构建邻接表（使用对象）
    const children = {};
    for (const [u, v] of tree) {
        children[u] = children[u] || [];
        children[v] = children[v] || [];
        children[u].push(v);
        children[v].push(u);
    }
    
    const nodes = Object.keys(children);
    const n = nodes.length;
    let maxProduct = 0;
    const subtreeSize = {};
    
    // DFS计算子树大小
    function dfs(node, parent) {
        subtreeSize[node] = 1;
        for (const child of children[node]) {
            if (child !== parent) {
                subtreeSize[node] += dfs(child, node);
            }
        }
        return subtreeSize[node];
    }
    
    dfs(nodes[0], null);
    
    // 查找最大乘积
    function findMaxProduct(node, parent) {
        for (const child of children[node]) {
            if (child !== parent) {
                maxProduct = Math.max(maxProduct, subtreeSize[child] * (n - subtreeSize[child]));
                findMaxProduct(child, node);
            }
        }
    }
    
    findMaxProduct(nodes[0], null);
    return maxProduct;
}

// 测试用例
const tree1 = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];
console.log(maxProductOfTreeSplit(tree1)); // 12

const tree2 = [[0,1],[1,2],[2,3],[3,4],[4,5]];
console.log(maxProductOfTreeSplit(tree2)); // 6

const tree3 = [[0,1],[0,2],[0,3]];
console.log(maxProductOfTreeSplit(tree3)); // 3
console.log('======');


/**
 * 这个版本在一次DFS中同时完成子树大小计算和最大乘积查找，更加高效
 * @param {[]} tree 
 */
function maxProductOfTreeSplitOptimized(tree) {
    const n = tree.length + 1; // 边数+1=节点数
    const adj = Array.from({length: n}, () => []);
    let maxProduct = 0;
    
    // 构建邻接表
    for (const [u, v] of tree) {
        adj[u].push(v);
        adj[v].push(u);
    }
    
    // 一次DFS同时计算子树大小和最大乘积
    function dfs(node, parent) {
        let size = 1;
        for (const child of adj[node]) {
            if (child !== parent) {
                const childSize = dfs(child, node);
                size += childSize;
                const product = childSize * (n - childSize);
                maxProduct = Math.max(maxProduct, product);
            }
        }
        return size;
    }
    
    dfs(0, -1);
    return maxProduct;
}

// 测试用例
const tree_1 = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];
console.log(maxProductOfTreeSplitOptimized(tree_1)); // 12 (分割边0-2，子树大小4和3)

const tree_2 = [[0,1],[1,2],[2,3],[3,4],[4,5]];
console.log(maxProductOfTreeSplitOptimized(tree_2)); // 9 (分割边2-3，子树大小3和3)

const tree_3 = [[0,1],[0,2],[0,3]];
console.log(maxProductOfTreeSplitOptimized(tree_3)); // 3 (分割任何边，子树大小1和3)

console.log('======');