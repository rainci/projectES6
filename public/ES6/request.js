// var axios = require('axios');
import axios from 'axios';
axios.get('https://api.btime.com/living/getinfo?&callback=jQuery111308679187464738181_1524815576636&gid=5550c271n388atpio3oiimq6m2j&_=1524815576637')
    .then(res=>{
        // debugger
        let {data, status, statusText, config} = res;
        console.log('res:',res)
        // let pageData = jQuery111308679187464738181_1524815576636(data);
        let html;
        let {gid, id, image, title, summary, msg} = data;
        if(status == 200){
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