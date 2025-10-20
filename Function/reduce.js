Array.prototype._reduce = function (callback /*, initialValue*/) {
    if (this == null) {
        // undefined == null
        throw new TypeError('null or undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function');
    }

    var oldArr = Object(this),
        len = +oldArr.length || 0,
        initialValue,
        startIndex = arguments.length > 1 ? 0 : 1;

    if (arguments.length > 1) {
        initialValue = arguments[1];
    }
    else {
        if (!len) {
            throw new TypeError('Error: Reduce of empty array with no initial value');
        }
        initialValue = oldArr[0];
    }

    for (var i = startIndex; i < len; i++) {
        initialValue = callback(initialValue, oldArr[i], i, oldArr);
    }
    return initialValue;
}

var array = [1, 2, 3, 4, 5];

var add = array._reduce(function (acc, cur, index, arr) {
    return acc + cur;
}, 12);
console.log(add) // 115

const array1 = [[0, 1], [2, 3], [4, 5]]._reduce(
    (accumulator, currentValue) => {
        return accumulator.concat(currentValue)
    }
);

console.log(array1); //  [0, 1, 2, 3, 4, 5 ]
