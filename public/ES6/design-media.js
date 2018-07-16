function log(...args){
    console.log(...args);
}

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
                nextBtn.value = '库存不足，无法购买';
                return;
            }
            nextBtn.disabled = false;
            nextBtn.value = '加入购物车';
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

function Player(name,color){
    this.name = name;
    this.color = color;
    this.state = 'alive';
}
Player.prototype.win = function(){
    log(`${this.name} win!`)
}
Player.prototype.lose = function(){
    log(`${this.name} lose!`)
}

function playDirect(){
    var players = {};//存所有player
    var options = {};//存所有的操作
    options['addPlayer'] = function(player){
        var color = palyer.color;
        palyers[color] = palyers[color] || [];
        palyers[color].push(player);
    };
    options['removePlayer'] = function(player){
        var color = palyer.color;
        palyers[color] = palyers[color] || [];
        for(var i=palyers[color].length-1,player;playerr=palyers[color][i--];){
            if(player == playerr){
                palyers[color].splice(i,1);
            }
        }       
    };
    var receiveMessage = function(){
        options[]
    }
}