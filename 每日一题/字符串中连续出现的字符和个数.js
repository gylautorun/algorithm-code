// 请找出字符串中连续出现最多的字符和个数
const str1 = 'abcaakjbb'
const str2 = 'abbkejsbcccwqaa'

function getMaxCharacters(str) {
    const map = {};
    let arr = str.match(/(\w)\1+/g);
    let max = arr[0].length;
    arr.map(its => max = Math.max(max, its.length))
    const maxArr = arr.filter(its => its.length === max)
    maxArr.forEach(v => {
        map[v[0]] = v.length
    })
    return map
}

function getMax(str) {
    const match = str.match(/(.)\1+/g)
    match.sort((x,y) => y.length - x.length)
    const len = match[0].length
    const obj = {}
    for(let item of match) {
        if(item.length <len) {
            break
        }else{
            obj[item[0]] = len
        }
    }
    return obj
}

console.log(getMaxCharacters(str1));
console.log(getMax(str1));
console.log(getMaxCharacters(str2));
console.log(getMax(str2));