// 职责链模式
let log = (...args) => {
    console.log(...args)
};
let order500 = (type,pay,kucun) => {
    if(type === 1 && pay === true){
        return log(`已交500定金，并且获取100代金券`);
    }
    return 'next';
};
let order200 = (type,pay,kucun) => {
    if(type === 2 && pay === true){
        return log(`已交200定金，并且获取50代金券`);
    }
    return 'next';
};
let orderNomal = (type,pay,kucun) => {
    if(kucun){
        return log(`普通购买`);
    }
    log('库存不足，无法购买')
};

function Chain(fn){
    this.fn = fn;
    this.success = null;
}
Chain.prototype.setNext = function(obj){
    return this.success = obj;
};
Chain.prototype.do = function(){
    let ret = this.fn.apply(this,arguments);
    if(ret === 'next'){
        return this.success && this.success.do.apply(this.success,arguments);
    }
    return ret;

};
// let chainOrder500 = new Chain(order500);
// let chainOrder200 = new Chain(order200);
// let chainOrderNomal = new Chain(orderNomal);
// chainOrder500.setNext(chainOrder200);
// chainOrder200.setNext(chainOrderNomal);
// chainOrder500.do(2,true,0) //已交200定金，并且获取50代金券

Chain.prototype.nexts = function(){
    return this.success && this.success.do.apply(this.success,arguments);
};

let fn1 = new Chain(function(){
    console.log('fn1')
    return 'next';
});
let fn2 = new Chain(function(){
    console.log('fn2')
    var self = this;
    setTimeout(function(){
        console.log('fn2-settimeout')
        self.nexts();
    },2000)
});
let fn3 = new Chain(function(){
    console.log('fn3')
});
fn1.setNext(fn2).setNext(fn3);
fn1.do() 
// 立刻print下面两行
//fn1
//fn2
// 2s后print下面两行
// fn2-settimeout
// fn3