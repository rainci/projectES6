// 设计模式之模版方法

let Beverage = function(){};
Beverage.prototype.boilWater = function(){
    console.log('把水煮沸');
}
Beverage.prototype.brew = function(){
    throw new Error('子类要重写')
}
Beverage.prototype.poulInCup = function(){
    throw new Error('子类要重写')
}
Beverage.prototype.condition = function(){
    throw new Error('子类要重写')
}
Beverage.prototype.customer = function(){
    return true;
}
Beverage.prototype.init = function(){
    this.boilWater();
    this.brew();
    this.poulInCup();
    if(this.customer()){
        this.condition();
    }
}
let Coffee = function(){};
Coffee.prototype = new Beverage();
Coffee.prototype.brew = function(){
    console.log('用沸水冲咖啡')
}
Coffee.prototype.poulInCup = function(){
    // console.log('把咖啡倒进杯子里')
}
Coffee.prototype.condition = function(){
    console.log('加糖和牛奶')
}
Coffee.prototype.customer = function(){
    return window.confirm('请问加糖和牛奶吗')
}
let coff = new Coffee();
coff.init();

let Tea = function(){};
Tea.prototype = new Beverage();
Tea.prototype.brew = function(){
    console.log('用沸水冲茶')
}
Tea.prototype.poulInCup = function(){
    console.log('把茶倒进杯子里')
}
Tea.prototype.condition = function(){
    console.log('加糖')
}
Tea.prototype.customer = function(){
    return window.confirm('请问加糖吗')
}

let tea = new Tea();
tea.init();