// async function getUser() {
//     return fetch('https://my-json-server.typicode.com/typicode/demo/profile').then(resp => resp.json())
// }
// async function m1() {
//     return await getUser();
// }
// async function m2() {
//     return await m1();
// }
// async function m3() {
//     return await m2();
// }
// async function main() {
//     const user = await m3();
//     console.log(user);
// }

// main();
const window = {
    fetch: (url) => {
        return new Promise((resole, reject) => {
            setTimeout(() => {resole('结果')}, 1000);
        });
    }
}
// 去除 async await 同步执行成功
function getUser() {
    // return fetch('https://my-json-server.typicode.com/typicode/demo/profile')
    return window.fetch('https://my-json-server.typicode.com/typicode/demo/profile');
}
function m1() {
    return getUser();
}
function m2() {
    return m1();
}
function m3() {
    return m2();
}
function main() {
    const user = m3();
    console.log(user);
}

function run(func) {
    const cache = [];
    let i = 0; // 第几次调用fetch
    // 需要改变fetch/promise 函数行为
    const originalFetch = window.fetch; // 缓存原始fetch
    window.fetch = (...args) => {
        // 有缓存交付缓存
        if (cache[i]) {
            if (cache[i].status === 'fulfilled') {
                return cache[i].data;
            }
            else if (cache[i].status === 'rejected') {
                throw cache[i].err;
            }
        }
        const result = {status: 'pending', data: null, err: null};
        cache[i++] = result;

        // 发送请求报错
        // const prom = originalFetch(...args).then(resp => resp.json()).then(
        const prom = originalFetch(...args).then(
            (res) => {
                result.status = 'fulfilled';
                result.data = res;
            },
            (err) => {
                result.status = 'rejected';
                result.err = err;
            }
        );
        // 报错, promise 错误抛出, try catch 可以拦截, 引发再次调用
        throw prom;
        
    };
    try {
        func();
    } catch (err) {
        // 什么时候执行func
        if (err instanceof Promise) {
            // 重新调用函数, 需要清空i, 重新缓存
            const reRun = () => {
                i = 0;
                func();
            }
            err.then(reRun, reRun);
        }
    }
}
run(main)
// main();