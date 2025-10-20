// 如果有环, 返回环第一个节点, 无环返回null
// 1 1
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
// slow 从1 开始 fast 从 12(相遇节点开始) 每次走一个
// 1 12
// 2 13
// 3 14
// 4 15
// 5 5  <=
// 1 => 2 => 3 => 4 => 5 => 6 => 7 => 8 => 9 => 10
//                     ||                       ||
//                     15 <= 14 <= 13 <= 12 <=  11

// 1 1
// 2 3
// 3 5
// 4 7
// 5 9
// 6 11
// 7 13
// 8  6
// 9  8
// 10 10
// slow 从1 开始 fast 从 10(相遇节点开始) 每次走一个
// 1  10
// 2  11
// 3  12
// 4  13
// 5  14
// 6  6   <=

// 1 => 2 => 3 => 4 => 5 => 6 => 7 => 8 => 9 => 10
//                         ||                   ||
//                         14 <=  13  <=  12 <= 11

// 快慢指针
function isCircleLinks(head) {
    if (head === null) {
        return null;
    }
    let slow = head;
    let fast = head;
    let hasLoop = false;

    while (fast.next !== null && fast.next.next !== null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            hasLoop = true;
            break;
        }
    }

    // 环存在
    if (hasLoop) {
        slow = head;
        while (slow !== fast) {
            slow = slow.next;
            fast = fast.next;
        }
        return slow;
    }

    return null;
}
