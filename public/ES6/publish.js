let eventss = (()=>{
    let eveFn = {};
    return {
        listen(key,fn){
            if(!(key in eveFn)){
                eveFn[key] = [];
                eveFn[key].push(fn)
            }else {
                eveFn[key].push(fn)
            }
        },
        emit(key){
            if( key in eveFn ){
                for(var i = 0, fn; fn = eveFn[key][i++];)//这样循环效率更高
                fn();
            }else{
                console.log(`你好，请检查${key}方法，目前还没有注册`)
            }
        }
    }
})();
window.eventss = eventss;

{
    var questions = [
        {
            question:'大清灭亡是必然吗？',
            answer:'是的！'
        },
        {
            question:'辛亥革命为啥失败？',
            answer:'当时时局导致！'
        }
    ];
    var askBtn = document.getElementById('ask'),
        teacher = document.getElementById('teacher'),
        teacherBox = document.getElementById('teacherbox'),
        students = document.getElementsByClassName('student'),
        studentBox = document.getElementById('studentbox');
    askBtn.onclick = function(){
        var i = 0,j=0,leng = questions.length,stu_len=students.length,
            p = Promise.resolve(); 
        teacherBox.style.display = 'block';
        p = p.then(()=>{
            return new Promise(res=>{
                setTimeout(()=>{
                    teacherBox.style.display = 'none';
                    res();
                },500)
            })
        }) 
        var timer = setInterval(function(){
            if(i >= leng){
                p = p.then(()=>{
                    teacherBox.innerHTML = '没有问题，我们就下课啦~';
                    return new Promise(res=>{
                        setTimeout(function(){
                            teacherBox.style.display = 'none';
                            teacher.classList.remove("on");
                            res();
                        },1000) 
                    })
                })
                p = p.then(()=>{
                    // for(let j=0; j<students.length;j++){
                    //     setTimeout(()=>{
                    //         students[j].classList.remove('on');                            
                    //     },500)
                    // }
                    //让每个student离线
                    var end = setInterval(()=>{
                        if(j>=stu_len){
                            clearInterval(end);
                        }else{
                            p = p.then(()=>{
                                students[j].classList.remove('on');
                                j++;
                                return true;
                            })
                        }
                    },500)
                });
                clearInterval(timer);
            }else{
                var num = Math.floor(1 + Math.random()*3);//定位到哪位同学回答问题。
                p = p.then(()=>{
                    teacherBox.style.display = 'none';//老师隐藏
                    studentBox.style.display = 'block';//学生展示
                    studentBox.innerHTML = questions[i].question;//学生问问题
                    return true;
                })
                p = p.then(()=>{
                    return new Promise(res=>{
                        setTimeout(function(){
                            studentBox.style.display = 'none';
                            teacherBox.style.display = 'block';
                            teacherBox.innerHTML = questions[i].answer;
                            i++;
                            res();
                        },1000)
                    })
                })
            }     
            
        },2000);
        
    }
}

