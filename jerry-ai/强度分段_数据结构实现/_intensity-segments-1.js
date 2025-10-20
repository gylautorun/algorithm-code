

// class IntensitySegments {
//     constructor() {
//         this.map = new Map();
//         this.keys = [];
//     }
//     /**
//      * 二分查找: 在 keys 数组中查找第一个 >= target 的索引
//      */
//     getLowerBoundIndex(keys, target) {
//         let left = 0;
//         let right = keys.length;
//         while (left < right) {
//             const mid = Math.floor((left + right) / 2);
//             if (keys[mid] < target) {
//                 left = mid + 1;
//             } else {
//                 right = mid;
//             }
//         }
//         return left;
//     }
//     /**
//      * 金额添加到从 from ~ to 范围的强度中
//      */
//     add(from, to, amount) {
//         // 保证需要在范围内
//         if (from >= to) {
//             throw Error('from 必须小于 to 设定值');
//         }
//         if (this.keys.length === 0) {
//             this.map.set(from, amount);
//             this.map.set(to, 0);
//             this.keys = [from, to];
//             // 合并相同的值
//             this.mergeSameValues();
//             return;
//         }
//         // [[10,1], [30,0]]
//         // (20, 40, 1);
//         // [[10,1], [20,2], [30,1], [40,0]]

//         // [[10,1],[30,0]]
//         // (5, 15, 1);
//         // [[5,1], [10,2], [15,1], [30,0]]
//         const keys = this.keys;
//         const fromIndex = this.getLowerBoundIndex(keys, from);
//         const toIndex = this.getLowerBoundIndex(keys, to);
//         // console.log('fromIndex: ', fromIndex, 'toIndex: ', toIndex);

//         // 处理 from
//         const startValue = fromIndex > 0 ? this.map.get(this.keys[fromIndex - 1]) : 0;
//         this.map.set(from, (this.map.get(from) || startValue) + amount);
//         // 处理 to
//         const endValue = toIndex > 0 ? this.map.get(this.keys[toIndex - 1]) : 0;
//         this.map.set(to, this.map.get(to) || endValue);


//         // 更新 from 和 to 之间的值
//         for (let i = fromIndex; i < toIndex; i++) {
//             const key = this.keys[i];
//             if (key !== from && key !== to) {
//                 this.map.set(key, this.map.get(key) + amount);
//             }
//         }
//         this.updateToKeys(from, to, fromIndex, toIndex);
//         // 合并相同的值
//         this.mergeSameValues();

//     }
//     /**
//      * from ~ to 范围的强度设置为金额
//      */
//     set(from, to, amount) {
//         // 保证需要在范围内
//         if (from >= to) {
//             throw Error('from 必须小于 to 设定值');
//         }
//         if (this.keys.length === 0) {
//             this.map.set(from, amount);
//             this.map.set(to, 0);
//             this.keys = [from, to];
//             // 合并相同的值
//             this.mergeSameValues();
//             return;
//         }

//         const keys = this.keys;
//         const fromIndex = this.getLowerBoundIndex(keys, from);
//         const toIndex = this.getLowerBoundIndex(keys, to);
//         console.log('fromIndex: ', fromIndex, 'toIndex: ', toIndex);

//         // 更新from 
//         this.map.set(from, amount);
//         // 更新 to
//         const endValue = toIndex > 0 ? this.map.get(this.keys[toIndex - 1]) : 0;
//         this.map.set(to, this.map.get(to) || endValue); 

//         // 更新 from 和 to 之间的值
//         for (let i = fromIndex + 1; i < toIndex; i++) {
//             const key = this.keys[i];
//             if (key === from || key === to) {
//                 continue;
//             }
//             this.map.set(key, amount);
//         }
//         this.updateToKeys(from, to, fromIndex, toIndex);

//         // 合并相同的值
//         this.mergeSameValues();
//     }

