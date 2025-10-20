const data = require('./base');

function bubbleSort(list: number[]) {
    function swap(i: number, j: number) {
        [list[j], list[i]] = [list[i], list[j]];
    }
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length - i; j++) {
            if (list[j] > list[j + 1]) {
                // data.swap(list, j, j + 1);
                swap(j, j + 1);
            }
        }
    }
    console.log('bubbleSort', list);
    return list;
}

bubbleSort(data.getNumberArray(100));