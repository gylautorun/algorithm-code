// 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题
// （即，只能进行节点交换）。

// 1 => 2 => 3 => 4
// 2 => 1 => 4 => 3
// 输入：head = [1,2,3,4]
// 输出：[2,1,4,3]

// 示例 2：
// 输入：head = []
// 输出：[]

// 示例 3：
// 输入：head = [1]
// 输出：[1]

const head = {val: 1, next: {val: 2, next: {val: 3, next: {val: 4, next: {val: 5, next: null}}}}};
/**
 * 递归
 * @param {*} head 
 * @returns 
 */
const swapPairs = function(head) {
    if (head === null || head.next === null) {
        return head;
    }

    const current = head.next;
    head.next = swapPairs(current.next);
    current.next = head;
    return current;
};

/**
 * @param {*} head 
 * @returns 
 */
const swapPairs2 = function(head) {
    if (head === null || head.next === null) {
        return head;
    }
    const root = {next: head};
    let current = root;

    while (current.next !== null && current.next.next !== null) {
        const prev = current.next;
        const next = current.next.next;

        current.next = next;
        prev.next = next.next;
        next.next = prev;

        current = prev;
    }
    return root.next;
};

console.log(JSON.stringify(swapPairs2(head)));