//     /**
//      * 将新键添加到键数组中
//      * @param {number} from - 范围的起始值
//      * @param {number} to - 范围的结束值
//      * @param {number} fromIndex - from 的下界索引
//      * @param {number} toIndex - to 的下界索引
//      */
//     updateToKeys(from, to, fromIndex, toIndex) {
//         const result = [];
//         const keys = this.keys;
//         // // 添加 from 之前的 keys
//         // for (let i = 0; i < fromIndex; i++) {
//         //     result.push(keys[i]);
//         // }
//         // // 添加 from（可能不存在）
//         // if (fromIndex === 0 || keys[fromIndex - 1] !== from) {
//         //     result.push(from);
//         // }
//         // // 添加 from 和 to 之间的 keys
//         // for (let i = fromIndex; i < toIndex; i++) {
//         //     const key = keys[i];
//         //     if (key !== from && key !== to) {
//         //         result.push(key);
//         //     }
//         // }
//         // // 添加 to（可能不存在）
//         // if (toIndex === 0 || keys[toIndex - 1] !== to) {
//         //     result.push(to);
//         // }
//         // // 添加 to 之后的 keys
//         // for (let i = toIndex; i < keys.length; i++) {
//         //     result.push(keys[i]);
//         // }
//         // 添加 from 之前的 keys
//         for (let i = 0; i < fromIndex; i++) {
//             result.push(keys[i]);
//         }
//         // 添加 from
//         if (fromIndex === 0 || keys[fromIndex] !== from) {
//             result.push(from);
//         }
//         // 添加 from 和 to 之间的 keys
//         for (let i = fromIndex + 1; i < toIndex; i++) {
//             result.push(keys[i]);
//         }
//         // 添加 to
//         if (toIndex === 0 || typeof keys[toIndex] !== 'undefined' && keys[toIndex] !== to) {
//             result.push(to);
//         }
//         // 添加 to 之后的 keys
//         for (let i = toIndex + 1; i < keys.length; i++) {
//             result.push(keys[i]);
//         }
//         this.keys = result;
//     }

//     /**
//      * 合并 map 中合并相邻相同的值
//      */
//     mergeSameValues() {
//         if (this.keys.length === 0) {
//             return;
//         }
//         const prev = this.keys[0];
//         const result = [prev];
//         let prevValue = this.map.get(prev);
//         // 处理相邻两个相同值的情况
//         for (let i = 1; i < this.keys.length; i++) {
//             const key = this.keys[i];
//             const value = this.map.get(key);
//             // 如果值相同，则删除该键
//             if (value === prevValue) {
//                 this.map.delete(key);
//             }
//             else {
//                 result.push(key);
//                 prevValue = value;
//             }
//         }
//         // 处理值都是 0
//         if (this.map.get(result[0]) === 0
//             && result.every(k => this.map.get(k) === 0)) {
//             result.forEach(k => this.map.delete(k));
//             this.keys = [];
//         }
//         else {
//             this.keys = result;
//         }
//     }

//     /**
//      * 字符串表示形式
//      */
//     toString() {
//         const result = [];
//         for (let key of this.keys) {
//             result.push([key, this.map.get(key)]);
//         }
//         const res = JSON.stringify(result);
//         console.log(res);

//         return res;
//     }
// };

class IntensitySegments {
    constructor() {
        this.map = new Map();
        this.keys = [];
    }

