// let p1 = new Promise((res,rej) => {
//     let random = Math.random()*10;
//     if( random > 3 ){
//         setTimeout( () => {
//             res(`${random}p1sucess`)
//         }, 1000);
//     }else{
//         setTimeout( () => {
//             rej(`${random}p1fail`)
//         }, 1000);
//     }
// });
// p1.then(res => {
//     console.log('p1 success:',res)
// })
// .catch(rej => {
//     console.log('p1 fail:',rej)    
// })
 
// let baseUrl = url => {
//     // debugger
//     return new Promise((res,rej) => {
//         let xhr = null;
//         if(XMLHttpRequest){
//             xhr = new XMLHttpRequest();
//         }else{
//             xhr = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//         let handle = () => { 
//             if(xhr.readyState!==4){
//                 return;
//             }
//             if(xhr.status === 200){
//                 res(xhr.responseText)
//             }else{
//                 rej(new Error(xhr.statusText))
//             }
//         };
//         xhr.onreadystatechange = handle;
//         xhr.open('get',url);
//         xhr.send();
//     });
// }
// let baseUrlP = baseUrl('../public/data/promise1.json');
// baseUrlP.then(res => {
//     let data = JSON.parse(res)
//     console.log('baseUrl success',data,'url:',data.url)
//     return baseUrl(data.url)
// })
// .then(res => {
//     let data = JSON.parse(res);
//     console.log('baseUrl success2',data,'data:',data.data) 
//     document.getElementById('promise1').innerHTML = data.data;  
// })
// .catch(err => {
//     console.log('baseUrl fail',err)
// })

// let getImg = url => {
//     return new Promise((res,rej)=>{
//         let img = new Image();
//         img.onload = () => {
//             res(img)
//         }
//         img.onerror = () => {
//             rej('fail img unload')
//         }
//         img.src = url;
//     });
// };
// let imgTimeOutP = () => {
//     return new Promise((res,rej) => {
//         setTimeout(()=>{
//             rej('fail:time out~')
//         },400);
//     });
// };
// let imgP = getImg('https://static.jintoushou.com/001/1098866355262103560.jpg');
// Promise.race([imgP,imgTimeOutP()])
// .then(res => {
//     console.log('promise race imgP success',res)
//     document.getElementById('promise2').appendChild(res)
// })
// .catch(err => {
//     console.log('promise race imgP',err) 
//     document.getElementById('promise2').innerHTML = err  
// })
// // promise对象中，res中的参数可以为另一个promise对象，p2的状态取决于p1的状态，虽然p2执行res(),p1的状态会传给p2。
// let p2 = new Promise((res, rej) => {
//     res(p1)
// });
// p2.then( res => {
//     console.log('p2 success:',res)
// })
// .catch( err => {
//     console.log('p2 fail:',err)    
// })

// Promise.all([p1,baseUrlP,imgP])
// .then(res => {
//     console.log('promise all success:',res)
// })
// .catch(err => {
//     console.log('promise all fail:',err)    
// })


// const fn = (data) => {
//     console.log('fn', data);
//     return data => {
//         console.log(3, data);
//     }
// }
// const fn2 = (data) => {
//     console.log('fn2', data);
// }

// let p = new Promise(res => {
//     console.log(1);
//     setTimeout(()=>{
//         res(2)      
//         console.log('first promise222')
//     },0)
//     console.log(5);
// })
// let pp = p.then(data => {
//     console.log(data);
//     // return 0;
// })
// // let ppp = pp.then(fn()) //此时，fn在所有then提前执行，它所返回的fn当作promise对象，放在then中，按顺序执行。

// let ppp = pp.then(fn())

// console.log(4,Object.prototype.toString.call(ppp));

// 此时正确排序
// 1
// 5
// fn undefined
// 4 'Object Promise'
// first 
// 2
// 3 undefined


// 熙认为
// 1
// 5
// 4
// 2
// fn undefined
// 3  undefined

// 正确答案
// 1
// 5
// fn undefined
// 4
// 2
// 3 undefined

// 当为f2时，熙认为
// 1
// 5
// 4 primise
// 2
// f2 undefined

let p5 = new Promise((res,rej) => {
    res('200 ok')
    throw new Error('wow bad wrong')
})
.then(res=>{
    console.log('p5 success:',res)
    return Promise.resolve(`${res} hei`)
    throw new Error('wow bad wrong')
    
})
.catch(err => {
    console.log('p5 fail:',err)
})
.then(res => {
    console.log('p5 then success:',res)    
})
.catch(err => {
    console.log('p5 fail then fail:',err)
    
})

// p5 success:200 ok
// p5 then success:200 ok hei

// new People('whr').sleep(1000).eat('apple'); 
class People {
    constructor(name){
        this.name = name;
        this.p = Promise.resolve();
    }
    sleep(time){
        this.p = this.p.then(() => new Promise(res => {
            setTimeout(()=>{
                res()
            },time);
        }))
        return this;
    }
    eat(food){
        this.p = this.p.then(() => {
            console.log(`${this.name} eat one ${food}`)
        })
       return this;
    }
}
window.People = People;

Promise.resolve()
.then()
.then()