function getNumberArray(n) {
    const num = 100 * n;
    // return Array.from({length: n}).fill(0).map(() => Math.ceil(Math.random() * num));
    return new Array(n).fill(1).map(() => Math.ceil(Math.random() * num));
}

function swap(list, i, j) {
    [list[j], list[i]] = [list[i], list[j]];
}


module.exports = {
    swap,
    getNumberArray,
}