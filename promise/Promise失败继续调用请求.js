// 实现retry：function retry(fn,times,delay)
// fn为异步请求，经过retry包装后，首先执行fn，如果失败则没隔delay的时间尝试一次，直到最后失败

function retry(fn, times, delay) {
    let count = 0;
    return new Promise((resolve, reject) => {
        const temp = () => {
            Promise
                .resolve(fn)
                .then(resolve)
                .catch(err => {
                    count++;

                    if (count === times) {
                        return reject(err);
                    }

                    setTimeout(() => {
                        temp();
                    }, delay)
                })
        };
        temp();
    })
}