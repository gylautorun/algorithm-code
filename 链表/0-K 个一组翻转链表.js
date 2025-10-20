// 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
// k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
// 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

// 输入：head = [1,2,3,4,5], k = 2
// 输出：[2,1,4,3,5]

// 输入：head = [1,2,3,4,5], k = 3
// 输出：[3,2,1,4,5]

// 提示：
// 链表中的节点数目为 n
// 1 <= k <= n <= 5000
// 0 <= Node.val <= 1000

// 你可以设计一个只用 O(1) 额外内存空间的算法解决此问题吗？

const head = {val: 1, next: {val: 2, next: {val: 3, next: {val: 4, next: {val: 5, next: {val: 6, next: null}}}}}};
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const reverseKGroup = function(head, k) {
    const reverseK = (head, k) => {
        let prev = null;
        let current = head;
        while (current !== null && k > 0) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
            k--;
        }
        /**
         * 1-2-3-4-5-6-7  k = 3
         * prev: 反转链表: 3-2-1-null
         * head: 反转最后一个节点 1-null
         *     prev.next.next.next === head
         * current: 反转后链 4-5-6-7-null
         * k: k !== 0 说明不够反转
         */
        head.next = current;
        return [prev, head, k];
    };

    if (head === null || k === 1) {
        return head;
    }

    const root = {next: head};
    let current = root;

    while (current !== null && current.next !== null) {
        const [reverse, last, _k] = reverseK(current.next, k);

        // 最后不够反转
        if (_k > 0) {
            // 需要反转复原
            reverseK(reverse, k);
            return root.next;
        }

        current.next = reverse;
        current = last;
    }

    return root.next;
};

const res = reverseKGroup(head, 3);

console.log(JSON.stringify(res));