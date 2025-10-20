function fn(stack, need) {
    if (stack.length < need.length) {
        return -1;
    }
    for (let i = 0; i < stack.length; i++) {
       if (stack[i] === need[0]) {
           const str = stack.substr(i, i + need.length);
            if (str === need) {
                return i;
            }
       }
    }
    return -1;
}