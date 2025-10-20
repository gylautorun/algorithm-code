// 內存消耗严重
function isUnique(str) {
    // if (str.length < 2) {
    //     return true;
    // }
    // const result = {};
    // for (let i = 0; i < str.length; i++) {
    //     if (!result[str[i]]) {
    //         result[str[i]] = true;
    //     }
    //     else {
    //         delete result;
    //         return false;
    //     }
    // }
    // delete result;
    // return true;

    // lastIndexOf
    if (str.length < 2) {
        return true;
    }
    for (let i = 0; i < str.length; i++) {
        if (str.lastIndexOf(str[i]) !== i) {
            return false;
        }
    }
    return true;
}
