var str = 'IIDDDIDIDIIDDDI'; // [0, 1, 15, 14, 13, 2, 12, 3, 11, 4, 5, 10, 9, 8, 6, 7]

function permutation(str) {
    var array = new Array(str.length + 1);
    var min = 0, max = str.length;
    str.split('').forEach(function (value, i) {
        if (i === str.length - 1) {
            if (value === 'I') {
                array[i] = min;
                array[i + 1] = max;
            }
            else {
                array[i] = max;
                array[i + 1] = min;
            }
        }
        else {
            if (value === 'I') {
                array[i] = min;
                min++;
            }
            else {
                array[i] = max;
                max--;
            }
        }
    });
    return array;
}

console.log(permutation(str));
