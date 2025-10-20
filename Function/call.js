Function.prototype.newCall = function (context) {

    if (typeof context === 'object') {
        context = context || global ||window
    } else {
        context = Object.create(null);
    }

    context.fn = this;

    var args = [];

    for(var i=1; i< arguments.length; i++) {
        args.push('arguments[' + i + ']');
    }

    // args => [arguments[1], arguments[2], arguments[3], ...]

    eval('context.fn(' + args + ')');
    delete context.fn;
};

// ES6
Function.prototype.newCall = function (context,...params) {
    if (typeof context === 'object') {
        context = context || global || window
    } else {
        context = Object.create(null);
    }
    let fn = Symbol();
    context[fn] = this
    context[fn](...params);
    delete context.fn;
}

var person = {
    name: "jayChou"
};

function say(age, sex) {
    console.log('name:' + this.name + ', age:' + age + ', sex:' + sex);
}

say.newCall(person, 18, '男');  // name: jayChou,age: 18, sex: 男

say.newCall(null, 18, '男')