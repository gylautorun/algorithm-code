/**
 * 给一堆整数，写算法，找出质数
 */


/**
 * 判断是否为质数
 */
function isPrime(num) {
    if (num <= 1 || !num) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

/**
 * 判断是否为合数
 */
function isComposite(num) {
    return num > 1 && !isPrime(num);
}

/**
 * 从数组中找出所有质数
 * @param {number[]} numbers - 要检查的数字数组
 * @returns {number[]} - 包含所有质数的数组
 */
function findPrimes(numbers) {
    // 使用filter方法筛选出质数
    return numbers.filter(num => isPrime(num));
}

// 测试
const primes = findPrimes([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(primes); // 输出: [2, 3, 5, 7]

const nonPrimes = findPrimes([1, 4, 6, 8, 10]);
console.log(nonPrimes); // 输出: []

const mixed = findPrimes(new Array(500).fill(0).map((_, i) => i + 1));
console.log(mixed); // 输出: [2, 3, 5, 7, 11, 13, 17, 19, 23, ...] 95
