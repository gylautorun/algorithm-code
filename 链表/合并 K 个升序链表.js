// https://leetcode.cn/problems/merge-k-sorted-lists/description/
// 给你一个链表数组，每个链表都已经按升序排列。
// 请你将所有链表合并到一个升序链表中，返回合并后的链表。

// 示例 1：
// 输入：lists = [[1,4,5],[1,3,4],[2,6]]
// 输出：[1,1,2,3,4,4,5,6]
// 解释：链表数组如下：
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// 将它们合并到一个有序链表中得到。
// 1->1->2->3->4->4->5->6

// 示例 2：
// 输入：lists = []
// 输出：[]

// 示例 3：
// 输入：lists = [[]]
// 输出：[]
 
// 提示：
// k == lists.length
// 0 <= k <= 10^4
// 0 <= lists[i].length <= 500
// -10^4 <= lists[i][j] <= 10^4
// lists[i] 按 升序 排列
// lists[i].length 的总和不超过 10^4


/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
const mergeKLists = function(lists) {
    if (!lists.length) {
        return null;
    }
    if (lists.length === 1) {
        return lists[0];
    }

    const merge = (head1, head2) => {
        if (head1 === null) {
            return head2;
        }
        if (head2 === null) {
            return head1;
        }

        const head = {next: null};
        let current = head;

        while (head1 && head2) {
            if (head1.val < head2.val) {
                current.next = head1;
                head1 = head1.next;
            }
            else {
                current.next = head2;
                head2 = head2.next;
            }
            current = current.next;
        }

        current.next = head1 || head2;

        return head.next;
    };


    const mergeList = (lists) => {
        if (lists.length === 1) {
            return lists[0];
        }

        const mid = Math.floor(lists.length / 2);
        const head1 = mergeList(lists.slice(0, mid));
        const head2 = mergeList(lists.slice(mid));

        return merge(head1, head2);
    };
    return mergeList(lists);
};
