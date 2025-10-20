const head = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: {
                    value: 5,
                    next: {
                        value: 6,
                        next: null,
                    }
                }
            }
        }
    }
}

// 1 => 2 => 3 => 4 => 5 => 6 => null
function reverseLinks(head) {
    let prev = null;
    let current = head;
    while (current !== null) {
        const next = current.next;

        current.next = prev;
        prev = current;
        current = next;
    }

    return prev;
}

console.log(JSON.stringify(reverseLinks(head)));