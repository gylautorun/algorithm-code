function arrayProto(dep) {
    let orginal = Array.prototype;
    let arrayProtoMethods = Object.create(orginal); // 克隆Array的原型出来
    let methodsPatch = [
        'push',
        'pop',
        'shift',
        'unshift',
        'splice',
        'sort',
        'reverse'
    ]
    methodsPatch.forEach(method => {
        arrayProtoMethods[method] = function () {
            let result = orginal[method].apply(this, arguments);
            // 执行原始操作
            console.log('监听数组方法', method)
            // 数组更新视图, 此处需要添加更新操作
            dep && dep.notify();
            return result;
        }
    })

    return arrayProtoMethods;
}