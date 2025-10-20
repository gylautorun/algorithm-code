Array.prototype._reduceRight = function (callback /*, initialValue*/) {
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
        startIndex = arguments.length > 1 ? len - 1 : len - 2;

    if (arguments.length > 1) {
        initialValue = arguments[1];
    }
    else {
        if (!len) {
            throw new TypeError('Error: Reduce of empty array with no initial value');
        }
        initialValue = oldArr[len - 1];
    }

    for (var i = startIndex; i >= 0; i--) {
        initialValue = callback(initialValue, oldArr[i], i, oldArr);
    }
    return initialValue;
}

var array = [1, 2, 3, 4, 5];
var add = array._reduceRight(function (acc, cur, index, arr) {
    return acc + cur;
}, 12);
console.log(add) // 27

var array1 = [[0, 1], [2, 3], [4, 5]]._reduceRight(function (accumulator, currentValue) {
    return accumulator.concat(currentValue)
});

console.log(array1); // [ 4, 5, 2, 3, 0, 1 ]

