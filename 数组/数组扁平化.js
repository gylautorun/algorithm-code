// # JavaScript 实现带 depth 的数组扁平化
// 在 JavaScript 中实现带有 `depth` 参数的数组扁平化，可以控制扁平化的层级深度。以下是几种实现方式：
// ## 1. 递归实现

function flattenWithDepth(array, depth = 1) {
    if (depth < 1) return array.slice(); // 返回浅拷贝

    return array.reduce((acc, val) => {
        if (Array.isArray(val) && depth > 0) {
            return acc.concat(flattenWithDepth(val, depth - 1));
        }
        else {
            return acc.concat(val);
        }
    }, []);
}

// 使用示例
const nestedArray = [1, [2, [3, [4, [5]]]]];
console.log(flattenWithDepth(nestedArray, 2));
// 输出: [1, 2, 3, [4, [5]]]

// ## 2. 迭代实现（非递归）

function flattenWithDepth(array, depth = 1) {
    let result = [];
    const stack = array.map(item => ({ item, depth }));

    while (stack.length) {
        const { item, depth } = stack.pop();

        if (Array.isArray(item) && depth > 0) {
            stack.push(...item.map(i => ({ item: i, depth: depth - 1 })));
        } else {
            result.unshift(item);
        }
    }

    return result;
}

// 使用示例
console.log(flattenWithDepth(nestedArray, 1));
// 输出: [1, 2, [3, [4, [5]]]]

// ## 3. 使用 Generator 实现

function* flattenWithDepth(array, depth = 1) {
    for (const item of array) {
        if (Array.isArray(item) && depth > 0) {
            yield* flattenWithDepth(item, depth - 1);
        } else {
            yield item;
        }
    }
}

// 使用示例
const result = [...flattenWithDepth(nestedArray, 3)];
console.log(result);
// 输出: [1, 2, 3, 4, [5]]

// ## 4. 兼容性更好的 ES5 实现

function flattenWithDepth(array, depth) {
    depth = typeof depth === 'number' ? depth : 1;

    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i]) && depth > 0) {
            result = result.concat(flattenWithDepth(array[i], depth - 1));
        } else {
            result.push(array[i]);
        }
    }
    return result;
}

// ## 5. 与 Array.prototype.flat 对比
// ES2019 引入了原生 `flat()` 方法，也支持 `depth` 参数：

// 原生方法
const arr = [1, [2, [3, [4]]]];
console.log(arr.flat(2)); // [1, 2, 3, [4]]

// ## 特殊边界情况处理

function flattenWithDepth(array, depth = 1) {
    if (!Array.isArray(array)) return [array];
    if (depth < 0) throw new RangeError('Depth must be a non-negative number');

    return array.reduce((acc, val) => {
        return acc.concat(
            Array.isArray(val) && depth > 0
                ? flattenWithDepth(val, depth - 1)
                : val
        );
    }, []);
}

// 处理边界情况
console.log(flattenWithDepth([], 2)); // []
console.log(flattenWithDepth(123, 2)); // [123]
console.log(flattenWithDepth([1, , 3], 1)); // [1, undefined, 3]

// ## 性能考虑

// 1. 递归实现简洁但可能遇到调用栈限制（对非常深的数组）
// 2. 迭代实现更安全但代码稍复杂
// 3. 对于大型数组，可以考虑分块处理

// 选择哪种实现取决于你的具体需求（代码简洁性、性能要求、运行环境等）。