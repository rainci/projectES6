// array 去重方法之set
{
    let arr1 = [1,3,2,1,5,2];
    let set1 = new Set(arr1);
    log('arr1:',arr1,'set1:',set1)
    let arr2 = [...set1];
    let arr3 = Array.from(set1)
    log('arr2:',arr2,'arr3',arr3)
}

{
    // 传统去重
    const arrRepeat = () =>{
        let obj = {};
        return arr => {
            if(obj[arr.toString()]){
                return obj[arr.toString()];
            }
            let arrobj = {};
            for(let i = 0; i < arr.length; i++){
                if(arrobj[arr[i]]){
                    arrobj[arr[i]] += 1;
                }else{
                    arrobj[arr[i]] = 1;
                }
            }
            log('进行了运算')
            return obj[arr.toString()] = Object.keys(arrobj);
        }
    }
    let repeat = arrRepeat();
    log('1:',repeat([1,3,2,1,6,3]))
    log('2:',repeat([12,31,23,12,32,12,23]))
    log('3:',repeat([1,3,2,1,6,3]))

}




function log(...arg){
    console.log(...arg);
}