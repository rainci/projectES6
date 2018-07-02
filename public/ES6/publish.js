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

{
    function test() {
        if(true){
            console.log('true')
            return;
        }else{
            console.log('false')
        }
        console.log('end')
    }
    test();
}