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
 
let baseUrl = url => {
    // debugger
    return new Promise((res,rej) => {
        let xhr = null;
        if(XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }else{
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        let handle = () => {
            if(xhr.readyState!==4){
                return;
            }
            if(xhr.status === 200){
                res(xhr.responseText)
            }else{
                rej(new Error(xhr.statusText))
            }
        };
        xhr.onreadystatechange = handle;
        xhr.open('get',url);
        xhr.send();
    });
}
baseUrl('../public/data/promise1.json')
.then(res => {
    let data = JSON.parse(res)
    console.log('success',data,'url:',data.url)
    return baseUrl(data.url)
})
.then(res => {
    let data = JSON.parse(res);
    console.log('success2',data,'data:',data.data) 
    document.getElementById('promise1').innerHTML = data.data;  
})
.catch(err => {
    console.log('error',err)
})
