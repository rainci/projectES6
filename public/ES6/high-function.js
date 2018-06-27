{
    // 柯里化
    let curry = function(fn){
        let args = [];
        return function(){
            if(!arguments.length){
                return fn.apply(this,args);
            }
            Array.prototype.push.apply(args,arguments);
            // return arguments.callee;
        }
    }
    // let cost = function(){
    //     let totle = 0;
    //     for(let i = 0; i < arguments.length; i++){
    //         totle += arguments[i];
    //     }
    //     return totle;
    // }
    let cost = (function(){
        var totle = 0;
        return function(){
            for(let i = 0; i < arguments.length; i++){
                totle += arguments[i];
            }
            return totle;
        }
    }());
    let costNow = curry(cost);
    costNow(100); //未真正求值
    costNow(500); //未真正求值
    costNow(200); //未真正求值
    console.log(`柯里化：最后不传参时计总数，之前只是记录：${costNow()}`) //800
}
{
    // 节流函数
    let throttle = function(fn,time){
        let throFn = fn,
            first = true,
            timer = null;
        return function(){
            let _this = this;
            if(first){
                first = false;
                return throFn.apply(_this,arguments);
            }
            if(timer){
                return false;
            }
            timer = setTimeout(function(){
                clearInterval(timer);
                timer = null;
                throFn.apply(_this,arguments);
            },time || 500);
        }
    }
    window.onresize = throttle(function(){
        console.log('节流函数')
    },2000)
    
}