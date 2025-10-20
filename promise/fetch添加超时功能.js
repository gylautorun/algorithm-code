// function requestWaitFetch(url, options = {timeout: 5000}) {}
/**
 * 不好的实现:
 *  - 每次调用都要传入定时器
 *  - 虽然可以默认, 但是不方便拓展
 */

/**
 * fetch 请求超时处理工具
 */
class CreateWaitFetch {
    constructor(timeout = 5000) {
        this.timeout = timeout;
        this.abortController = null;
    }

    fetch(url, options = {}) {
        const { timeout = this.timeout } = options;
        return new Promise((resolve, reject) => {
            const controller = new AbortController();
            this.abortController = controller;

            const signal = controller.signal;
            options.signal = signal;

            const timerId = setTimeout(() => {
                controller.abort();
                reject(new Error('Request is timed out'));
            }, timeout);

            window.fetch(url, options)
                .then(resolve, reject)
                .finally(() => clearTimeout(timerId));
        });
    }

    abort() {
        if (this.abortController) {
            this.abortController.abort();
            this.currentController = null;
        }
    }
}

const fetcher = new CreateWaitFetch(3000);

const promise = fetcher.fetch('https://api.example.com/data')
    .then(response => console.log('Success:', response))
    .catch(error => console.log('Error:', error));

fetcher.abort();