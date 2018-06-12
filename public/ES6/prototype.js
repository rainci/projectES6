// 鸭子类型
{
    var Duck = function(){};
    Duck.prototype.jiao = function(){console.log('嘎嘎嘎')};

    var Chicken = function(){};
    Chicken.prototype.jiao = function(){console.log('唧唧叽')};

    var Animal = function(ani){
        this.animal = new ani();
    }
    Animal.prototype.jiao = function(){
        this.animal.jiao()
    }
    var a1 = new Animal(Duck)
    var a2 = new Animal(Chicken)
    a1.jiao();
    a2.jiao();
}

// 代码优化，人物与行为分开
{ 
    var Attack = function(who){
        this.who = who;   
    }
    Attack.prototype.list = {
        waving(){
            console.log(`${this.who.name}使用了旋风拳！`)
        },
        winding(){
            console.log(`${this.who.name}使用了暴风腿！`)
        }
    }
    Attack.prototype.start = function(type){
        return this.list[type].call(this)
    };

    var Person = function(name){
        this.name = name;
        this.attackObj = new Attack(this);
    }
    Person.prototype.attack = function(type){
        this.attackObj.start(type)
    }
    var lyx = new Person('lyx');
    var hr = new Person('hr');
    lyx.attack('winding')
    lyx.attack('waving')
}

// 
{
    Function.prototype.after = function(fn){
        var self = this;
        return function(){
            var ret = self.apply(this, arguments);
            fn.apply(this,arguments);
            return ret;
        }
    }

    let Origian = function(name){
        this.name = name;
    };
    Origian.prototype.log = function(){
        console.log(`origin ${this.name}`);
    }
    var o1 = new Origian('lyx');
    o1.log(); //origin lyx
    console.log('以下是newlog执行结果');
    var newlog = o1.log.after(function(){
        console.log('new log')
    }).bind(o1);
    newlog(); //

    // let obj = {
    //     a: 111,
    //     aa(){
    //         console.log(`abcd ${this.a}`)
    //     }
    // }
    // let f = obj.aa.after(()=>console.log(`def`)).bind(obj);

    // let o = {
    //     a: 3,
    // }
    // //f函数bind后，指针固定死了，再apply(),更换指针，其实不管用了。
    // f.apply(o)


}
{
    //类继承，实例化为数组。并且constructor中history属性存在实例中，并且不算长度。
    class Arr extends Array {
        constructor(){
            super();
            this.history = [1];
        }
    }
    var arr = new Arr(); //[history: Array(1)]  length为0
    arr.push(2)  //[2, history: Array(1)]
    arr.history //[1]
}

