const eventEmitter = require('./eventEmitterClass')

// 测试
function a() {
    console.log('a')
}
function b() {
    console.log('b')
}
function c() {
    console.log('c')
}
function d(...a) {
    console.log('d',...a)
}
eventEmitter.on('TEST1', a).on('TEST2', b).once('TEST2', c).on('TEST2',d);

eventEmitter.emit('TEST1');
console.log('....')
eventEmitter.emit('TEST2');
// In test2
// In test2 again
console.log('....')
eventEmitter.emit('TEST2');