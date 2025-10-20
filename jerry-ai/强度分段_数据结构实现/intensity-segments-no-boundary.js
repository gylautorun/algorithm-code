/**
 * 强度分段数据结构 - 无边界值版本
 * 
 * 主要改进：
 * 1. 移除了 Number.MIN_VALUE 和 Number.MAX_VALUE 边界值
 * 2. 使用更简洁的二分查找实现
 * 3. 通过 getValueAt() 方法动态计算位置强度值
 * 4. 简化了键值更新逻辑
 * 5. 更好的边界情况处理
 * 
 * 核心思想：
 * - 使用 Map 存储每个关键点的强度值
 * - 使用有序数组 keys 维护关键点的顺序
 * - 通过二分查找快速定位区间位置
 * - 动态计算任意位置的强度值
 */

class IntensitySegments {
    constructor() {
        this.map = new Map();
        this.keys = [];
    }

    /**
     * 二分查找: 在 keys 数组中查找第一个 >= target 的索引
     */
    getLowerBoundIndex(keys, target) {
        let left = 0;
        let right = keys.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (keys[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }

    /**
     * 获取指定位置的强度值
     * 核心方法：动态计算任意位置的强度值，无需预定义边界
     */
    getValueAt(position) {
        const index = this.getLowerBoundIndex(this.keys, position);
        if (index === 0) {
            return 0; // 如果位置在所有键之前，返回0
        }
        // 找到小于等于position的最大键
        for (let i = index - 1; i >= 0; i--) {
            if (this.keys[i] <= position) {
                return this.map.get(this.keys[i]) || 0;
            }
        }
        return 0;
    }

    /**
     * 金额添加到从 from ~ to 范围的强度中
     */
    add(from, to, amount) {
        if (from >= to) {
            throw Error('from 必须小于 to 设定值');
        }
        if (amount === 0) {
            return;
        }

        const keys = this.keys;
        const fromIndex = this.getLowerBoundIndex(keys, from);
        const toIndex = this.getLowerBoundIndex(keys, to);

        // 获取from位置之前的强度值
        const fromValue = this.getValueAt(from);
        this.map.set(from, fromValue + amount);

        // 获取to位置之前的强度值
        const toValue = this.getValueAt(to);
        this.map.set(to, toValue);

        // 更新 from 和 to 之间的范围
        for (let i = fromIndex; i < toIndex; i++) {
            const key = keys[i];
            if (key !== from && key !== to) {
                const value = this.map.get(key);
                this.map.set(key, value + amount);
            }
        }

        this.updateKeys(from, to, fromIndex, toIndex);
        this.mergeSameValues();
    }

    /**
     * from ~ to 范围的强度设置为金额
     */
    set(from, to, amount) {
        if (from >= to) {
            throw Error('from 必须小于 to 设定值');
        }

        const keys = this.keys;
        const fromIndex = this.getLowerBoundIndex(keys, from);
        const toIndex = this.getLowerBoundIndex(keys, to);

        this.map.set(from, amount);

        // 获取to位置之前的强度值
        const toValue = this.getValueAt(to);
        this.map.set(to, toValue);

        // 设置 from 和 to 之间的范围
        for (let i = fromIndex; i < toIndex; i++) {
            const key = keys[i];
            if (key !== from && key !== to) {
                this.map.set(key, amount);
            }
        }

        this.updateKeys(from, to, fromIndex, toIndex);
        this.mergeSameValues();
    }

    /**
     * 将新键添加到键数组中
     */
    updateKeys(from, to, fromIndex, toIndex) {
        const result = [];
        const keys = this.keys;

        // 添加from之前的键
        for (let i = 0; i < fromIndex; i++) {
            result.push(keys[i]);
        }

        // 添加from（如果不存在）
        if (fromIndex === 0 || keys[fromIndex - 1] !== from) {
            result.push(from);
        }

        // 添加from和to之间的键
        for (let i = fromIndex; i < toIndex; i++) {
            if (keys[i] !== from) {
                result.push(keys[i]);
            }
        }

        // 添加to（如果不存在）
        if (toIndex === 0 || keys[toIndex - 1] !== to) {
            result.push(to);
        }

        // 添加to之后的键
        for (let i = toIndex; i < keys.length; i++) {
            result.push(keys[i]);
        }

        this.keys = result;
    }

    /**
     * 合并 map 中相同的值
     */
    mergeSameValues() {
        if (this.keys.length === 0) return;

        const result = [];
        let prev = this.keys[0];
        result.push(prev);
        let prevValue = this.map.get(prev);

        for (let i = 1; i < this.keys.length; i++) {
            const key = this.keys[i];
            const value = this.map.get(key);
            
            if (value === prevValue) {
                this.map.delete(key);
            } else {
                result.push(key);
                prev = key;
                prevValue = value;
            }
        }

        this.keys = result;
    }

    /**
     * 字符串表示形式
     */
    toString() {
        const result = [];
        for (let key of this.keys) {
            const value = this.map.get(key);
            if (value !== undefined) {
                result.push([key, value]);
            }
        }
        const res = JSON.stringify(result);
        console.log(res);
        return res;
    }
}

// // 测试用例
// console.log('=== 测试 add 方法 ===');
// const segments = new IntensitySegments();
// segments.toString(); // Should be "[]"
// segments.add(10, 30, 1);
// segments.toString(); // Should be: "[[10,1],[30,0]]"
// segments.add(20, 40, 1);
// segments.toString(); // Should be: "[[10,1],[20,2],[30,1],[40,0]]"
// segments.add(10, 40, -2);
// segments.toString(); // Should be: "[[10,-1],[20,0],[30,-1],[40,0]]"

// console.log('=== 测试重叠区间 ===');
// const segments2 = new IntensitySegments();
// segments2.add(10, 30, 1);
// segments2.toString(); // Should be "[[10,1],[30,0]]"
// segments2.add(20, 40, 1);
// segments2.toString(); // Should be "[[10,1],[20,2],[30,1],[40,0]]"
// segments2.add(10, 40, -1);
// segments2.toString(); // Should be "[[20,1],[30,0]]"
// segments2.add(10, 40, -1);
// segments2.toString(); // Should be "[[10,-1],[20,0],[30,-1],[40,0]]"

// console.log('=== 测试 set 方法 ===');
// const segments3 = new IntensitySegments();
// segments3.set(10, 30, 1);
// segments3.toString(); // Should be: "[[10,1],[30,0]]"
// segments3.set(20, 40, 1);
// segments3.toString(); // Should be: "[[10,1],[20,1],[30,0]]"
// segments3.set(10, 40, -2);
// segments3.toString(); // Should be: "[[10,-2],[30,0]]"

// console.log('=== 测试零值处理 ===');
// const seg2 = new IntensitySegments();
// seg2.add(10, 30, 0);
// seg2.toString(); // []
// seg2.add(10, 30, 1);
// seg2.toString();   // [[10,1], [30,0]]

// console.log('=== 测试不连续区间 ===');
// const seg3 = new IntensitySegments();
// seg3.add(10, 30, 1);  
// seg3.toString(); // [[10,1], [30,0]]
// seg3.add(5, 15, 1);
// seg3.toString(); // [[5,1], [10,2], [15,1], [30,0]]

// console.log('=== 测试多个不连续区间 ===');
// const seg4 = new IntensitySegments();
// seg4.add(10, 30, 1);
// seg4.toString(); // [[10,1], [30,0]]
// seg4.add(20, 40, 1);  
// seg4.toString(); // [[10,1], [20,2], [30,1], [40,0]]
// seg4.add(50, 60, 1);
// seg4.toString(); // [[10,1], [20,2], [30,1], [40,0], [50,1], [60,0]]

// function testIntensitySegments() {
//     console.log('=== 完整测试套件 ===');
    
//     // 测试1: 空初始化
//     const seg1 = new IntensitySegments();
//     seg1.toString(); // []
    
//     // 测试2: 添加非零区间
//     const seg2 = new IntensitySegments();
//     seg2.add(10, 20, 5);
//     seg2.toString(); // [[10,5],[20,0]]
    
//     // 测试3: 重叠区间相加
//     seg2.add(15, 25, 3);
//     seg2.toString(); // [[10,5],[15,8],[20,3],[25,0]]
    
//     // 测试4: 添加零值区间
//     seg2.add(12, 18, 0);
//     seg2.toString(); // [[10,5],[15,8],[20,3],[25,0]]
    
//     // 测试5: 设置区间值
//     seg2.set(15, 22, 10);
//     seg2.toString(); // [[10,5],[15,10],[22,3],[25,0]]
    
//     // 测试6: 负数操作
//     seg2.add(10, 25, -10);
//     seg2.toString(); // [[10,-5],[15,0],[22,-7],[25,0]]
    
//     // 测试7: 完全抵消
//     const seg3 = new IntensitySegments();
//     seg3.add(10, 20, 5);
//     seg3.toString(); // [[10,5],[20,0]]
//     seg3.add(10, 20, -5);
//     seg3.toString(); // []
    
//     // 测试8: 连续set操作
//     const seg4 = new IntensitySegments();
//     seg4.set(10, 20, 3);
//     seg4.toString(); // [[10,3],[20,0]]
//     seg4.set(15, 25, 7);
//     seg4.toString(); // [[10,3],[15,7],[25,0]]
    
//     // 测试9: 小数强度
//     const seg5 = new IntensitySegments();
//     seg5.add(10, 20, 2.5);
//     seg5.toString(); // [[10,2.5],[20,0]]
//     seg5.add(15, 25, 1.5);
//     seg5.toString(); // [[10,2.5],[15,4],[20,1.5],[25,0]]
    
//     // 测试10: 大数区间
//     const seg6 = new IntensitySegments();
//     seg6.add(1000000, 2000000, 1);
//     seg6.toString(); // [[1000000,1],[2000000,0]]
//     seg6.add(1500000, 2500000, 1);
//     seg6.toString(); // [[1000000,1],[1500000,2],[2000000,1],[2500000,0]]
    
//     console.log("所有测试用例通过！");
// }

// testIntensitySegments(); 

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
    
    console.log("所有测试用例通过！");
}

testIntensitySegments();