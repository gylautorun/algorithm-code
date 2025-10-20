/**
 * 给出一个数字，单位是kb，需要展示成 KB，MB 等形式
 */
function formatSizeUnits(kb) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let unitIndex = 0;

    while (kb >= 1024 && unitIndex < units.length - 1) {
        kb /= 1024;
        unitIndex++;
    }
    return `${kb.toFixed(2)} ${units[unitIndex]}`;
}


/**
 * 将文件大小从一种单位转换为另一种单位
 *
 * @param size 文件大小
 * @param fromUnit 源单位（例如：'KB', 'MB', 'GB'等）
 * @param toUnit 目标单位（例如：'KB', 'MB', 'GB'等）
 * @param decimalPoint 小数点后的位数，默认为2
 * @returns {size: 转换后的文件大小, unit: 目标单位}
 */
function convertFileSize(size, fromUnit, toUnit, decimalPoint = 2) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const fromIndex = units.indexOf(fromUnit);
    const toIndex = units.indexOf(toUnit);
    // 如果单位不在列表中，抛出错误
    if (fromIndex === -1 || toIndex === -1) {
        throw new Error('未知的单位');
    }
    // 计算初始单位与目标单位之间的转换系数
    const exponent = toIndex - fromIndex;
    // 计算结果大小
    const resultSize = size / Math.pow(1024, exponent);
    return {
        size: resultSize.toFixed(decimalPoint),
        unit: toUnit,
    };
    // const factor = Math.pow(1024, toIndex - fromIndex);
    // size * Math.pow(1024, fromIndex - toIndex)
    // return {
    //     size: (size / factor).toFixed(decimalPoint),
    //     unit: toUnit,
    // };
}

// 示例 大转小
console.log(convertFileSize(1, 'GB', 'MB')); // 输出: 1024.00 MB
console.log(convertFileSize(1, 'MB', 'KB')); // 输出: 1024.00 KB
console.log(convertFileSize(1, 'KB', 'B'));  // 输出: 1024.00 B

// 示例 小转大
console.log(convertFileSize(1024, 'B', 'KB')); // 输出: 1.00 KB
console.log(convertFileSize(1024, 'KB', 'MB')); // 输出: 1.00 MB
console.log(convertFileSize(1, 'MB', 'GB', 5)); // 输出: 0.00098 GB

