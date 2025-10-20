const head1 = {
    value: 1,
    next: {
        value: 3,
        next: {
            value: 5,
            next: {
                value: 7,
                next: {
                    value: 9,
                    next: {
                        value: 11,
                        next: null,
                    }
                }
            }
        }
    }
}

const head2 = {
    value: 2,
    next: {
        value: 4,
        next: {
            value: 6,
            next: {
                value: 8,
                next: {
                    value: 10,
                    next: {
                        value: 12,
                        next: null,
                    }
                }
            }
        }
    }
}

// 合并为新链表返回
function mergeLinks(head1, head2) {
    let prev = head1;
    let next = head2;

    const result = {value: 0, next: null};
    let current = result;

    while (prev || next) {
        if (prev === null) {
            current.next = next;
            break;
        }
        else if (next === null) {
            current.next = prev;
            break;
        }
        else if (prev.value > next.value) {
            current.next = next;
            next = next.next;
        }
        else {
            current.next = prev;
            prev = prev.next;
        }
        current = current.next;
    }

    return result.next;
}

console.log(JSON.stringify(mergeLinks(head1, head2)));