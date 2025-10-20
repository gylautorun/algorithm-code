const head = {
    value: 1,
    next: {
        value: 1,
        next: {
            value: 5,
            next: {
                value: 5,
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

function deleteLinksRepeatValue(head) {
    if (head === null) {
        return head;
    }
    let current = head;

    while (current.next !== null) {
       if (current.next.value === current.value) {
            current.next = current.next.next;
       }
       else {
            current = current.next;
       }
       
    }
    return head;
}

console.log(JSON.stringify(deleteLinksRepeatValue(head)));