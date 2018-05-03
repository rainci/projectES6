let eventss = (()=>{
    let eveFn = {};
    return {
        listen(key,fn){
            eveFn[key] = fn;
        },
        emit(key){
            if( key in eveFn ){
                eveFn[key]();
            }
        }
    }
})();
window.eventss = eventss; 