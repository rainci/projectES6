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