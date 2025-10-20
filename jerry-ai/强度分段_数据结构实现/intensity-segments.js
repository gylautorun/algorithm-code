class IntensitySegments {
    constructor() {
        this.map = new Map();
        // 边界值设置
        this.map.set(Number.MIN_VALUE, 0);
        this.map.set(Number.MAX_VALUE, 0);
        // 边界值数组
        this.keys = [Number.MIN_VALUE, Number.MAX_VALUE];

    }
    /**
     * 二分查找: 在 keys 数组中查找第一个 >= target 的索引
     */
    getLowerBoundIndex(keys, target) {
        let left = 0;
        let right = keys.length - 1;
        while (left + 1 < right) {
            const mid = Math.floor((left + right) / 2);
            if (keys[mid] <= target) {
                left = mid;
            } else {
                right = mid;
            }
        }
        return left;
    }
    /**
     * 金额添加到从 from ~ to 范围的强度中
     */
    add(from, to, amount) {
        // 保证需要在范围内
        if (from >= to) {
            throw Error('from 必须小于 to 设定值');
        }
        if (amount === 0) {
            // 金额为 0，不需要做任何处理, 因为会合并相同的值
            return;
        }
        const keys = this.keys;

        const fromIndex = this.getLowerBoundIndex(keys, from);
        const toIndex = this.getLowerBoundIndex(keys, to);
        // console.log('fromIndex: ', fromIndex, 'toIndex: ', toIndex);
        

        // 更新from 
        const startValue = this.map.get(keys[fromIndex]);
        this.map.set(from, startValue + amount);
        // 更新to
        const endValue = this.map.get(keys[toIndex]);
        this.map.set(to, endValue);


        // 更新 from 和 to 之间的范围
        for (let i = fromIndex + 1; i <= toIndex; i++) {
            if (keys[i] === from || keys[i] === to) {
                continue;
            }
            const value = this.map.get(keys[i]);
            this.map.set(keys[i], value + amount);
        }
        this.updateToKeys(from, to, fromIndex, toIndex);

        // 合并相同的值
        this.mergeSameValues();

    }
    /**
     * from ~ to 范围的强度设置为金额
     */
    set(from, to, amount) {
        // 保证需要在范围内
        if (from >= to) {
            throw Error('from 必须小于 to 设定值');
        }
        const keys = this.keys;
        const fromIndex = this.getLowerBoundIndex(keys, from);
        const toIndex = this.getLowerBoundIndex(keys, to);
        // console.log('fromIndex: ', fromIndex, 'toIndex: ', toIndex);

        this.map.set(from, amount);

        const endValue = this.map.get(keys[toIndex]);
        this.map.set(to, endValue);


        for (let i = fromIndex + 1; i <= toIndex; i++) {
            if (keys[i] === from || keys[i] === to) {
                continue;
            }
            this.map.set(keys[i], amount);
        }
        this.updateToKeys(from, to, fromIndex, toIndex);


        // 合并相同的值
        this.mergeSameValues();


    }

    /**
     * 将新键添加到键数组中
     * @param {number} from - 范围的起始值
     * @param {number} to - 范围的结束值
     * @param {number} fromIndex - from 的下界索引
     * @param {number} toIndex - to 的下界索引
     */
    updateToKeys(from, to, fromIndex, toIndex) {
        const result = [];
        const keys = this.keys;
        for (let i = 0; i <= fromIndex; i++) {
            result.push(keys[i]);
        }
        if (keys[fromIndex] !== from) {
            result.push(from);
        }
        for (let i = fromIndex + 1; i <= toIndex; i++) {
            result.push(keys[i]);
        }
        if (keys[toIndex] !== to) {
            result.push(to);
        }
        for (let i = toIndex + 1; i < keys.length; i++) {
            result.push(keys[i]);
        }
        this.keys = result;
    }

    /**
     * 合并 map 中相同的值
     */
    mergeSameValues() {
        const keys = this.keys;
        const result = [];
        let prev = keys[0];
        result.push(prev);
        let prevValue = this.map.get(prev);
        for (let i = 1; i < keys.length - 1; i++) {
            let key = keys[i];
            let value = this.map.get(key);
            if (value === prevValue) {
                this.map.delete(key);
            } else {
                result.push(key);
            }
            prev = key;
            prevValue = value;
        }
        result.push(keys[keys.length - 1]);
        this.keys = result;
    }

    /**
     * 字符串表示形式
     */
    toString() {
        const keys = this.keys;
        // console.log('keys', keys);
        const result = [];
        for (let key of keys) {
            if (key === Number.MIN_VALUE || key === Number.MAX_VALUE) {
                continue;
            }
            result.push([key, this.map.get(key)]);
        }
        const res = JSON.stringify(result);
        console.log(res);

        return res;
    }
};

