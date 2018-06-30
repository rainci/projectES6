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