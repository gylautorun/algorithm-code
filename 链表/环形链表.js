// 判断链表是否有环
// 2 3
// 3 5
// 4 7
// 5 9
// 6 11
// 7 13
// 8 15
// 9 6
// 10 8
// 11 10
// 12 12
// 1 => 2 => 3 => 4 => 5 => 6 => 7 => 8 => 9 => 10
//                     ||                       ||
//                     15 <= 14 <= 13 <= 12 <=  11

// 快慢指针
function isCircleLinks(head) {
    let slow = head;
    let fast = head;

    while (fast.next !== null && fast.next.next !== null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            return true;
        }
    }

    return false;
}
