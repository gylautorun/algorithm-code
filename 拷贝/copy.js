// 浅拷贝
const shallowCopy = (obj) => {
    const result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        // if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (obj.hasOwnProperty(key)) {
            result[key] = obj[key];
        }
    }
    return result;
};

// 深拷贝
// 缺少 copy Symbol属性值
// 缺少解决 循环引用
const deepCopy = (obj) => {
    const result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        // if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (value && typeof value === 'object') {
                result[key] = deepCopy(value);
            }
            else {
                result[key] = value;
            }
        }
    }
    return result;
};

// 深拷贝
// 缺少解决 循环引用
/**
 * for...in...循环拿不到Symbol属性，如果要拿Symbol属性，可以用Object.getOwnPropertySymbols和Reflect.ownKeys
 * Object.getOwnPropertySymbols会返回对象的Symbol属性列表：
 * Reflect.ownKeys会返回对象的所有自有属性，包括Symbol属性和不可枚举属性，但是不包括继承属性
 * Reflect.ownKeys可以获取Symbol属性，用for...of来循环数组
 * @param {*} obj 
 * @returns 
 */
const deepCopy2 = (obj) => {
    const result = Array.isArray(obj) ? [] : {};
    for (let key in Reflect.ownKeys(obj)) {
        // if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (value && typeof value === 'object') {
                result[key] = deepCopy(value);
            }
            else {
                result[key] = value;
            }
        }
    }
    return result;
};

// 深拷贝
const deepCopy3 = (data) => {
    const map = new WeakMap();
    const dp = (obj) => {
        const result = Array.isArray(obj) ? [] : {};

        const exsitObj = map.get(obj);
        if (exsitObj) {
            return exsitObj;
        }
        map.set(obj, result);

        for (let key in Reflect.ownKeys(obj)) {
            // if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                if (value && typeof value === 'object') {
                    result[key] = deepCopy(value);
                }
                else {
                    result[key] = value;
                }
            }
        }
        return result;
    };

    return dp(data);
};

const deepCopy4 = (data) => {
    return new Promise((resolve) => {
        const {port1, port2} = new MessageChannel();
        port1.postMessage(data);
        port2.onmessage = function(msg) {
            resolve(msg.data);
        };
    });
};
const data = {a: 1, list: [{b: 2}], fn: function() {}, [Symbol()]: 'Symbol Test'};
const data1 = data;
let data2;
deepCopy4(data).then(res => {
    data2 = res;
    data2.fn = null;
    console.log(data2, data);
});