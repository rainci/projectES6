//内部迭代器
let each = (obj,callback) => {
    let toString = Object.prototype.toString,
        type = toString.call(obj);
    if(type.includes('Array')){
        for(let i = 0; i < obj.length; i++){
            if(callback){
                if(callback.call(obj[i], i, obj[i]) === false){
                    break;
                }
                // callback.call(obj[i], i, obj[i]);
            }
        }
    }else if(type.includes('Object')){
        for(let i in obj){
            callback && callback.call(obj[i], i, obj[i]);
        }
    }
    
};
//外部迭代器
let interator = obj => {
    let current = 0,
        len = obj.length;
    let getItem = () => {
        return obj[current];
    };
    let next = () => {
        current += 1;
    };
    let done = () => {
        return current >= len;
    }

    return {
        next,
        done,
        getItem,
        len
    }
};
let compare = (interator1, interator2) => {
    debugger
    if( interator1.len !== interator2.len ) return false;
    while( !interator1.done() && !interator2.done() ){
        if(interator1.getItem() !== interator2.getItem()) return false;
        interator1.next();
        interator2.next();
    }
    return true;
};

window.each = each;
window.interator = interator;
window.compare = compare;