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

let showImg = (node)=>{
    let imgNode = document.createElement('img');
    node.appendChild(imgNode);
    return {
        setSrc(src){
            imgNode.src = src;
        }
    }
};
let showImgProxy = (node) => {
    let img = new Image();
    img.onload = function(){
        showImg(node).setSrc(this.src);
    }
    return {
        setSrc(src){
            showImg(node).setSrc('./load.gif');
            img.src = src;
        }
    }
};
showImgProxy(document.getElementById('root'))
.setSrc('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525966623&di=c1c6d93b1d29af626efd44e2f36a21b2&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.cqqakj.com%2Fupload%2Fimg%2FodSIgNBBloOw3hfPpivZJJDiNdJIt-tBq3Y0VX4CEUVcSZ%2FzODspYVaTJ5LW6i%2F4IveUEQD6mMViUF9zz1luUtx-jHjevL1k.jpg');