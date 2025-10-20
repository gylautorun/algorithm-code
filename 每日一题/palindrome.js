/**
 * 请打印出1 - 10000 之间的所有回文数字，比如
 * 121
 * 1111
 * 1221
 * 注意1~9不是回文数字
 * @param start: 开始数字
 * @param end: 结束数字
 */
function palindrome(start, end) {

    const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const result = [];

    nums.forEach(it => {
        result.push(Number(it + it));
        for (let i = 0; i < 10; i++) {
            result.push(Number(it + i + it))
            result.push(Number(it + i + i + it))
        }
    });

    return result;
}

// console.log(palindrome(1, 10000));

function palindrome1(max) {

    // Array(max + 1).fill('')
    // Array.from({length: max + 1})
    // Array.from({length: max + 1}).fill('')
    return Array.from({length: max + 1}).fill('').reduce((res, it, idx) => {
        if (idx > 10) {
            let reverseStr = Array.from(`${idx}`).reverse().join(''); // (idx + '').split('').reverse().join('');
            reverseStr === idx.toString() && res.push(idx);
        }

        return res;

    }, [])
}

console.log(palindrome1(10000));