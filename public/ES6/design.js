// 代理模式
let mult = function(){
    console.log('计算mult')
   let totle = 1;
   for(let i = 0; i < arguments.length; i++){
       totle *= arguments[i];
   }
   return totle;
};
// let multProxy = (function(){
//     let cache = [];
//     return function(){
//         let arg = Array.prototype.join.call(arguments,',');
//         if( arg in cache ) return cache[arg];
//         return cache[arg] = mult.apply(this,arguments);
//     }
// })();

let add = function(){
    console.log('计算add')
    let totle = 0;
    for(let i = 0; i < arguments.length; i++){
        totle += arguments[i];
    }
    return totle;
};
let fnProxy = function(fn){
    let cache = [];
    return function(){
        let arg = Array.prototype.join.call(arguments,',');
        if( arg in cache ) return cache[arg];
        return cache[arg] = fn.apply(this,arguments);
    }
}
let addProxy = fnProxy(add);
let multProxy2 = fnProxy(mult);
window.addProxy = addProxy;
window.multProxy2 = multProxy2;
// window.multProxy = multProxy;

let showImg =(()=>{
    let imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc(src){
            imgNode.src = src;
        }
    }
})();
let showImgProxy = (()=>{
    let img = new Image;
    img.onload = function(){
        showImg.setSrc(this.src);
    }
    return {
        setSrc(src){
            showImg.setSrc('./load.gif');
            img.src = src;
        }
    }
})(); 
showImgProxy.setSrc('https://static.jintoushou.com/001/170911135031000101.jpeg');

// 虚拟代理合并http请求
let syncFile = id => {
    console.log(`开始同步文件，${id}`)
}
let proxysyncFile = (()=>{
    let cache = [];
    let timer = null;
    return id => {
        cache.push(id);
        if(timer){
            return false;
        }
        timer = setTimeout(()=>{
            let idStr = cache.join(',');
            syncFile(idStr);
            clearTimeout(timer);
            timer = null;
            cache.length = 0;

        },2000)
    }
})();
var checkbox = document.getElementsByTagName('input');
for(let i=0,c;c=checkbox[i++];){
    c.onclick = function(){
        if(this.checked === true){
            proxysyncFile(this.value)
        }
    }
}

var arr = [
    {id:1,name:'宠物美容'},
    {id:2,name:'清洁保养', children:[
        {id:4,name:'家庭清洁'},
        {id:5,name:'家庭环保',children:[
            {id:6,name:'家庭装修'},
            {id:7,name:'家庭套装'},
        ]},      
    ]},
    {id:3,name:'丽人服务',children:[
        {id:8,name:'面部按摩'}
    ]},
    {id:4,name:'汽车服务'}
];

const sortFn = (()=>{
    let arrNew = [];
    return function pai(arr){
        for(var j=0; j<arr.length; j++){
            var {children,...item} = arr[j];
            arrNew.push(item);
            if(children && children.length){
                pai(children);
            }
        }
        return arrNew;
    }
})();
let aaa = sortFn(arr);

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
    return 'next'
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
Chain.prototype.setNext = (obj) => {
    this.success = obj.prototype.do;
};
Chain.prototype.do = () => {
    let ret = this.fn.apply(this,arguments);
    if(ret === 'next'){
        this.success.apply(this,arguments);
    }

};
// debugger
let chainOrder500 = new Chain(order500);
let chainOrder200 = new Chain(order200);
let chainOrderNomal = new Chain(orderNomal);
chainOrder500.setNext(chainOrder200);
chainOrder200.setNext(chainOrderNomal);
chainOrder500.do(1,true,30)