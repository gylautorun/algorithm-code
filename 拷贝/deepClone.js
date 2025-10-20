const isObject = obj => typeof obj === 'object' && obj !== null;
const clone = (source) => {
    if (!isObject(source)) {
        return source;
    }

    let target = Array.isArray(source) ? [] : {};

    for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = isObject(source[key]) ? clone(source[key]) : source[key];
        }
    }

    return target;
}

// 解决循环引用 使用hash表
const clone1 = (source, hash = new WeakMap()) => {
    if (!isObject(source)) {
        return source;
    }
    if (hash.has(source)) {
        return hash.get(source);
    }
    let target = Array.isArray(source) ? [] : {};
    hash.set(source, target);

    for (let key in source) {
        // 判断是否是自身属性
        // if (source.hasOwnProperty(key)) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = isObject(source[key]) ? clone1(source[key], hash) : source[key];
        }
    }

    return target;
}