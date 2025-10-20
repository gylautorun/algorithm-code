# 强度分段数据结构版本对比

## 版本概述

### 原始版本（有边界值）
- 文件：`_intensity-segments.js`
- 特点：使用 `Number.MIN_VALUE` 和 `Number.MAX_VALUE` 作为边界值

### 改进版本（无边界值）
- 文件：`intensity-segments-no-boundary.js`
- 特点：移除边界值，使用动态计算方式

## 主要差异对比

### 1. 初始化方式

**原始版本：**
```javascript
constructor() {
    this.map = new Map();
    // 边界值设置
    this.map.set(Number.MIN_VALUE, 0);
    this.map.set(Number.MAX_VALUE, 0);
    this.keys = [Number.MIN_VALUE, Number.MAX_VALUE];
}
```

**改进版本：**
```javascript
constructor() {
    this.map = new Map();
    this.keys = [];
}
```

### 2. 二分查找实现

**原始版本：**
```javascript
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
```

**改进版本：**
```javascript
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
```

### 3. 新增核心方法

**改进版本新增：**
```javascript
getValueAt(position) {
    const index = this.getLowerBoundIndex(this.keys, position);
    if (index === 0) {
        return 0; // 如果位置在所有键之前，返回0
    }
    return this.map.get(this.keys[index - 1]) || 0;
}
```

### 4. 边界值处理

**原始版本：**
- 依赖预定义的边界值
- 在 `toString()` 方法中需要过滤边界值

**改进版本：**
- 动态计算边界值
- 无需预定义边界，更灵活

### 5. 键值更新逻辑

**原始版本：**
```javascript
// 更新from 
const startValue = this.map.get(keys[fromIndex]);
this.map.set(from, startValue + amount);
// 更新to
const endValue = this.map.get(keys[toIndex]);
this.map.set(to, endValue);
```

**改进版本：**
```javascript
// 获取from位置之前的强度值
const fromValue = this.getValueAt(from);
this.map.set(from, fromValue + amount);

// 获取to位置之前的强度值
const toValue = this.getValueAt(to);
this.map.set(to, toValue);
```

## 优势对比

### 改进版本的优势

1. **更简洁的代码结构**
   - 移除了边界值初始化
   - 减少了特殊情况的处理

2. **更灵活的边界处理**
   - 支持任意范围的数值
   - 无需担心边界值溢出

3. **更清晰的逻辑**
   - `getValueAt()` 方法使边界计算更直观
   - 减少了硬编码的边界值

4. **更好的可维护性**
   - 代码更容易理解和修改
   - 减少了边界相关的bug

### 原始版本的优势

1. **性能略好**
   - 预定义边界值，减少计算
   - 二分查找逻辑稍简单

2. **向后兼容**
   - 保持原有的实现逻辑
   - 适合需要边界值的场景

## 使用建议

- **推荐使用改进版本**：对于大多数应用场景，改进版本提供了更好的灵活性和可维护性
- **保留原始版本**：如果对性能有严格要求或需要特定的边界值行为，可以继续使用原始版本

## 测试结果

两个版本在功能上完全等价，都能正确处理：
- 区间添加和设置
- 重叠区间处理
- 零值处理
- 负数操作
- 边界情况

改进版本在代码简洁性和可维护性方面有明显优势。 