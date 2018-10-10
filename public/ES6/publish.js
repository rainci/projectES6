let eventss = (()=>{
    let eveFn = {};
    return {
        listen(key,fn){
            if(!(key in eveFn)){
                eveFn[key] = [];
                eveFn[key].push(fn)
            }else {
                eveFn[key].push(fn)
            }
        },
        emit(key){
            if( key in eveFn ){
                for(var i = 0, fn; fn = eveFn[key][i++];)//这样循环效率更高
                fn();
            }else{
                console.log(`你好，请检查${key}方法，目前还没有注册`)
            }
        }
    }
})();
window.eventss = eventss;
