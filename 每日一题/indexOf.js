// 题目一
// 请模拟一个数组的indexOf，需要与数组自身的indexOf用法相同。

/**
 * arr.indexOf(searchElement[, fromIndex])
 * searchElement: 要查找的元素
 * fromIndex 可选:
 *    开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。
 *    如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找 ，以此类推。
 *    注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0.
 *
 * 返回值
 *    首个被找到的元素在数组中的索引位置; 若没有找到则返回 -1
 *
 */
Array.prototype.arrayIndexOf = function() {

    if (Object.prototype.toString.call(this) !== '[object Array]') {
        throw new TypeError('Must be an array');
    }

    let that = Object(this);
    let searchElement = arguments[0];
    let fromIndex = arguments.length > 1 ? arguments[1] : 0;
    let len = this.length;

    if(len === 0 || Math.abs(fromIndex) >= len) return -1;

    let startIndex = Math.max(fromIndex, 0);

    while(startIndex < len){
        if(startIndex in that && searchElement === that[startIndex]) return startIndex;
        startIndex++;
    }
    return -1;

};

const arr = [1,2,3,4,3,5]

// 输出2
console.log(arr.arrayIndexOf(3))

// 输出 -1
console.log(arr.arrayIndexOf(6))

// 输出 4
console.log(arr.arrayIndexOf(3, 3))

// 题目二
// 请模拟一个字符串的indexOf,需要与字符串自身的indexOf用法相同。

/**
 * str.indexOf(searchValue [, fromIndex])
 searchValue: 要被查找的字符串值
        如果没有提供确切地提供字符串，searchValue 会被强制设置为 "undefined"， 然后在当前字符串中查找这个值。
        举个例子：'undefined'.indexOf() 将会返回0，因为 undefined 在位置0处被找到，但是 'undefine'.indexOf() 将会返回 -1 ，因为字符串 'undefined' 未被找到。
 fromIndex 可选
        数字表示开始查找的位置。可以是任意整数，默认值为 0。
        如果 fromIndex 的值小于 0，或者大于 str.length ，那么查找分别从 0 和str.length 开始。
    （fromIndex 的值小于 0，等同于为空情况； fromIndex 的值大于 str.length ，那么结果会直接返回 -1 ）
        举个例子，'hello world'.indexOf('o', -5) 返回 4 ，因为它是从位置0处开始查找，然后 o 在位置4处被找到。
        另一方面，'hello world'.indexOf('o', 11) （或 fromIndex 填入任何大于11的值）将会返回 -1 ，因为开始查找的位置11处，已经是这个字符串的结尾了。
 */
String.prototype.stringIndexOf = function() {
    if (Object.prototype.toString.call(this) !== '[object String]') {
        throw new TypeError('Must be an string');
    }

    let searchElement = arguments[0];
    let fromIndex = arguments.length > 1 ? arguments[1] : 0;

    if(this.length === 0 || Math.abs(fromIndex) >= this.length) return -1;

    let regex = new RegExp(`${searchElement}`, 'ig')
    regex.lastIndex = fromIndex;
    let result = regex.exec(this)
    return result ? result.index : -1;
}

const str = '123445252'

// 输出 3
console.log(str.stringIndexOf('4'));

// 输出4
console.log(str.stringIndexOf('45'));

// 输出 7
console.log(str.stringIndexOf('52', 6));
