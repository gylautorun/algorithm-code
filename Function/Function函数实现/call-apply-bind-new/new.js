function _new(Base) {
    const obj = {};
    obj.__proto__ = Base.prototype;
    const args = Array.prototype.slice.call(arguments, 1);
    const result = Base.apply(obj, args);

    const isObject = typeof result === 'object' && typeof result !== null;
    const isFunction = typeof result === 'function';

    if (isObject || isFunction) {
        return result;
    }

    return obj;
}