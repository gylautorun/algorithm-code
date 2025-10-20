// 模拟实现并行 类似 promise.all
// 对应输出结果
const fetch = (url) => Promise.resolve();

function allAjaxs(urls = []) {
    let result = new Array(urls.length).fill(null); // Array(urls.length).fill(null)
    let count = 0;

    return new Promise((resolve, reject) => {
        for (let i = 0; i < urls.length; i++) {
            fetch(urls[i])
                .then(res => {
                    result[i] = res;
                    count++;
                    if (count === urls.length) {
                        return resolve(result);
                    }
                })
                .catch(err => {
                    return reject(err);
                })
        }
    })
}