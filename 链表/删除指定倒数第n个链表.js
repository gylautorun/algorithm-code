// 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点

// 示例：
    // 给定一个链表: 1->2->3->4->5, 和 n = 2
    // 当删除了倒数第二个节点后，链表变为 1->2->3->5
// 说明：
    // 给定的 n 保证是有效的


// 分析: 双指针, first 前进n, second 为head链表, 同时移动first, second, 
//      first不存在时候, 这个时候second.next是要删除的链表, 当first开始不存在即为删除第一个
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNLink(head, n) {
    let first = head;
    let second = head;

    for (let i = 0; i < n; i++) {
        first = first.next;
    }

    if (!first) {
        return second.next;
    }

    while (first.next) {
        first = first.next;
        second = second.next;
    }
    second.next = second.next.next;
    return head;
}