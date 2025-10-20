function createFibonacci() {
    const cache = {0: 0, 1: 1};
    return function fibonacci(n) {
        if (n in cache) {
            return cache[n];
        }
        cache[n] = fibonacci(n - 1) + fibonacci(n - 2);
        return cache[n];
    }
}

const fibonacci = createFibonacci();

console.log(fibonacci(7));
console.log(fibonacci(80));