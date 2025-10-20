//slice   concat  浅拷贝
//JSON.stringify  深拷贝

// JSON.stringify
// 虽然能实现深copy, 但是不能copy函数
var arrJSON = ['old', 1, true, ['old1', 'old2'], {old: 1}];
var new_arrJSON = JSON.parse( JSON.stringify(arrJSON) );
console.log(new_arrJSON);// 不能拷贝函数 [ 'old', 1, true, [ 'old1', 'old2' ], { old: 1 } ]
new_arrJSON[4].old = 2;
console.log(arrJSON);//[ 'old', 1, true, [ 'old1', 'old2' ], { old: 1 } ]
console.log(new_arrJSON);//[ 'old', 1, true, [ 'old1', 'old2' ], { old: 2 } ]

var arrFunction = [function(){
    console.log(a)
}, {
    b: function(){
        console.log(b)
    }
}];
var new_arrFunction = JSON.parse(JSON.stringify(arrFunction));
console.log(new_arrFunction);//[ null, {} ]


// deep-copy 的实现
var deepCopy = function(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}
var obj = [{a: 'a1'}, {b: 'b1'}, {c: 'c1'}, [{d1: 'd1'}, {d2: 'd2'}]];
var newObj = deepCopy(obj);
newObj[1].b = 'bb';
console.log(obj);//[{a: 'a1'}, {b: 'b1'}, {c: 'c1'}, [{d1: 'd1'}, {d2: 'd2'}]];
console.log(newObj);//[{a: 'a1'}, {b: 'bb'}, {c: 'c1'}, [{d1: 'd1'}, {d2: 'd2'}]];