    _getLowerBoundIndex(target) {
        let left = 0;
        let right = this.keys.length;
        while (left < right) {
            const mid = left + Math.floor((right - left) / 2);
            if (this.keys[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }

    add(from, to, amount) {
        if (from >= to) return;

        if (this.keys.length === 0) {
            if (amount !== 0) {
                this.map.set(from, amount);
                this.map.set(to, 0);
                this.keys = [from, to];
            }
            return;
        }

        const fromIndex = this._getLowerBoundIndex(from);
        const toIndex = this._getLowerBoundIndex(to);

        // 处理 from 点
        const startValue = fromIndex > 0 ? this.map.get(this.keys[fromIndex - 1]) : 0;
        this.map.set(from, (this.map.get(from) || startValue) + amount);

        // 处理 to 点
        const endValue = toIndex > 0 ? this.map.get(this.keys[toIndex - 1]) : 0;
        this.map.set(to, this.map.get(to) || endValue);

        // 更新区间内部
        for (let i = fromIndex; i < toIndex; i++) {
            const key = this.keys[i];
            if (key !== from && key !== to) {
                this.map.set(key, this.map.get(key) + amount);
            }
        }

        this._updateKeys(from, to, fromIndex, toIndex);
        this._merge();
    }

    set(from, to, amount) {
        if (from >= to) return;

        // 确保端点存在
        this.add(from, to, 0);

        const fromIndex = this._getLowerBoundIndex(from);
        const toIndex = this._getLowerBoundIndex(to);

        // 设置 from 点的值
        this.map.set(from, amount);
        
        // 设置区间内部的值
        for (let i = fromIndex + 1; i < toIndex; i++) {
            const key = this.keys[i];
            if (key < to) {
                this.map.set(key, amount);
            }
        }

        // 确保 to 点的值是前一个区间的延续
        if (toIndex < this.keys.length && this.keys[toIndex] === to) {
            const prevValue = toIndex > 0 ? this.map.get(this.keys[toIndex - 1]) : 0;
            this.map.set(to, prevValue);
        }

        this._merge();
    }

    _updateKeys(from, to, fromIndex, toIndex) {
        const newKeys = [];
        
        // 添加 from 之前的 keys
        for (let i = 0; i < fromIndex; i++) {
            newKeys.push(this.keys[i]);
        }
        
        // 添加 from（如果不存在）
        if (fromIndex === 0 || this.keys[fromIndex - 1] !== from) {
            newKeys.push(from);
        }
        
        // 添加 from 和 to 之间的 keys
        for (let i = fromIndex; i < toIndex; i++) {
            if (this.keys[i] !== from && this.keys[i] !== to) {
                newKeys.push(this.keys[i]);
            }
        }
        
        // 添加 to（如果不存在）
        if (toIndex === 0 || this.keys[toIndex - 1] !== to) {
            newKeys.push(to);
        }
        
        // 添加 to 之后的 keys
        for (let i = toIndex; i < this.keys.length; i++) {
            newKeys.push(this.keys[i]);
        }
        
        this.keys = newKeys;
    }

    _merge() {
        if (this.keys.length === 0) return;

        const newKeys = [this.keys[0]];
        let prevValue = this.map.get(this.keys[0]);

        for (let i = 1; i < this.keys.length; i++) {
            const currentKey = this.keys[i];
            const currentValue = this.map.get(currentKey);
            
            if (currentValue !== prevValue) {
                newKeys.push(currentKey);
                prevValue = currentValue;
            } else {
                this.map.delete(currentKey);
            }
        }

        this.keys = newKeys;
    }

    toString() {
        const result = [];
        for (let i = 0; i < this.keys.length; i++) {
            const key = this.keys[i];
            const value = this.map.get(key);
            if (value !== undefined) {
                result.push([key, value]);
            }
        }
        console.log(JSON.stringify(result));
        return JSON.stringify(result);
    }
}

// const segments = new IntensitySegments();
// segments.toString(); // Should be "[]"
// segments.add(10, 30, 1);
// segments.toString(); // Should be: "[[10,1],[30,0]]"
// segments.add(20, 40, 1);
// segments.toString(); // Should be: "[[10,1],[20,2],[30,1],[40,0]]"
// segments.add(10, 40, -2);
// segments.toString(); // Should be: "[[10,-1],[20,0],[30,-1],[40,0]]"
console.log('===========================');
// const segments2 = new IntensitySegments();
// segments2.toString(); // Should be "[]"
// segments2.add(10, 30, 1);
// segments2.toString(); // Should be "[[10,1],[30,0]]"
// segments2.add(20, 40, 1);
// segments2.toString(); // Should be "[[10,1],[20,2],[30,1],[40,0]]"
// segments2.add(10, 40, -1);
// segments2.toString(); // Should be "[[20,1],[30,0]]"
// segments2.add(10, 40, -1);
// segments2.toString(); // Should be "[[10,-1],[20,0],[30,-1],[40,0]]"
console.log('===========================');
// const segments3 = new IntensitySegments();
// segments3.toString(); // Should be "[]"
// segments3.set(10, 30, 1);
// segments3.toString(); // Should be: "[[10,1],[30,0]]"
// segments3.set(20, 40, 1);
// segments3.toString(); // Should be: "[[10,1],[30,0]]"
// segments3.set(10, 40, -2);
// segments3.toString(); // Should be: "[[10,-2],[30,0]]"
console.log('===========================');
const segments4 = new IntensitySegments();
segments4.toString(); // Should be "[]"
segments4.set(10, 30, 1);
segments4.toString(); // Should be "[[10,1],[30,0]]"
segments4.set(20, 40, 1);
segments4.toString(); // Should be "[[10,1],[30,0]]"
segments4.set(10, 40, -1);
segments4.toString(); // Should be "[[10,-1],[30,0]]"
segments4.set(10, 40, -4);
segments4.toString(); // Should be "[[10,-4],[30,0]]"
console.log('===========================');
const seg = new IntensitySegments();
// seg.add(10, 30, 1);  
// seg.toString(); // [[10,1], [30,0]]
// seg.add(5, 15, 1);
// seg.toString(); // [[5,1], [10,2], [15,1], [30,0]]
console.log('===========================');
// const seg2 = new IntensitySegments();
// seg2.add(10, 30, 0);
// seg2.toString(); // []
// seg2.add(10, 30, 1);
// seg2.toString();   // [[10,1], [30,0]]
// seg2.add(20, 40, 1);  
// seg2.toString(); // [[10,1], [20,2], [30,1], [40,0]]
// seg2.add(50, 60, 1);
// seg2.toString(); // [[10,1], [20,2], [30,1], [40,0], [50,1], [60,0]]
console.log('===========================');