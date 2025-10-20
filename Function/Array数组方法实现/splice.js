
function sliceDeleteItems(array, startIndex, deleteCount, deleteArr) {
    for (let i = 0; i < deleteCount; i++) {
        let index = startIndex + i;
        if (index in array) {
            let current = array[index];
            deleteArr[i] = current;
        }
    }
}

function movePostItems(array, startIndex, len, deleteCount, addElements) {
    // 如果添加的元素和删除的元素个数相等，相当于元素的替换，数组长度不变，被删除元素后面的元素不需要挪动
    if (deleteCount === addElements.length) return;
    // 如果添加的元素和删除的元素个数不相等，则移动后面的元素
    else if(deleteCount > addElements.length) {
        // 删除的元素比新增的元素多，那么后面的元素整体向前挪动
        // 一共需要挪动 len - startIndex - deleteCount 个元素
        for (let i = startIndex + deleteCount; i < len; i++) {
            let fromIndex = i;
            // 将要挪动到的目标位置
            let toIndex = i - (deleteCount - addElements.length);
            if (fromIndex in array) {
                array[toIndex] = array[fromIndex];
            } else {
                delete array[toIndex];
            }
        }
        // 注意注意！这里我们把后面的元素向前挪，相当于数组长度减小了，需要删除冗余元素
        // 目前长度为 len + addElements - deleteCount
        for (let i = len - 1; i >= len + addElements.length - deleteCount; i --) {
            delete array[i];
        }
    } else if(deleteCount < addElements.length) {
        // 删除的元素比新增的元素少，那么后面的元素整体向后挪动
        // 思考一下: 这里为什么要从后往前遍历？从前往后会产生什么问题？
        for (let i = len - 1; i >= startIndex + deleteCount; i--) {
            let fromIndex = i;
            // 将要挪动到的目标位置
            let toIndex = i + (addElements.length - deleteCount);
            if (fromIndex in array) {
                array[toIndex] = array[fromIndex];
            } else {
                delete array[toIndex];
            }
        }
    }
}

// 开始索引
function computeStartIndex(startIndex, len) {
    // 处理索引负数的情况
    if (startIndex < 0) {
        return startIndex + len > 0 ? startIndex + len : 0;
    }
    return startIndex >= len ? len : startIndex;
}

function computeDeleteCount(startIndex, len, deleteCount, argumentsLen) {
    // 删除数目没有传，默认删除startIndex及后面所有的
    if (argumentsLen === 1) {
        return len - startIndex;
    }
    // 删除数目过小
    if (deleteCount < 0) {
        return 0;
    }
    // 删除数目过大
    if (startIndex > len - deleteCount) {
        return len - startIndex;
    }
    return deleteCount;

}

/**
 * splice(start, deleteCount [, it1[, it2[,...]]]): 对数组的每个元素执行一次给定的函数
 *    start:
 *    deleteCount:
 *        deleteCount 大于 start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）
 *        deleteCount 被省略了，或者它的值大于等于array.length - start(也就是说，如果它大于或者等于start之后的所有元素的数量)，那么start之后数组的所有元素都会被删除
 *        deleteCount 是 0 或者负数，则不移除元素
 *    it1, it2, ...: 要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素
 * return: 删除元素的数组, 原数组变化
 */
Array.prototype.selfSplice= function (startIndex, deleteCount, ...addItems) {
    // 不能是 null 的调用
    if (this === null) {
        throw new TypeError(
            'Array.prototype.reduce called on null or undefined'
        )
    }

    let argumentsLen = arguments.length;
    let array = Object(this);
    let len = array.length;
    let deleteArr = new Array(deleteCount);

    startIndex = computeStartIndex(startIndex, len);
    deleteCount = computeDeleteCount(startIndex, len, deleteCount, argumentsLen);

    // 判断 sealed 对象和 frozen 对象, 即 密封对象 和 冻结对象
    if (Object.isSealed(array) && deleteCount !== addItems.length) {
        throw new TypeError('the object is a sealed object!')
    } else if(Object.isFrozen(array) && (deleteCount > 0 || addItems.length > 0)) {
        throw new TypeError('the object is a frozen object!')
    }

    // 拷贝删除的元素
    sliceDeleteItems(array, startIndex, deleteCount, deleteArr);
    // 移动删除元素后面的元素
    movePostItems(array, startIndex, len, deleteCount, addItems);

    // 插入新元素
    for (let i = 0; i < addItems.length; i++) {
        array[startIndex + i] = addItems[i];
    }
    array.length = len - deleteCount + addItems.length;

    return deleteArr;
};

let test = [1, 2, 3, 4, 5];
console.log(test.splice(-5, -10));
console.log(test.selfSplice(-5, -10));


