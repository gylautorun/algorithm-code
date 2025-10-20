/**
 * 微任务: promise.then  MutationObserver
 */

function addMicrotask(fn) {
    if (typeof Promise !== 'undefined') {
        Promise.resolve().then(fn);
    }
    else if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(fn);
        const div = document.createElement('div');
        observer.observe(div, {
            childList: true,
        });
        div.innerText = 1;
    }
    else {
        // 不是微任务, 模拟用
        setTimeout(fn);
    }
}