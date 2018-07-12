var goods = {
    'red|32G': 3,
    'red|16G': 5,
    'blue|32G': 2,
    'blue|16G': 20
};
var memorySelect = document.getElementById('memorySelect'),
colorSelect = document.getElementById('colorSelect'),
kuncunInput = document.getElementById('kuncun'),
colorInfo = document.getElementById('colorInfo'),
memoryInfo = document.getElementById('memoryInfo'),
kuncunInfo = document.getElementById('kuncunInfo'),
nextBtn = document.getElementById('nextBtn');
var media = (function(){
    return {
        change : function(obj){
            var color = colorSelect.value,
                memory = memorySelect.value,
                num = kuncunInput.value,
                stock = goods[`${color}|${memory}`];
            if(obj === colorSelect){
                colorInfo.innerHTML = color;
            } else if(obj === memorySelect){
                memoryInfo.innerHTML = memory;
            }else if(obj ===kuncunInput){
                kuncunInfo.innerHTML = num;
            }
            if(!color){
                nextBtn.disabled = true;
                nextBtn.innerHTML = '请选择手机颜色';
                return;
            } 
            if(!memory){
                nextBtn.disabled = true;
                nextBtn.innerHTML = '请选择手机内存大小';
                return;
            } 
            if(num > stock) {
                nextBtn.disabled = true;
                nextBtn.innerHTML = '库存不足，无法购买';
                return;
            }
            nextBtn.disabled = false;
            nextBtn.innerHTML = '放入购物车';
        }
    }

}());
colorSelect.onchange = function(){
    media.change(this)
}
memorySelect.onchange = function(){
    media.change(this)
}
kuncunInput.oninput = function(){
    media.change(this)
}