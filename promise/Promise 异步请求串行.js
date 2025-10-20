// 串行
const fetch = (url) => Promise.resolve();

function serial(tasks = []) {
    let result = [];

    return tasks.reduce((res, item, index) => {
        return res.then(response => {
            return fetch(item).then(resp => {
                result[index] = resp;
                return index === tasks.length - 1 ? result : item;
            })
        })

    }, Promise.resolve())
}


// 异常退出
function serial(tasks = []) {
    let result = [];
    let count = 0;

    return new Promise((resolve, reject) => {
        const callTask = () => {
            fetch(tasks[count])
                .then(res => {
                    result[count] = res;
                    count++;
                    if (count === tasks.length) {
                        return resolve(result);
                    }
                    callTask();
                })
                .catch(err => {
                    return reject(err);
                })
        };
        callTask();
    })

}