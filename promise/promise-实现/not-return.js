const testDemo = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2 * 1000);
    })
};
const dd = new testDemo();
dd.then(() => {
    console.log('---1 then');
    dd.then(() => {
        console.log('---1.1 then');
        dd.then(() => {
            console.log('---1.1.1 then');
        }).then(() => {
            console.log('---1.1.2 then');
        }).then(() => {
            console.log('---1.1.3 then');
        })
    }).then(() => {
        console.log('---1.2 then');

    }).then(() => {
        console.log('---1.3 then');

    })
}).then(() => {
    console.log('---2 then');
    dd.then(() => {
        console.log('---2.1 then');
        dd.then(() => {
            console.log('---2.1.1 then');
        })
    })
}).then(() => {
    console.log('---3 then');
    dd.then(() => {
        console.log('---3.1 then');
        dd.then(() => {
            console.log('---3.1.1 then');
        })
    })
});

// [1 2 3]
// 内存 [1]
// ---1 then



