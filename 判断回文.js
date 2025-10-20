// reverse()
function palindromes(str) {
    const arr = str.split('');
    return str === str.split('').reverse().join('');
}

// for
function palindromes(str) {
    for(let i = 0; i < Math.floor(str.length / 2); i++) {
        if(str[i] !== str[str.length - 1 - i]) {
            return false;
        };
    }
    // for(let i = 0, j = str.length - 1; i < j; i++, j--) {
    //     if(str[i] !== str[j]) {
    //         return false;
    //     };
    // }
    return true;
}

// 递归
function palindromes(str) {
    while(str.length >= 1) {
        if(str[0] != str[str.length - 1]) {
            return false;
        }
        else {
            return palindromes(str.slice(1, str.length - 1)); 
        }
    }
    return true;
}
