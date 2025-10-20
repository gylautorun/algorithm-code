// indexOf 下标去重法
Array.prototype.removeRepeatOne = function () {
    let res = this.length ? [this[0]] : [];
    for (let i = 1; i < this.length; i++) {
        if (this.indexOf(this[i]) === i) { // 当前值匹配下标是否为当前下标
            res.push(this[i]);
        }
    }
    return res;
};

// 比较 indexOf
Array.prototype.removeRepeatTwo = function () {
    let res = [];
    for (let i = 0; i < this.length; i++) {
        if (res.indexOf(this[i]) === -1) { // 新数组中是否已经包含当前遍历值
            res.push(this[i]);
        }
    }
    return res;
};

// hash去重
Array.prototype.removeRepeatThree = function () {
    let res = [], hash = {};
    for (let i = 0; i < this.length; i++) {
        if (!hash[this[i]]) { // hash表中是否有当前项
            hash[this[i]] = true;
            res.push(this[i]);
        }
    }
    return res;
};

// Set去重 IE基本不支持(<11)
Array.prototype.removeRepeatFour = function () {
    // let res = new Set();
    // for (let i = 0; i < this.length; i++) {
    //     res.add(this[i]);
    // }
    // return res;

    // 或
    return Array.from(new Set(this))
};


// 排序后相邻去重法, 改变顺序
Array.prototype.removeRepeatFive = function () {
    this.sort(); // 默认从小到大:(a, b) => a - b; 大到小:(a, b) => b - a;
    let res = this.length ? [this[0]] : [];
    for (let i = 1; i < this.length; i++) {
        if (this[i] !== this[i - 1]) { // 当前是否和之前数相等
            res.push(this[i]);
        }
    }
    return res;

};

// 多维数组去重 => 对里面的数组进行toString()，转化为字符串再比较，不能直接进行数组比较
// removeRepeatTwo
Array.prototype.moreRemoveRepeatTwo = function () {
    let res = [];
    for (let i = 0; i < this.length; i++) {
        let flag = false;
        for (let j = 0; j < res.length; j++) {
            if (this[i].toString() === res[j].toString() && (typeof this[i]) === (typeof res[j])) {
                flag = true;
            }
        }
        if (!flag) {
            res.push(this[i]);
        }
    }

    return res;
};


/**
 * JavaScrip数组去重（进阶版- 包含NaN,undefined,null）
 * NaN有两中通用判定方法和数组中一种判定方法：
 *      一个是绝对不全等于(=== || ==)自身
 *      一个是ES6的isNaN()
 *      数组原型链上的Array.prototype.includes()
 * 不等特性,需要借助占位符
 * @return {Array}
 */
Array.prototype.moreBestRemoveRepeat = function () {
    let res = [], flag = true;
    for (let i = 0; i < this.length; i++) {
        // 判断是否为 NaN === NaN => false, NaN == NaN => false
        if (this[i] !== this[i]) {
            flag && res.indexOf(this[i]) === -1 ? res.push(this[i]) : '';
            flag = false;
        }
        else {
            // true, false, undefined, null 可以通过 res.indexOf(this[i]) === -1 找到判断
            res.indexOf(this[i]) === -1 ? res.push(this[i]) : '';
        }
    }

    return res;
};

let arr = [1, 1, 'true', true, true, 5, 'F', false, undefined, null, null, undefined, NaN, 0, 1, 'a', 'a', NaN, 'NaN'];
console.log(arr.moreBestRemoveRepeat())







