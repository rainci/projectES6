let p1 = new Promise((res,rej) => {
    let random = Math.random()*10;
    if( random > 3 ){
        setTimeout( () => {
            res(random)
        }, 1000);
    }else{
        setTimeout( () => {
            rej(random)
        }, 3000);
    }
});
p1.then(res => {
    console.log('success:',res)
})
.catch(rej => {
    console.log('fail:',rej)    
})
