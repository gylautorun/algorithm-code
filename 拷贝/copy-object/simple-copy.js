//slice   concat  浅拷贝
//JSON.stringify  深拷贝


//concat
let arr = ['old', 1, true, null, undefined, ['aOld'], {old: 'arrNew'}];
let new_arr = arr.concat();
new_arr[0] = 'new';
new_arr[5][0] = 'aNew';
new_arr[6].old = 'new_arrNew';
console.log(arr);// [ 'old', 1, true, null, undefined, ['aNew'], {old: 'new_arrNew'} ]
console.log(new_arr);// [ 'new', 1, true, null, undefined, ['aNew'], {old: 'new_arrNew'} ]
//slice
let arrSlice = ['old', 1, true, null, undefined, ['aOld'], {old: 'arrNew'}];
let new_arrSlice = arrSlice.concat();
new_arrSlice[0] = 'new';
new_arrSlice[5][0] = 'aNew';
new_arrSlice[6].old = 'new_arrNew';
console.log(arrSlice);// [ 'old', 1, true, null, undefined, ['aNew'], {old: 'new_arrNew'} ]
console.log(new_arrSlice);// [ 'new', 1, true, null, undefined, ['aNew'], {old: 'new_arrNew'} ]
//slice 和 concat 是一种浅copy,如果数组元素是基本类型，就会拷贝一份，互不影响，而如果是对象或者数组，就会只拷贝对象和数组的引用，
// 这样我们无论在新旧数组进行了修改，两者都会发生变化

//simple-copy 实现
var shallowCopy = function(obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是对象
    var newObj = obj instanceof Array ? [] : {};
    // 遍历obj，并且判断是obj的属性才拷贝
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
var obj = [{a: 'a1'}, {b: 'b1'}, {c: 'c1'}, [{d1: 'd1'}, {d2: 'd2'}]];
var newObj = shallowCopy(obj);
newObj[1].b = 'bb';
console.log(obj);//[{a: 'a1'}, {b: 'b'}, {c: 'c1'}, [{d1: 'd1'}, {d2: 'd2'}]];
console.log(newObj);//[{a: 'a1'}, {b: 'bb'}, {c: 'c1'}, [{d1: 'd1'}, {d2: 'd2'}]];





















