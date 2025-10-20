// 防抖
// 指触发事件后在规定时间内回调函数只能执行一次，如果在规定时间内又触发了该事件，则会重新开始算规定时间。

function debounce(fn, delay) {
    let that = this;
    let timer = null;

    return function () {
        let args = arguments;

        if (timer !== null) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            fn.apply(that, args)
        }, delay)
    }
}


// 节流
// 当持续触发事件时，在规定时间段内只能调用一次回调函数。如果在规定时间内又触发了该事件，则什么也不做,也不会重置定时器.
function throttle(fn, delay) {
    let that = this;
    let timer = null;

    return function () {
        let args = arguments;

        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(that, args)
                timer = null;
            }, delay)
        }


    }
}

