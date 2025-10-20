// 请实现函数 entry 转换为 output 的数据格式
const entry = {
    'a.b.c.dd': 'abcdd',
    'a.d.xx': 'adxx',
    'a.e': 'ae',
    'b.c.d': 'bcd'
};

// 要求转换成下面对象
const output = {
    a: {
        b: {
            c: {
                dd: 'abcdd'
            }
        },
        d: {
            xx: 'adxx'
        },
        e: 'ae'
    }
};


// Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）
// Object.entries()返回一个数组，其元素是与直接在object上找到的可枚举属性键值对相对应的数组。属性的顺序与通过手动循环对象的属性值所给出的顺序相同。
// {0: 'a', 1: 'b', 2: 'c'} => [['0', 'a'], ['1', 'b'], ['2', 'c']]
function transform(entry) {
    const result = {};
    Object.entries(entry).forEach(([key, value]) => {
        let current = result;
        let keys = key.split('.');

        keys.forEach((item, index) => {
            if (index !== keys.length - 1) {
                current[item] = current[item] || {};
            }
            else {
                current[item] = value;
            }
            current = current[item];
        })
    });
    return result;
}

function transformIteration(entry) {
    const result = {};
    Object.entries(entry).forEach(([key, value]) => {
        let keys = key.split('.');

        keys.reduce((out, cur, idx, arr) => {
            out[cur] = out[cur] || (arr[idx + 1] ? {} : value);
            return out[cur];
        }, result)
    });
    return result;
}

console.log(transformIteration(entry))



