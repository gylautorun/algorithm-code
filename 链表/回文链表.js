// 1 => 2 => 3 => 4 => 5 => 4 => 3 => 2 => 1
// 第一
// - 数组收集
// - 双指针 前后 对比数组

// 第二: 双指针
// - 快指针走到最后节点(奇数链表) 或者 null (偶数链表)
// - 奇数链表将慢指针 下移一位
// - 将慢指针及其后面的链表 反转
// - 快指针移到head
// - 快慢一个一个对比

function isPalindromeLinks(head) {
    if (head === null) {
        return true;
    }

    let slow = head;
    let fast = head;

    while (fast !== null && fast.next!== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    if (fast !== null) {
        slow = slow.next;
    }

    slow = reverseLinks(slow);
    fast = head;

    while(slow !== null) {
        if (slow.value !== fast.value) {
            return false;
        }
        fast = fast.next;
        slow = slow.next;
    }
    return true;
}

// 反转链表
function reverseLinks(head) {
    let prev = null;
    let current = head;
    
    while (current!== null) {
        const next = current.next;

        current.next = prev;
        prev = current;
        current = next;
    }

    return prev;
}

