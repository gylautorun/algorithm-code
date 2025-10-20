// 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。
// 说明: 叶子节点是指没有子节点的节点。
// 示例:
// 给定如下二叉树，以及目标和 sum = 22，

//               5
//              / \
//             4   8
//            /   / \
//           11  13  4
//          /  \    / \
//         7    2  5   1
// 返回:
// [
//    [5,4,11,2],
//    [5,8,4,5]
// ]

// 回溯

const pathSum = (root, sum) => {
    if (root === null) {
        return [];
    }
    const result = [];
    dfs(root, sum, result, []);
    return result;

    function dfs(node, sum, res, path) {
        if (node === null) {
            return;
        }
        // 根 到 叶子, 所以需要加上 是否叶子节点条件
        if (node.val === sum && node.left === null && node.right === null) {
            return res.push([...path, node.val]);
        }
        path.push(node.val);
        dfs(node.left, sum - node.val, result, path);
        dfs(node.right, sum - node.val, result, path);
        path.pop();
    }
};