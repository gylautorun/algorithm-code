Promise.all = function (promises = []) {
    let result = [];
    return new Promise((resolve) => {
        promises.forEach((promise) => {
            promise.then(res => result.push(res))
        })

        return resolve(result);
    })

}


Promise.prototype.all = function (promises = []) {
    let result = [];
    let count = 0;
    let len = promises.length;

    return new Promise((resolve, reject) => {
        for (let i = 0; i < len; i++) {

            Promise.resolve(promises[i]).then(res => {
                count++;
                result[i] = res;

                if (count === len) {
                    return resolve(result);
                }
            }, err => {
                return reject(err)
            })
        }
    })
}