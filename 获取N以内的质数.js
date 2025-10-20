/**
 * 实现一个函数，接收一个正整数N，输出N以内所有质数
 */

/**
 * 暴力法
 * @param {*} N 
 */
function findPrimes(N) {
    /**
     * 判断一个数是否为质数
     */
    const isPrime = (num) => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    };

    const primes = [];
    for (let i = 2; i < N; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
    return primes;
}

console.log(findPrimes(10));
console.log(findPrimes(100));
console.log(findPrimes(500));


/**
 * 埃拉托斯特尼筛法
 */
function sieveOfEratosthenes(N) {
    const result = new Array(N + 1).fill(true);
    result[0] = result[1] = false;
    // 默认除了0和1，其他都是质数

    for (let i = 2; i <= Math.sqrt(N); i++) {
        // 如果i是质数, 标记其所有倍数为非质数
        if (result[i]) {
            // 从i的平方开始标记: 避免重复标记
            for (let j = i * i; j <= N; j += i) {
                result[j] = false;
            }
        }
    }

    // 收集所有未被标记为false的数（即质数）
    const primes = [];
    for (let i = 2; i < N; i++) {
        // 收集所有未被标记为false的数（即质数）
        if (result[i]) {
            primes.push(i);
        }
    }
    return primes;
}

console.log(sieveOfEratosthenes(10));
console.log(sieveOfEratosthenes(100));
console.log(sieveOfEratosthenes(500));
