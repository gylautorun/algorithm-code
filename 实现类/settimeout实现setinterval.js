function MySetInterval(callback, time) {
    this.timer = null;
    this.time = time || 1000;
    this.start = (time) => {
        if (typeof time === 'number') {
            this.time = time;
        }
        this.timer = setTimeout(() => {
            callback();
            this.start();
        }, this.time);
    };
    this.clear = () => {
        clearTimeout(this.timer);
        this.timer = null;
    };
}

const fn = new MySetInterval(() => {
    console.log(111111);
}, 2000);
fn.start();