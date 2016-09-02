var chess = document.getElementById("chess");
var context = chess.getContext('2d');
//棋盘走子情况（二维数组），赢法数组（三维数组），玩家赢法统计（一维数组），电脑赢法统计（一维数组），玩家走子积分情况（二维数组），电脑走子积分情况（二维数组）
//回合
var me = true;
//棋盘，每个位置表示走子情况，0表示无子，1表示玩家，2表示电脑
var chessBox = [];
//定义赢法数组，注意是三维数组，对应每一个位置的各种赢法
var wins = [];
//初始化
resetWinsArray();
//定义赢法统计数组，对于电脑和玩家来说计算哪个位置权重大
var myWin = [];
var comWin = [];
//赢法数量
var count = 0;
//游戏状态
var over = false;
var logo = new Image();
logo.src = "images/smile.png";
//存在加载时间，留出加载时间否则图像不能正常显示
logo.onload = function () {
    context.drawImage(logo, 15, 15, 420, 420);
    drawLine();
    resetArray();
};
sc();
//棋盘绘制
function drawLine() {
    context.strokeStyle = "#BFBFBF";
    var x = 15, y = 15;
    for (var i = 1; i <= 15; i++) {
        context.moveTo(x, 15);
        context.lineTo(x, 435);
        context.moveTo(15, y);
        context.lineTo(435, y);
        x += 30; y += 30;
    }
    context.stroke();
}
//走子的绘制过程
function stepOne(x, y, me) {
    context.beginPath();
    context.arc(15 + x * 30, 15 + y * 30, 13, 0, 2 * Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15 + x * 30 + 2, 15 + y * 30 - 2, 13, 15 + x * 30 + 2, 15 + y * 30 - 2, 0);
    if (me) {
        //调整起始圆和终止圆的填充颜色
        gradient.addColorStop(0, "#0A0A0A");
        gradient.addColorStop(1, "#636766");
    } else {
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
    }
    context.fillStyle = gradient;
    //stroke用来描边，fill用来填充
    context.fill();
}
//初始化三维数组
function resetWinsArray() {
    for (var i = 0; i < 15; i++) {
        wins[i] = [];
        for (var j = 0; j < 15; j++) {
            wins[i][j] = [];
        }
    }
}
//赢法统计 注意是从零开始的
function sc() {
    //横线统计
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 11; j++) {
            for (var k = 0; k < 5; k++) {
                wins[i][j + k][count] = true;
            }
            count++;
        }
    }
    //竖线统计
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 11; j++) {
            for (var k = 0; k < 5; k++) {
                wins[j + k][i][count] = true;
            }
            count++;
        }
    }
    //斜线统计
    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 11; j++) {
            for (var k = 0; k < 5; k++) {
                wins[i + k][j + k][count] = true;
            }
            count++;
        }
    }
    //反斜线统计
    for (var i = 0; i < 11; i++) {
        for (var j = 14; j > 3; j--) {
            for (var k = 0; k < 5; k++) {
                wins[i + k][j - k][count] = true;
            }
            count++;
        }
    }
    //console.log(count);   输出赢法数量
    //初始化赢法统计数组
    for (var i = 0; i < count; i++) {
        myWin[i] = 0;
        comWin[i] = 0;
    }
}
//棋盘数组初始化
function resetArray() {
    for (var i = 0; i < 15; i++) {
        chessBox[i] = [];
        for (var j = 0; j < 15; j++) {
            chessBox[i][j] = 0;
        }
    }
}
//点击事件
chess.onclick = function (e) {
    //当游戏结束或者不归玩家回合时不能走子，跳出函数
    if (over || !me) {
        return;
    }
    var i = Math.floor(e.offsetX / 30);
    var j = Math.floor(e.offsetY / 30);
    if (chessBox[i][j] == 0) {
        stepOne(i, j, me);
        chessBox[i][j] = 1;
        //对此位置的每一个赢法统计都进行加一
        for (var k = 0; k < count; k++) {
            //找出此位置，即当前位置的当前赢法为true
            if (wins[i][j][k]) {
                //该赢法的完成度加一
                myWin[k]++;
                //计算机永远不能再进行此位置的判断，赋为异常值
                comWin[k] = 6;
                //当完成度为五时，即该赢法实现，游戏结束
                if (myWin[k] == 5) {
                    over = true;
                    //延时0.1s并提示游戏结束
                    setTimeout(function () {
                        window.alert("你赢了！");
                    }, 100);
                }
            }
        }
        if (!over) {
            me = !me;
            //每当玩家走子后进行计算机走子过程，两个过程整体算是一个过程
            comAI();
        }
    }
}
//AI走子过程
function comAI() {
    //初始化玩家得分数组，计算机得分数组
    var myScore = [];
    var comScore = [];
    //记录得分最大值，即此位置的坐标
    var max = 0;
    var u = 0, v = 0;
    //初始化两个数组
    for (var i = 0; i < 15; i++) {
        myScore[i] = [];
        comScore[i] = [];
        for (var j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            comScore[i][j] = 0;
        }
    }
    //对局面所有位置遍历
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            //当此位置没有棋子时
            if (chessBox[i][j] == 0) {
                //对此位置每种赢法遍历
                for (var k = 0; k < count; k++) {
                    //如果能赢
                    if (wins[i][j][k]) {
                        //找出此位置玩家赢法完成度
                        if (myWin[k] == 1) {
                            myScore[i][j] += 200;
                        } else if (myWin[k] == 2) {
                            myScore[i][j] += 400;
                        } else if (myWin[k] == 3) {
                            myScore[i][j] += 2000;
                        } else if (myWin[k] == 4) {
                            myScore[i][j] += 10000;
                        }
                        //找出此位置自己赢法完成度
                        if (comWin[k] == 1) {
                            comScore[i][j] += 220;
                        } else if (comWin[k] == 2) {
                            comScore[i][j] += 420;
                        } else if (comWin[k] == 3) {
                            comScore[i][j] += 2100;
                        } else if (comWin[k] == 4) {
                            comScore[i][j] += 22000;
                        }
                    }
                }
                //以拦截玩家优先
                //当切换下一位置时，对当前位置积分判断
                if (myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                }if (comScore[i][j] > max) {
                    max = comScore[i][j];
                    u = i;
                    v = j;
                }/* else if (comScore[i][j] > comScore[u][v]) {
                    u = i;
                    v = j;
                }
                 else if (myScore[i][j] > myScore[u][v]) {
                    u = i;
                    v = j;
                }*/
            }
        }
    }
    stepOne(u, v, false);
    chessBox[u][v] = 2;
    for (var k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            comWin[k]++;
            myWin[k] = 6;
            if (comWin[k] == 5) {
                over = true;
                //延时0.1s并提示游戏结束
                setTimeout(function () {
                    window.alert("电脑赢！");
                }, 100);
            }
        }
    }
    if (!over) {
        me = !me;
    }
}