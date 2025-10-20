const arr = [1, 2, [3, 4], [5, 6, [7, 8], [9, 10, [11, 12, 13, [14, 15, 16, [17, 18]]]]]];

const flat = (array, value) => {
    return array.reduce((res, item) => {
        if (Array.isArray(item)) {
            return flat(item, res);
        }
        else {
            return res.concat(item);
        }
    }, value || []);
}

// 增加 depth
const flatDeep = (array, depth, value) => {
    return array.reduce((res, item) => {
        if (Array.isArray(item) && depth > 1) {
            return flatDeep(item, depth - 1, res);
        }
        else {
            return res.concat(item);
        }
    }, value || []);
}

const flat2 = (array) => {
    return array.reduce((res, item) => {
        if (Array.isArray(item)) {
            return res.concat(flat2(item));
        }
        else {
            return res.concat(item);
        }
    }, []);
}

// 增加 depth
const flatDeep2 = (array, depth) => {
    return array.reduce((res, item) => {
        if (Array.isArray(item) && depth > 1) {
            return res.concat(flatDeep2(item, depth - 1));
        }
        else {
            return res.concat(item);
        }
    }, []);
}

console.log(flat(arr));
console.log(flatDeep(arr, 4));