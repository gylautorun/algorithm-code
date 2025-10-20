const selectionData = require('./base');

function selectionSort(list: number[]) {
    for (let i = 0; i < list.length; i++) {
        let k = i;
        for (let j = i + 1; j < list.length; j++) {
            if (list[j] < list[k]) {
                k = j; // 记录最小元素的索引
            }
        }
        if (k !== i) {
            selectionData.swap(list, k, i);
        }
    }
    console.log('selectionSort', list);
    return list;
}

selectionSort(selectionData.getNumberArray(100));