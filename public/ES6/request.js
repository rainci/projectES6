// var axios = require('axios');
// import axios from 'axios';
axios.get('https://api.btime.com/living/getinfo?&callback=jQuery111308679187464738181_1524815576636&gid=5550c271n388atpio3oiimq6m2j&_=1524815576637')
    .then(res=>{
        // debugger
        let callbackLen = 'jQuery111308679187464738181_1524815576636'.length+1;
        let newData = res.data.substring(callbackLen);
            newData = JSON.parse(newData.substring(0,newData.length-1));
        let {status} = res;
        let {data} = newData;
        let html;
        let {gid, id, image, title, summary, msg} = data;
        if(status == 200 && newData){
            html = `<div>
                <p>title:${title}</p>
                <p>msg:${msg}</p>
                <p>image:${image}</p>
                <p>id:${id}</p>
                <p>gid:${gid}</p>
                <p>summary:${summary}</p>
                
            </div>`;
            if(html){
                document.getElementById('root').innerHTML = html;
            }
            
        }
    })
    .catch(e=>console.log(e))