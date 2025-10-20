// 非空单链表, 返回中间节点
// 中间节点1个返回
// 中间节点两个 返回 第二个节点

// 1 => 2 => 3 => 4 => 5 => 6 => 7 => 8 => 9
// 快: 3 5 7 9
// 慢: 2 3 4 5
// 5
// 1 => 2 => 3 => 4 => 5 => 6 => 7 => 8
// 快: 3 5 7 null
// 慢: 2 3 4 5
// 5 => 5
// 快慢双指针
function midLinkNode(head) {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}