const segments = new IntensitySegments();
segments.toString(); // Should be "[]"
segments.add(10, 30, 1);
segments.toString(); // Should be: "[[10,1],[30,0]]"
segments.add(20, 40, 1);
segments.toString(); // Should be: "[[10,1],[20,2],[30,1],[40,0]]"
segments.add(10, 40, -2);
segments.toString(); // Should be: "[[10,-1],[20,0],[30,-1],[40,0]]"
console.log('===========================');
const segments2 = new IntensitySegments();
segments2.toString(); // Should be "[]"
segments2.add(10, 30, 1);
segments2.toString(); // Should be "[[10,1],[30,0]]"
segments2.add(20, 40, 1);
segments2.toString(); // Should be "[[10,1],[20,2],[30,1],[40,0]]"
segments2.add(10, 40, -1);
segments2.toString(); // Should be "[[20,1],[30,0]]"
segments2.add(10, 40, -1);
segments2.toString(); // Should be "[[10,-1],[20,0],[30,-1],[40,0]]"
console.log('===========================');
const segments3 = new IntensitySegments();
segments3.toString(); // Should be "[]"
segments3.set(10, 30, 1);
segments3.toString(); // Should be: "[[10,1],[30,0]]"
segments3.set(20, 40, 1);
segments3.toString(); // Should be: "[[10,1],[30,0]]"
segments3.set(10, 40, -2);
segments3.toString(); // Should be: "[[10,-2],[30,0]]"
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
seg.add(10, 30, 1);  
seg.toString(); // [[10,1], [30,0]]
seg.add(5, 15, 1);
seg.toString(); // [[5,1], [10,2], [15,1], [30,0]]
console.log('===========================');
const seg2 = new IntensitySegments();
seg2.add(10, 30, 0);
seg2.toString(); // []
seg2.add(10, 30, 1);
seg2.toString();   // [[10,1], [30,0]]
seg2.add(20, 40, 1);  
seg2.toString(); // [[10,1], [20,2], [30,1], [40,0]]
seg2.add(50, 60, 1);
seg2.toString(); // [[10,1], [20,2], [30,1], [40,0], [50,1], [60,0]]
console.log('===========================');

function testIntensitySegments() {
    // 测试1: 空初始化
    const seg1 = new IntensitySegments();
    seg1.toString(); // []
    
    // 测试2: 添加非零区间
    const seg2 = new IntensitySegments();
    seg2.add(10, 20, 5);
    seg2.toString(); // [[10,5],[20,0]]
    
    // 测试3: 重叠区间相加
    seg2.add(15, 25, 3);
    seg2.toString(); // [10,5],[15,8],[20,3],[25,0]]
    
    // 测试4: 添加零值区间
    seg2.add(12, 18, 0);
    seg2.toString(); // [[10,5],[15,8],[20,3],[25,0]]
    
    // 测试5: 设置区间值
    seg2.set(15, 22, 10);
    seg2.toString(); // [[10,5],[15,10],[22,3],[25,0]]
    
    // 测试6
    seg2.add(10, 25, -10);
    seg2.toString(); // [[10,-5],[15,0],[22,-7],[25,0]]
    
    // 测试7
    const seg3 = new IntensitySegments();
    seg3.add(10, 20, 5);
    seg3.toString(); // [[10,5],[20,0]]
    seg3.add(10, 20, -5);
    seg3.toString(); // []
    
    // 测试8: 连续set操作
    const seg4 = new IntensitySegments();
    seg4.set(10, 20, 3);
    seg4.toString(); // [[10,3],[20,0]]
    seg4.set(15, 25, 7);
    seg4.toString(); // [[10,3],[15,7],[25,0]]
    
    // 测试9: 小数强度
    const seg5 = new IntensitySegments();
    seg5.add(10, 20, 2.5);
    seg5.toString(); // [[10,2.5],[20,0]]
    seg5.add(15, 25, 1.5);
    seg5.toString(); // [[10,2.5],[15,4],[20,1.5],[25,0]]
    
    // 测试10: 大数区间
    const seg6 = new IntensitySegments();
    seg6.add(1000000, 2000000, 1);
    seg6.toString(); // [[1000000,1],[2000000,0]]
    seg6.add(1500000, 2500000, 1);
    seg6.toString(); // [[1000000,1],[1500000,2],[2000000,1],[2500000,0]]
}

testIntensitySegments();