class Solution {
    constructor(urls = [], max, callback) {
        this.max = max;
        this.urls = urls;
        this.results = [];
        this.index = Math.min(this.max, this.length);
        this.completedIndex = 0;
        this.start();
        this.completed = callback;
    }

    get length() {
        return this.urls.length;
    }

    start() {
        for (let i = 0; i < this.index; i++) {
            this.handler(urls[i], i);
        }
    }
    imitateFetch(url, idx) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({status: 'ok', data: url});
            }, 1000);
        });
    }
    handler(url, idx) {
        this.imitateFetch(url, idx).then(res => {
            this.results[idx] = res; // 请求成功
        }).catch(err => {
            this.results[idx] = err; // 请求失败
        }).finally(() => {
            this.handleBoundary();
        });
    }

    handleBoundary() {
        this.completedIndex++;
        // 处理边界情况
        if (this.completedIndex === this.length) {
            // 结束
            this.completed(this.results);
        }
        else {
            this.handler(this.urls[this.index++], this.index);
        }
    }
}

const completedCallback = (results) => {
    console.log(results, '处理完成');
}
const urls = new Array(10).fill('https://www.example.com/').map((item, index) => item + index);
const fetcher = new Solution(urls, 6, completedCallback);
