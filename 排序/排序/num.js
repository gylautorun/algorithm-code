const cache = {array: []};
function disorderArray(num) {
    let len = num || 1000;
    //①创建1~33之间的数组
    let arr = Array.from({length: len}, (v, k) => k + 1);
    //创建一个新数组，用于保存找到的7个随机数
    const newArray = [];// .push()
    //②for循环执行7次
    for (let i = 0; i < len / 10; i++) {
        //随机数
        let num = Math.random() * arr.length;
        num = Math.floor(num);
        //把找到数组元素放入新数组中
        newArray.push(arr[num]);
        //把选到的这个从数组中删除
        arr.splice(num, 1);
    }
    //打印已经找到的数组元素
    // console.log(newArray.sort((a, b) => a - b));
    console.log(newArray);
    cache.array = newArray.slice();
    return newArray;
}

module.exports = {
    disorderArray: function (n) {
        return disorderArray(n);
    },
    cacheDisorderArray: function (n) {
        if (cache.array.length === n) {
            return cache.array;
        }
        return disorderArray(n);
    }
};
// module.exports = disorderArray;
