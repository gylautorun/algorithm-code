/**
 * 链表单元
 * @param {*} value 
 */
function Linked(value) {
    this.value = value;
    this.next = null;
}
/**
 * 生成单项链表
 * @param {Array<string | number>} arr 
 */
function createLinked(arr) {
    const len = arr.length;
    if (!len) {
        return null;
    }
    const root = new Linked(arr[0]);
    if (len === 1) {
        return root;
    }
    let temp = new Linked(arr[1]);
    root.next = temp;
    let i = 2;
    while (i < len) {
        const node = new Linked(arr[i]);
        temp.next = node;
        temp = node;
        i++;
    }
    
    return root;
};

const head = createLinked(['A', 'B', 'C', 'D', 'E']);
// {"value":"A","next":{"value":"B","next":{"value":"C","next":{"value":"D","next":{"value":"E","next":null}}}}}
/**
 * 反转链表
 *  A=>B=>C=>D=>E
 * =>
 *  E=>D=>C=>B=>A
 * @param {*} link: 原始链表
 */
function reverseLinked(head) {
    let prev = null;
    let current = head;
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
}

console.log(reverseLinked(head));
// {"value":"E","next":{"value":"D","next":{"value":"C","next":{"value":"B","next":{"value":"A","next":null}}}}}