// 观察者构造函数
function Observer(data){
    this.data = data;
    this.walk(data);
}

let p = Observer.prototype;

p.walk = function(obj){
    let val;
    for(let key in obj){
        // 通过 hasOwnProperty 过滤掉一个对象本身拥有的属性
        if(obj.hasOwnProperty(key)){
            val = obj[key];
            // 递归调用 循环所有对象出来
            if(typeof val === 'object'){
                new Observer(val);
            }
            this.convert(key, val);
        }
    }
};

p.convert = function(key, val){
    Object.defineProperty(this.data, key, {
        enumerable: false,
        configurable: false,
        get: function(){
            console.log(key + '被访问');
        },
        set: function(newVal){
            console.log(key + '被修改，新' + key + '=' + newVal);
            if(newVal === val) return ;
            val = newVal;
        }
    })
};

let data = {
    user: {
        name: 'zhangsan',
        age: 14
    },
    address: {
        city: 'beijing'
    }
}

let app = new Observer(data);

data.user.name;    // user被访问