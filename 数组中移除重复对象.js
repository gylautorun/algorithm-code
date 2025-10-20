// 简单的数组去重
let strings = [1, 2, 3, 4, 5, 6, 5, 4, 6, 7, 8, 4];
const filteredStrings = strings.filter((item, index) => {

    // strings.indexOf(项)总是会返回该项的第一个出现的索引
    let findIdx = strings.indexOf(item);
    return findIdx === index; // 只过滤出相同索引与findIdx 相等的

});
// console.log(filteredStrings);



// 对象数组去重
// 1. 只检查数组中的每一个项目和后面的每一个项目，以避免对同一对象进行多次比较
// 2. 只检查未发现与其他物品重复的物品
// 3. 在检查每个属性的值是否相同之前，先检查两个对象是否有相同的键值
removeDuplicates = (arr = []) => {
    let results = [];
    let duplicates = []; // 重复指标
    arr.forEach((it, index) => {
        if (duplicates.includes(index)) {
            return;
        }
        results.push(it);

        // 循环当前项之后的数组对象
        for (let compIndex = index + 1; compIndex < arr.length; i++) {
            let comparison = arr[compIndex];
            let itKeys = Object.keys(it);
            let comparisonKeys = Object.keys(comparison);
            if (itKeys.length !== comparisonKeys.length) {
                continue;
            }

            // names
            let itKeysStr = itKeys.sort().join('');
            let comparisonKeysStr = comparisonKeys.sort().join('');
            if (itKeysStr !== comparisonKeysStr) {
                continue;
            }

            // values
            // let valueEqual = true;
            // itKeys.forEach((subIt, i) => {
            //     if (it[subIt] !== comparison[subIt]) {
            //         valueEqual = false;
            //         break;
            //     }
            // });
            let valueEqual = itKeys.every(k => it[k] === comparison[k]);
            if (valueEqual) {
                duplicates.push(compIndex);
            }

        }
    })

    return results;
}
// 或
unique = (arr = []) => {
    let obj = {};
    arr.forEach(it => {
        // 调整顺序 健名排序, 防止顺序不一样导致判断有误
        let newData = {};
        Object.keys(it).sort().map(k => newData[k] = it[k]);

        obj[JSON.stringify(newData)] = it;
    })
    arr = Object.key(obj).map(o => JSON.parse(o));
    return arr;
}