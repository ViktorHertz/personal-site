<template>
  <div>
    <h2>{{ this.playSideStr }}</h2>
    <!--    <div>{{displayChess}}</div>-->
    <button @click="btnClick">父组件按钮</button>
    <!--    <h3>{{ sq }}</h3>-->
    <chess1 @show="chess1Click" :displayChess="displayChess"></chess1>
  </div>
</template>

<script>
import chess1 from "./Chess1";

export default {
  name: "chess2",
  components: {chess1},
  data() {
    return {
      IN_BOARD_: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      selectedPos: 0,//用于记录选择的位置
      sqSrc: -1,
      sqDest: -1,
      displayChess: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,//3
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,//12
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      pieceNumber: {
        king: 0,//帅
        advisor: 1,//士
        bishop: 2,//相
        knight: 3,//马
        rook: 4,//车
        cannon: 5,//炮
        pawn: 6,//卒
      },
      pcSelfSide: 0,//走棋方为红方时pcSelfSide=8，走棋方为黑方时pcSelfSide=16
      IN_FORT_: [//辅助数组，标识是否在九宫内
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      LEGAL_SPAN: [//辅助数组,用于判断sqDest-sqSrc等于-16、-1、1、16其中的一个
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
      ],
      KNIGHT_PIN_: [//辅助数组，用于判断马脚处是否有棋子
        0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,-16,  0,-16,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0, -1,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0, -1,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0, 16,  0, 16,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0,  0,  0,  0,
      ],
      playerSide: true
    }
  },
  computed: {
    playSideStr() {
      return this.playerSide ? '红方' : '黑方'
    }
  },
  methods: {
    IN_FORT(sq) {
      return this.IN_FORT_[sq] !== 0;
    },
    SAME_HALF(sqSrc, sqDst) {// 如果从起点sqSrc到终点sqDst没有过河，则返回true；否则返回false
      return ((sqSrc ^ sqDst) & 0x80) === 0;
    },
    AWAY_HALF(sq, sd) {// sq是棋子位置，sd是走棋方（红方0，黑方1）。如果该位置已过河，则返回true；否则返回false。
      return (sq & 0x80) === (sd << 7);
    },
    SQUARE_FORWARD(sq, sd) {
      return sq - 16 + (sd << 5);
    },
    KING_SPAN(sqSrc, sqDst) {
      return this.LEGAL_SPAN[sqDst - sqSrc + 256] == 1;
    },
    chess1Click(chessInfo) {
      this.displayChess = chessInfo.displayChess //把子组件发射的棋盘储存一下
      this.manageBoardArray()//整理一下棋盘
      this.sq = chessInfo.sqSelected
      let currentPc = this.displayChess[chessInfo.sqSelected]
      let flag1 = this.playerSide && (currentPc >= 8 && currentPc <= 14) //标识是否为：红方走棋且棋子的值是红方
      let flag2 = !this.playerSide && currentPc >= 16 // 标识是否为：黑方走棋且棋子的值是黑方
      if(this.selectedPos === 0 && (flag1 || flag2)) {
        // 当前棋盘上没有棋子被选中,如果点击的是己方棋子，那么直接选中该子

      }



      if(chessInfo.fileName !== 'U' && this.selectedPos === 0) {//用户点击的不是空白，且当前没有棋子被选中,
        console.log('用户点击的不是空白，且当前没有棋子被选中');
        if (this.playerSide && (currentPc >= 8 && currentPc <= 14)) {//红方走棋且棋子的值是红方
          this.selectedPos = chessInfo.sqSelected
        }
        else if(!this.playerSide && currentPc >= 16) {//黑方走棋且棋子的值是黑方
          this.selectedPos = chessInfo.sqSelected
        }
        else
          console.log('err');
      }
      else {//this.selectedPos !== 0
        console.log('另一种情况');
        if(!this.playerSide) {//黑方棋子,假设是本方棋子currentPc >= 16
          this.selectedPos = chessInfo.sqSelected
        }
        else if(this.playerSide) {//黑方棋子或空白(currentPc >= 8 && currentPc <= 14) || chessInfo.fileName === 'U'
          this.sqSrc = this.selectedPos
          this.sqDest = chessInfo.sqSelected

          let temp = this.judgeMove(this.displayChess[this.sqSrc], this.sqSrc, this.sqDest)
          if (temp) {
            console.log('准备移动棋子');
            this.$set(this.displayChess, this.sqDest, this.displayChess[this.sqSrc])//将起点处的棋子移到终点处
            this.$set(this.displayChess, this.sqSrc, 1)
            this.playerSide = !this.playerSide
          }
          else
            console.log('不合法！！');
        }
      }

      // if (1) {//若用户点击的是空白处chessInfo.fileName === 'U'
      //   this.sqDest = chessInfo.sqSelected
      //   let temp = this.judgeMove(this.displayChess[this.sqSrc], this.sqSrc, this.sqDest)
      //   if (temp) {//this.sqSrc !== -1 &&
      //
      //     this.$set(this.displayChess, this.sqDest, this.displayChess[this.sqSrc])//将起点处的棋子移到终点处
      //     this.$set(this.displayChess, this.sqSrc, 1)
      //   }
      // } else
      //   this.sqSrc = chessInfo.sqSelected
      // console.log('src:' + this.sqSrc);
      // console.log('dest:' + this.sqDest);
    },
    drawWithFEN() {
      // this.FENArray = []
      // this.FENArray = FEN.split('')
      // this.displayChess = []
      // this.FENtoBoard(this.FENArray)
      // // console.log(this.displayChess);
      // for(let i=0;i<256;i++) {//将棋盘外元素设置为null
      //   if(!this.IN_BOARD(i)) {
      //     this.displayChess[i] = null
      //   }
      // }
      let start = this.COORD_XY(3, 3) //51,循环开始处
      let end = this.COORD_XY(11, 12) //203，循环结束处
      let imgDomArr = document.querySelectorAll('div.imgBox img')
      /*tag用作记录文件名关键信息；
      **row是当前循环索引值i对应的二维坐标的行数,col是列数；
      **imgIndex用于记录i对应第几个图片*/
      let tag = '', row = 0, imgIndex = 0, col = 0;
      for (let i = start; i <= end; i++) {
        if (this.IN_BOARD(i)) {
          switch (this.displayChess[i]) {
            case 8:
              tag = 'K';
              break;
            case 9:
              tag = 'A';
              break;
            case 10:
              tag = 'B';
              break;
            case 11:
              tag = 'N';
              break;
            case 12:
              tag = 'R';
              break;
            case 13:
              tag = 'C';
              break;
            case 14:
              tag = 'P';
              break;

            case 16:
              tag = 'k_';
              break;
            case 17:
              tag = 'a_';
              break;
            case 18:
              tag = 'b_';
              break;
            case 19:
              tag = 'n_';
              break;
            case 20:
              tag = 'r_';
              break;
            case 21:
              tag = 'c_';
              break;
            case 22:
              tag = 'p_';
              break;
            case 1:
              tag = 'UNexist';
              break;
            case 0:
              tag = 'UNexist'
              break;
            default:
              tag = 'UNexist'
          }
          row = this.RANK_Y(i)
          col = this.FILE_X(i)
          imgIndex = i - 7 * row - 30
          let imgSrcStr = `/img/chess/${tag}.png`;
          imgDomArr[imgIndex].src = imgSrcStr // 重新渲染棋子图片
          /*清空变量*/
          tag = '';
          row = 0;
          imgIndex = 0
        }
      }

    },
    FENCharToNum(item) {//将棋子字符转成对应的整数
      switch (item) {
        case 'K' : {
          return 8;
          break
        }
        case 'A':
          return 9;
          break
        case 'B':
          return 10;
          break
        case 'N':
          return 11;
          break
        case 'R':
          return 12;
          break
        case 'C':
          return 13;
          break
        case 'P':
          return 14;
          break

        case 'k':
          return 16;
          break
        case 'a':
          return 17;
          break
        case 'b':
          return 18;
          break
        case 'n':
          return 19;
          break
        case 'r':
          return 20;
          break
        case 'c':
          return 21;
          break
        case 'p':
          return 22;
          break
        default:
          return 1
      }
    },
    /*判断各种棋子的走法*/
    judgeMove(pieceVal, sqSrc, sqDest) {
      // console.log('棋子数值:'+pieceVal);
      if (this.playerSide) {//如果起点处为红方棋子pieceVal <= 14 && pieceVal >= 8
        this.pcSelfSide = 8
      } else
        this.pcSelfSide = 16
      // console.log(this.pcSelfSide);
      // console.log(21 & 8);
      // return this.displayChess[sqDest] & this.pcSelfSide
      // this.isHaveSelfPc(pieceVal, sqDest)//计算一下pc

      let pieNum = pieceVal - this.pcSelfSide //棋子的编号，即this.pieceNumber中的某个值
      console.log('棋子的值：' + pieceVal);
      // console.log('pcSelfSide：' + this.pcSelfSide);
      // console.log('棋子的编号:' + pieNum);
      let item = sqDest - sqSrc
      if (pieNum === this.pieceNumber.king) {//将、帅
        return ((item === -16 || item === 16 || item === 1 || item === -1)) && (this.IN_FORT(sqDest))
      }
      else if (pieNum === this.pieceNumber.advisor) {//士
        return ((item === -17 || item === 17 || item === -15 || item === 15)) && (this.IN_FORT(sqDest))
      }
      else if (pieNum === this.pieceNumber.bishop) {//相
        return ((item === -34 || item === 34 || item === -30 || item === 30))
            && (this.SAME_HALF(sqSrc, sqDest))
            && (this.displayChess[Math.floor((sqSrc + sqDest) / 2)] === 1)
      }
      else if (pieNum === this.pieceNumber.knight) {//马
        let sqPin = sqSrc + this.KNIGHT_PIN_[sqDest - sqSrc + 256]
        return ((item === -33) || (item === 33) || (item === -18) ||
                (item === 18) || (item === -14) || (item === 14) ||
                (item === -31) || (item === 31))
           && (this.displayChess[sqPin] === 1)
      }
      else if (pieNum === this.pieceNumber.rook) {
        let isHavePc = false
        if(item > 0) {
          if(item % 16 === 0) {//按列往下走
            console.log(item);
            // console.log('起点：' + sqSrc);
            // console.log('终点:' + sqDest);
            for(let i = sqSrc + 16;i < sqDest;){
              if(this.displayChess[i] >= 8) {
                // console.log(i);
                isHavePc = true
                break
              }
              i += 16
            }
          }
        }
        else if(item < 0) {
          if(Math.abs(item) % 16 === 0) {//按列往上走
            for(let i = sqSrc - 16;i > sqDest;) {
              if(this.displayChess[i] >= 8) {
                isHavePc = true
                break
              }
              i -= 16;
            }
          }
        }
        return (this.RANK_Y(sqSrc) === this.RANK_Y(sqDest) || this.FILE_X(sqSrc) === this.FILE_X(sqDest))
          && !isHavePc
      }
      else if(pieNum === this.pieceNumber.cannon) {//炮
        let havePcNum = 0, isHavePc = false
        if(item % 16 === 0) { //按列走
          if (item > 0) {
            for (let i = sqSrc + 16; i < sqDest;) {//按列往下走
              if (this.displayChess[i] >= 8) {
                // console.log(i);
                havePcNum++
                isHavePc = true
                if (havePcNum > 1) break
              }
              i += 16
            }
          }
          else if(item < 0) {
            for (let i = sqSrc - 16; i > sqDest;) {//按列往上走
              if (this.displayChess[i] >= 8) {
                // console.log(i);
                havePcNum++
                isHavePc = true
                if (havePcNum > 1) break
              }
              i -= 16
            }

          }
        }
        else {
          if (item > 0) {//向右移
            for (let i = sqSrc + 1; i < sqDest;i++) {
              if(this.displayChess[i] >= 8) {
                havePcNum ++
              }
              if(havePcNum > 1) break
            }
          }
          else {//向左移
            for(let i = sqSrc - 1; i > sqDest;i--) {
              if(this.displayChess[i] >= 8) {
                havePcNum ++
              }
              if(havePcNum > 1) break
            }
          }
        }
        return (this.RANK_Y(sqSrc) === this.RANK_Y(sqDest) || this.FILE_X(sqSrc) === this.FILE_X(sqDest))
            && ((havePcNum === 1 && (this.displayChess[sqDest] <= 14 && this.displayChess[sqDest] >=8 ))
                || (havePcNum === 0) )
      }
      else if(pieNum === this.pieceNumber.pawn) {//兵
        let sd, //用于标记走棋方
            flag = false //用于标记是否可以左右走
        if(this.pcSelfSide >= 16) {
          sd = 1
        }
        else
          sd = 0
        if(this.AWAY_HALF(sqSrc, sd)) {
          if(Math.abs(item) === 1) {
            flag = true
          }
        }
        return (item === 16) || flag
      }
      else
        console.log('走法不合法或点击了空白处');

    },
    /*校验棋子的终点是否有本方棋子*/
    isHaveSelfPc(pieceVal, sqDest) {
      if (pieceVal & 8 === 1) {
        this.pcSelfSide = 16 //红方棋子
      } else
        this.pcSelfSide = 8
      console.log(this.displayChess[sqDest] & this.pcSelfSide);
      return this.displayChess[sqDest] & this.pcSelfSide
    },
    RANK_Y(sq) {// 根据一维矩阵，获取二维矩阵行数 行数从0开始
      return sq >> 4;
    },
    FILE_X(sq) {// 根据一维矩阵，获取二维矩阵列数
      return sq & 15;
    },
    manageBoardArray() {
      for (let i = 0; i < 256; i++) {
        if((this.displayChess[i] === undefined || this.displayChess[i] < 8) && this.IN_BOARD_[i])  {
          this.displayChess[i] = 1
        }
      }
    },
    btnClick() {
      // this.$set(this.displayChess,51,20)
      console.log(-32 % 16);
    }
  },
}
</script>

<style scoped>

</style>