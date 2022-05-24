---
title: 电脑自动走棋
date: '2022-05-17 19:32'
sidebar: 'auto'
tags:
 - 专业课
categories:
 - 专业实验

---

这一节，程序将可以自动行棋。但仅仅是走了一步符合象棋规则的棋，电脑智商为0。

## 走法生成

### 将（帅）

![image-20220517193459830](05_chessx.assets/image-20220517193459830.png)

使用一个辅助数组表示这四个方向：  

<code>let KING_DELTA = [-16, -1, 1, 16];</code>  

已知帅在一维棋局数组中的起点位置sqSrc。生成帅的走法，就是获取帅全部的合法终点sqDes。使用一个数组存储所有可能的走法，伪代码如下：

```javascript
for (var i = 0; i < 4; i ++) {       // 将的4个方向
  let sqDst = sqSrc + KING_DELTA[i];    // 得到一个可能的终点位置
  if (该位置不位于九宫中) {
    // 该走法不合法，执行下一轮循环
    continue;
  }
  var pcDst = 终点位置的棋子;  　　　　// 如果终点位置没有棋子，那么pcDst=0
  if (pcDst不是本方棋子) {
    走法合法，保存到步骤数组中
  }
}
```

### 仕

![image-20220519141003639](05_chessx.assets/image-20220519141003639.png)

同样使用辅助数组表示仕的4个方向：  

<code>let ADVISOR_DELTA = [-17, -15, 15, 17];</code>

生成仕的走法，伪代码如下：

```js
for (var i = 0; i < 4; i ++) {　　　　　　// 仕的4个方向
  var sqDst = sqSrc + ADVISOR_DELTA[i]; // 得到一个可能的终点位置
  if (该位置不位于九宫中) {
    // 该走法不合法，执行下一轮循环
    continue;
  }
  var pcDst = 终点棋子;　　　　　　　　　　// 如果终点位置没有棋子，那么pcDst=0
  if (pcDst不是本方棋子) {
    走法合法，保存到步骤数组中
  }
}
```

### 象

![image-20220519140908980](05_chessx.assets/image-20220519140908980.png)

我们并不用设置一个类似[-34, -30, 30, 37]的数组保存象的方向。因为仕的方向，跟象眼的方向一致。仕方向的二倍，就是象的方向。

```js
for (var i = 0; i < 4; i ++) {       // 象的4个方向
  var sqDst = sqSrc + ADVISOR_DELTA[i]; // 获得象眼的位置
  if (象眼不在棋盘上，或者象眼位置已过河，或者象眼存在棋子) {
        // 位置不合法，执行下一轮循环
    continue;
  }
  sqDst += ADVISOR_DELTA[i];    　　　　// 得到一个可能的终点位置
  var pcDst = 终点位置的棋子   　　　　// 如果终点位置没有棋子，那么pcDst=0
  if (pcDst不是本方棋子) {
    走法合法，保存到步骤数组中
  }
}
```

### 马

![image-20220519141337953](05_chessx.assets/image-20220519141337953.png)

用辅助数组表示马的方向：

KNIGHT_DELTA = [[-33, -31], [-18, 14], [-14, 18], [31, 33]];

对应马腿的4个方向，与帅的4个方向是一样的。

生成马的走法，伪代码如下：

```js
for (var i = 0; i < 4; i ++) {　　　　　　// 马腿的4个方向
  var sqDst = sqSrc + KING_DELTA[i];　　// 得到一个马腿的位置
  if (马腿位置存在棋子) {
    continue;
  }
  for (var j = 0; j < 2; j ++) { // 1个马腿对应2个马的方向
    sqDst = sqSrc + KNIGHT_DELTA[i][j]; // 得到一个马的可能的终点位置
    if (该位置不在棋盘上) {
      continue;
    }
    var pcDst = 终点位置的棋子;        // 如果终点位置没有棋子，那么pcDst=0
    if (pcDst不是本方棋子) {
      走法合法，保存到步骤数组中
    }
  }
}
```

### 车

![image-20220519141533975](05_chessx.assets/image-20220519141533975.png)

车的方向与帅的方向相同，只不过车可以连续走下去。

生成车的走法，伪代码如下：

```js
for (var i = 0; i < 4; i ++) {
  var delta = KING_DELTA[i];    // 得到一个方向
  var sqDst = sqSrc + delta;    // 从起点sqSrc开始，沿着方向delta走一步
  while (sqDst在棋盘上) {
    var pcDst = sqDst位置的棋子;
    if (pcDst == 0) {       // sqDst位置上根本就没有棋子
      走法合法，保存到步骤数组中
    } else {
      if (pcDst是对方的棋子) {
        走法合法，保存到步骤数组中
      }
      // 已经遇到了对方棋子，终止循环
      break;
    }
    sqDst += delta;     // 沿着方向delta向前走一步
  }
}
```

### 炮

![image-20220519141616658](05_chessx.assets/image-20220519141616658.png)

炮的走法与车类似，但炮遇到一个棋子后，可以越过去，也就是翻山，并吃掉一个对方棋子。

生成炮的走法，伪代码如下：

```js
for (var i = 0; i < 4; i ++) {
  var delta = KING_DELTA[i];    // 得到一个方向
  var sqDst = sqSrc + delta;    // 从起点sqSrc开始，沿着方向delta走一步
  while (sqDst在棋盘上) {
    var pcDst = sqDst位置的棋子;
    if (pcDst == 0) {       // sqDst位置上根本就没有棋子
      走法合法，保存到步骤数组中
    } else {            // 终点存在棋子，炮需要翻山
      break;
    }
    sqDst += delta;     // 沿着方向delta向前走一步
  }
  sqDst += delta;       // 沿着方向delta向前走一步
  while (IN_BOARD(sqDst)) { // 如果sqDst仍位于棋盘，那么此时炮已经翻山了
    var pcDst = sqDst位置的棋子;
    if (pcDst > 0) {     // 炮翻山后遇到了一个棋子
      if (pcDst是对方棋子) {
        走法合法，保存到步骤数组中
      }
      // 炮翻山后，不管遇到的是对方棋子，还是己方棋子，都要结束对当前方向的搜索
      break;
    }
    sqDst += delta;
  }
}
```

### 兵

![image-20220519141658949](05_chessx.assets/image-20220519141658949.png)

红兵和黑卒向前走的方向是不一样的，分别是-16和16。我们已经介绍了下面的函数：

```js
// sp是棋子位置，sd是走棋方（红方0，黑方1）。返回兵（卒）向前走一步的位置。
function SQUARE_FORWARD(sq, sd) {
  return sq - 16 + (sd << 5);
}
```

该函数可以获得兵（卒）前进一步的位置。

生成兵的走法，伪代码如下：

```js
var sqDst = SQUARE_FORWARD(sqSrc, this.sdPlayer);   // 得到兵（卒）前进一步的位置
if (sqDst在棋盘上) {
  var pcDst = sqDst位置的棋子;
  if (pcDst不是本方棋子) {
    走法合法，保存到步骤数组中
  }
}
if (这个兵（卒）已过河) {
  for (var delta = -1; delta <= 1; delta += 2) {
    // delta只能取-1和1两个值，这正是兵（卒）的左右两个方向
    sqDst = sqSrc + delta;
    if (sqDst在棋盘上) {
      var pcDst = sqDst位置的棋子;
      if (pcDst不是本方棋子) {
        走法合法，保存到步骤数组中
      }
    }
  }
}
```





