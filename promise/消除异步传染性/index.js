function getUser() {
    return window.fetch('https://jsonplaceholder.typicode.com/users/1');
}

function m1() {
    const user = getUser();
    return user;
}

function m2() {
    const user = m1();
    return user;
}

function m3() {
    const user = m2();
    return user;
}

function main() {
    console.log('main');
    const user = m3();
    console.log('user', user);
}

// 实现一个函数，将m1, m2, m3 组合起来，变成同步函数
/**
 * main => getUser => fetch =========> error(直接抛出错误)      main => getUser => fetch => 执行 fetch 成功 => 返回数据
 *                      ||                                    ||
 *                      执行 fetch 成功 ====================> 返回数据
 */

function syncFetch(fn) {
    // 1. 保存原始的 fetch
    const oldFetch = window.fetch;
    // 2. 定义缓存
    const cache = new WeakMap();
    cache.set(fn, {
        status: 'pending',
        value: null,
    });
    // 3. 定义新的 fetch
    function newFetch(...args) {
        const res = cache.get(fn);
        if (res.status === 'fulfilled') {
            return res.value;
        }
        else if (res.status === 'rejected') {
            throw res.value;
        }
        const promise = oldFetch(...args)
            .then(res => res.json())
            .then(value => {
                res.status = 'fulfilled';
                res.value = value;
            })
            .catch(error => {
                res.status = 'rejected';
                res.value = reason;
            });

        // 抛出错误，让调用者处理错误, 执行中断
        throw promise;
    }
    // 4. 替换 fetch
    window.fetch = newFetch;
    // 5. 捕获错误
    try {
        fn();
    } catch (error) {
        if (error instanceof Promise) {
            // 等待 promise 执行完成, 调用fn
            error.finally(() => {
                window.fetch = newFetch;
                fn();
                window.fetch = oldFetch;
            });
        }
    }
    // 6. 恢复 fetch
    window.fetch = oldFetch;
}

// main();
// main
// Promise { <pending> }

syncFetch(main);
// main
// user 
// {
//     "id": 1,
//     "name": "Leanne Graham",
//     "username": "Bret",
//     "email": "Sincere@april.biz",
//     "address": {
//         "street": "Kulas Light",
//         "suite": "Apt. 556",
//         "city": "Gwenborough",
//         "zipcode": "92998-3874",
//         "geo": {
//             "lat": "-37.3159",
//             "lng": "81.1496"
//         }
//     },
//     "phone": "1-770-736-8031 x56442",
//     "website": "hildegard.org",
//     "company": {
//         "name": "Romaguera-Crona",
//         "catchPhrase": "Multi-layered client-server neural-net",
//         "bs": "harness real-time e-markets"
//     }
// }
