var arr = [1,1,2,3,3,4,4,8,8, 9];

function getSingle(numList) {
    return numList.filter(function (value, i) {
        return value !== numList[i - 1] && value !== numList[i + 1];
    });
}

console.log(getSingle(arr));