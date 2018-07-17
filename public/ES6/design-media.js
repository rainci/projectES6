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

// 创建玩家
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
// 玩家死亡
Player.prototype.dead = function(){
    this.state = 'dead';
    // log(`${this.name} dead!`)
    playDirect.receiveMessage('playerDead',this);
}
// 玩家移除
Player.prototype.remove = function(){
    playDirect.receiveMessage('removePlayer',this);
}
// 玩家换队
Player.prototype.changeTeam = function(color){
    playDirect.receiveMessage('changeTeam',this,color);
}
var playerFactory = function(name,teamcolor){
    var newplayer = new Player(name,teamcolor);//创建新玩家
    playDirect.receiveMessage('addPlayer',newplayer);//给中介者发送消息，增加新玩家
    return newplayer;
}

var playDirect = (function(){
    var players = {};//存所有player
    var options = {};//存所有的操作
    // 增加一个新玩家
    options['addPlayer'] = function(player){
        var color = player.color; //玩家队伍颜色
        players[color] = players[color] || []; //如果该颜色的玩具没有成立队伍，则成立新队伍
        players[color].push(player);//添加新玩家到队伍
    }; 
    // 删除一个玩家
    options['removePlayer'] = function(player){
        var color = player.color; //玩家队伍颜色
        var teamPlayers = players[color] || []; //该颜色的所有成员
        for(var i=teamPlayers.length-1; i>=0; i--){
            if(teamPlayers[i] == player){
                teamPlayers.splice(i,1);
            }
        }       
    };
    // 玩家换队
    options['changeTeam'] = function(player,newcolor){
        options['removePlayer'](player);
        player.color = newcolor;
        options['addPlayer'](player);
    }
    // 玩家死亡
    options['playerDead'] = function(player){
        var teamColor = player.color, //队伍颜色
        teamPlayers = players[teamColor]; //玩家队伍
        var all_dead = true;
        for(var i=0; i< teamPlayers.length; i++){
            if(teamPlayers[i].state != 'dead'){
                all_dead = false;
                break;
            }
        }
        if(all_dead){//全死亡
            for(var i=0; i< teamPlayers.length; i++){
                teamPlayers[i].lose();//本队所有玩家失败
            }
            for(var color in players){
                if(color != teamColor){
                    var otherplayers = players[color];//其他队伍的玩家
                    for(var i=0,player;player=otherplayers[i++];){
                        player.win();
                    }
                }
            }
        }       
    }

    var receiveMessage = function(){
        var opration = Array.prototype.shift.call(arguments);//第一个参数为操作信息
        options[opration].apply(this,arguments);
    };
    return {
        receiveMessage
    }
})();
var player1 = playerFactory('tiger','red');
var player2 = playerFactory('hr','red');
var player3 = playerFactory('xixi','red');
var player4 = playerFactory('th','blue');
var player5 = playerFactory('yy','blue');
var player6 = playerFactory('yx','blue');
// debugger
player3.remove();
player1.dead();
player2.dead();