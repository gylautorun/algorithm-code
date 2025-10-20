/**
 * https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/description/
 * 124. 二叉树中的最大路径和
 *  给定一个非空二叉树，返回其最大路径和。
    本题中，路径被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。该路径至少包含一个节点，且不一定经过根节点。

    示例 1：
    输入：[1,2,3]

         1
        /  \
       2    3

    输出：6: [2,1,3]
    示例 2：

    输入：[-10,9,20,null,null,15,7]

        -10
       /   \
      9     20
           /  \
          15   7

    输出：42: [15,20,7]

    示例 3：
    输入：[-10,9,6,5,null,1,7,3,2]

             -10
            /   \
           9     6
          /     /  \
         5      1   7
        /  \
       3    2

    输出：20: [3,5,9,-10,6,7]

 */
/**
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

const maxPathSum = (root) => {
    if (root === null) {
        return 0;
    }
    let max =  root.val;

    const handler = (node) => {
        if (node === null) {
            return 0;
        }
        const l = handler(node.left); // 单边最大值
        const r = handler(node.right); // 单边最大值
        max = Math.max(max, node.val + Math.max(l, 0) + Math.max(r, 0));
        return node.val + Math.max(l, r, 0);
    };
    handler(root);
    return max;
};



