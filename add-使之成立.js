function createProxy(value = 0) {
    const valueGetter = () => value;
    return new Proxy({}, {
        get: function (target, key) {
            // console.log(key);

            // 特殊处理 Symbol.toPrimitive 方法，使其返回原始值
            if (key === Symbol.toPrimitive) {
                return valueGetter; // 返回原始值
            }

            // value + key 累加, 但是返回不能直接和数字相加
            return createProxy(value + Number(key)); // 递归创建代理对象
        }
    });
}

const add = createProxy(); // 代理对象

const r1 = add[1][2][3] + 4;
const r2 = add[10][20][30] + 40;
const r3 = add[100][200][300] + 400;
const r4 = add[1000][2000][3000] + 4000;

console.log({
    r1, r2, r3, r4
});


