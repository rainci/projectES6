window.mosaicCanvas = (()=>{
    let stack = [],
        ctx,
        num = 3;//马赛克的程度，数字越大越模糊
    //define stack class
    class Stack{
        constructor(){
            this.items = [];
        }
        //push to stack
        stackPush(e){
            this.items.push(e);
        }
        //pop out stack
        stackPop(){
            return this.items.pop();
        }
        //return first one
        stackShift(){
            return this.items.shift(); 
        }
        isEmpty(){
            return this.items.length == 0;
        }
        stackSize(){
            return this.items.length;
        }
        stackClear(){
            this.items = [];
        }
        stackPrint(){
            console.log(this.items.toString());
        }
        stackToString(){
            return this.items.toString();
        };
        
    }
    /**
     * 
     * @param {canvasWidth:number,sourceImagePath:url} data 
     */
    const drawCanvas = (data)=>{//first step draw canvas
        const { canvasWidth,sourceImagePath } = data;
        let aImg;
        stack = new Stack();
        aImg = new Image();
        // aImg.setAttribute('crossOrigin', 'anonymous');
        aImg.src = sourceImagePath;
        let initDraw = (it) => {//绘制第一张图
            let height = aImg.height/(aImg.width/canvasWidth);
            let canvasEl = document.createElement('canvas');
            Object.assign(canvasEl,{id:'canvas',width:canvasWidth,height});
            document.body.appendChild(canvasEl); //create canvas and append body
            ctx = canvasEl.getContext("2d"); 
            ctx.drawImage(it,0,0,canvasWidth,height);
            return canvasEl;
        };
        aImg.onload = function(){//image load callback
            let _this = this;
            let canvasEl = initDraw(_this);
            canvasEl.onmousedown = ()=>{//鼠标在画布上点击
                canvasEl.style.cursor = 'pointer';
                stack.stackPush(convertCanvasToImage(canvasEl));  //鼠标down时，保存一个新图片，src=canvas转换成base64     
                if( !canvasEl.onmousemove){
                    canvasEl.onmousemove = (evt)=>{ //鼠标在画布上移动
                        let x = evt.pageX - canvasEl.offsetLeft;
                        let y = evt.pageY - canvasEl.offsetTop;
                        draw(ctx,x-2,y-(num*10)/2);
                    }
                }
            }
            canvasEl.onmouseup = ()=>{//鼠标在画布上离开
                canvasEl.style.cursor = '';
                canvasEl.onmousemove = null;
            }       
        };

    };


    // 从 canvas 提取图片 image
    const convertCanvasToImage = (canvas)=> {
        //新Image对象，可以理解为DOM
        var image = new Image();
        // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
        image.src = canvas.toDataURL("image/png");// 指定格式 PNG
        return image;
    }

    const draw =(ctx,x,y)=>{
        console.log('num:',num)
        // setMosaicSize();
        //获取左边图像的局部坐标的部分像素（左图位置在258，为方便演示，这里设成和马赛克显示位置一样的坐标）
        let oImg = ctx.getImageData(x,y,num*10,num*10);
        let {width,height} = oImg;
        //等分画布
        let stepW = width/num,
            stepH = height/num;
        //这里是循环画布的像素点
        for(let i=0;i<stepH;i++){
            for(let j=0;j<stepW;j++){
                //获取一个小方格的随机颜色，这是小方格的随机位置获取的
                let color = getXY(oImg,j*num+Math.floor(Math.random()*num),i*num+Math.floor(Math.random()*num));
                //这里是循环小方格的像素点，
                for(let k=0;k<num;k++){
                    for(let l=0;l<num;l++){
                        //设置小方格的颜色
                        setXY(oImg,j*num+l,i*num+k,color);
                    }
                }

            }
        }
        ctx.putImageData(oImg,x,y);
    }

    const getXY = (obj,x,y)=>{
        let w = obj.width,
            color = [];
        color[0] =  obj.data[4*(y*w+x)];
        color[1] =  obj.data[4*(y*w+x)+1];
        color[2] =  obj.data[4*(y*w+x)+2];
        color[3] =  obj.data[4*(y*w+x)+3];
        return color;
    }

    const setXY = (obj,x,y,color)=>{
        let w = obj.width;
        obj.data[4*(y*w+x)] = color[0];
        obj.data[4*(y*w+x)+1] = color[1];
        obj.data[4*(y*w+x)+2] = color[2];
        obj.data[4*(y*w+x)+3] = color[3];
    }
    // 撤销方法
    const backCanvas = ()=>{
        var undoImage = stack.stackPop();
        if(undoImage){
            ctx.drawImage(undoImage,0,0);
        }
    }
     // 重置方法
     const originCanvas = ()=>{
        var undoImage = stack.stackShift();
        if(undoImage){
            ctx.drawImage(undoImage,0,0);
        }
        stack.stackClear();
    }
    //设置马赛克大小
    const mosaicSize = (number,callback)=>{
        num = number;
        if(typeof callback ==='function') callback();
    }

    return{
        drawCanvas,
        backCanvas,
        originCanvas,
        mosaicSize
    }
})();
