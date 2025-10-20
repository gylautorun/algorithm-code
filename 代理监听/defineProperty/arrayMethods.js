
function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto); // 克隆Array的原型出来
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
    const original = arrayProto[method];
    def(arrayMethods, method, function mutator (...args) {
        const result = original.apply(this, args)
        const ob = this.__ob__
        ob.dep.notify()
        return result
    })
})