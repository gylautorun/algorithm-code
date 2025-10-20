Array.prototype._find = function (callback /*, thisArg*/) {
    if (this == null) {
        // undefined == null
        throw new TypeError('null or undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function');
    }
    var oldArr = Object(this),
        len = +oldArr.length || 0,
        thisArg = arguments.length > 1 ? arguments[1] : void 0;

    for (var i = 0; i < len; i++) {
        if (callback.call(thisArg, oldArr[i], i, oldArr)) {
            return oldArr[i];
        }
    }

    return undefined;
};

var array = [{b: 32}, {b: 132}, {b: 232}, {b: 332}, {b: 432}];

var found = array._find(function(val) {
    return val.b > 105;
});

console.log(found);