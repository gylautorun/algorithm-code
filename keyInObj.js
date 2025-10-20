/**
 * 判断对象中是否存在某个属性
 * @param {*} obj 对象
 * @param {*} key 属性名
 */
function hasProperty(obj, key) {
    // 不能识别原型
    // return Object.hasOwnProperty.call(obj, key);
    // 不可枚举的属性不能识别
    // return Object.keys(obj).includes(key);

    // 1
    // return key in obj;
    // 2
    // let res = obj;
    // while (res) {
    //     if (Object.hasOwnProperty.call(res, key)) {
    //         return true;
    //     }
    //     else {
    //         res = res.__proto__;
    //     }
    // }
    // 3
    // console.log(Reflect.ownKeys(obj));
    return Reflect.has(obj, key);
}

let obj = {a: undefined, b: 1};
Object.defineProperty(obj, 'c', {
    enumerable: false,
    value: 2,
});
console.log(hasProperty(obj, 'a'));
console.log(hasProperty(obj, 'b'));
console.log(hasProperty(obj, 'c'));
console.log(hasProperty(obj, 'toString'));
