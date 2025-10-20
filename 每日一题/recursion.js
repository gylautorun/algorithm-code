// 请按照下面要求进行代码实现：
//      创建长度为5的空数组arr
//      生成一个(2-32)之间的随机整数rand
//      把rand插入到数组arr内，如果数组内已存在rand相同的数字，则重新生成随机数插入到arr内。使用递归实现，不能使用for/while循环
//      最终输出长度为5，且内容不重复的数组


function testArray(max) {
    let list = Array(max).fill(null);
    const getArrayItem = (list = [], idx = 0) => {

        if (list.every(it => !!it)) {
            return list;
        }

        let random = parseInt(Math.random()*32);

        let findIndex = list.findIndex(it => it === random);
        if (findIndex > -1) {
            return getArrayItem(list, idx)
        }
        list[idx] = random;
        return getArrayItem(list, ++idx);

    };

    return getArrayItem(list);
}

function test(list = [], max = 0) {

    if (list.length >= max) {
        return list;
    }
    let random = Math.round(Math.random() * 32); // parseInt(Math.random()*32)
    let findIndex = list.findIndex(it => it === random);
    if (findIndex > -1) {
        return test(list, max)
    }
    list[list.length] = random;
    return test(list, max);
}

function test1(max) {

    let list = Array(max).fill(0);
    const getArrayItem = (list = [], index = 0) => {

        if (index >= list.length) {
            return;
        }
        let random = Math.round(Math.random() * 32); // parseInt(Math.random()*32)
        let findIndex = list.findIndex(it => it === random);
        if (findIndex > -1) {
            return getArrayItem(list, index)
        }
        list[index] = random;
        getArrayItem(list, ++index);

    };

    getArrayItem(list);
    return list;

}


console.log(testArray(5));
console.log(test([], 5));
console.log(test1(5));