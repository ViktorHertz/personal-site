<template>
  <div class="totalBox">
    <div class="tipBox css2ebd875383243b7">走棋方：
      <span class="css2ebd875383243b7" :style="playerSide ? 'color: #c40a01':'color: black'">
        {{this.playSideStr}}
      </span>
    </div>
    <div class="tipBox2">
      <div class="winMsg">{{ this.playSideStr }}胜利！</div>
      <div class="scoreBox">
        <div class="wScore">红方得分：{{ this.wScore }}</div>
        <div class="bScore">黑方得分：{{ this.bScore }}</div>
        <br>
        <div class="commentBox">
          <div>红方得到的评语：{{ this.wMarkMsg }}</div>
          <div>黑方得到的评语：{{ this.bMarkMsg }}</div>
        </div>
      </div>
      <div class="btnBox">
        <button @click="winSure" class="f1">重开！</button>
      </div>
    </div>
    <button class="f1" @click="initBoard">remake</button>
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
      FEN: 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR',
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
        0, 0, 0, 0, 0, 0, -16, 0, -16, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, -1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, -1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 16, 0, 16, 0, 0, 0, 0, 0, 0, 0,
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
      playerSide: true,//走棋方为红方时为true，走棋方为黑方时为false
      KING0_INDEX: 199,//红方帅的坐标
      KING1_INDEX: 55,//黑方将的坐标
      wScore: 0,
      bScore: 0,
      markMsgArr: [
        '是不是没开显示器？',
        '都说你的技艺忽似三岁孩童，忽似八十老翁，今天一感受果然名不虚传。',
        '你们可别小看了新来的技术员，虽然他有点其貌不扬，但才华出众。',
        '这位技艺精湛的技术员是我们三顾茅庐才请到的，技艺简直可以说是独一无二了。',
        '你就是一个前无古人、后无来者、玉树临风、英俊潇洒的天生奇才。',
        '你的每一刀都很精准，我身上好像有蚂蚁在爬',
      ],
      wMarkMsg: 'err',
      bMarkMsg: 'err',
    }
  },
  computed: {
    playSideStr() {
      return this.playerSide ? '红方' : '黑方'
    }
  },
  mounted() {
    // const css = document.createElement('link');
    // css.rel = 'stylesheet';
    // css.href = 'https://cdn.repository.webfont.com/webfonts/nomal/148407/46489/62540fe2f629d81300ac19b5.css';
    // document.body.appendChild(css);
  },
  methods: {
    IN_BOARD(sq) {
      return this.IN_BOARD_[sq] !== 0;
    },
    COORD_XY(x, y) {// 将二维矩阵坐标转换为一维矩阵坐标 (x,y)含(0,0)
      return x + (y << 4);
    },
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
    initBoard() {
      this.displayChess = [
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
      ]//清空一下棋盘,这里会导致报错Cannot read property '0' of undefined，不过不重要，依然能实现
      // this.FENArray = this.FEN.split('') //将FEN字符串转为数组
      this.playerSide = true
      this.sqSrc = this.sqDest = this.pcSelfSide = this.selectedPos = this.wScore = this.bScore = 0
      this.wMarkMsg = ''
      this.KING0_INDEX = 199
      this.KING1_INDEX = 55
      this.FENtoBoard(this.FEN.split(''))//将FEN串(array型)转化为一维数组形式，并且字符元素映射为整型,保存在this.displayChess
      for (let i = 0; i < 256; i++) {//将棋盘外元素设置为null
        if (!this.IN_BOARD(i)) {
          this.displayChess[i] = null
        }
        // else this.displayChess[i] = 1
      }
      let start = this.COORD_XY(3, 3) //51,循环开始处
      let end = this.COORD_XY(11, 12) //203，循环结束处
      // let imgDomArr = document.querySelectorAll('div.imgBox img')
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
          this.imgDomArr[imgIndex].src = imgSrcStr
          /*清空变量*/
          tag = '';
          row = 0;
          imgIndex = 0
        }
      }

    },
    FENtoBoard(FENArray) {
      let x = 3, y = 3
      for (let i in FENArray) {
        let ch = FENArray[i]
        if (ch == '/') {//换行
          y++
        }
        if (y > 12) break
        if (x > 11) x = 3
        else if (ch >= '1' && ch <= '9') {//出现空位
          x += parseInt(ch)
        } else if ((ch >= 'a' && ch <= 'z')) {//红方棋子或黑方棋子
          let index = x + (y << 4)
          this.displayChess[index] = this.FENCharToNum(ch)
          x++
        } else if (ch >= 'A' && ch <= 'Z') {
          let index = x + (y << 4)
          this.displayChess[index] = this.FENCharToNum(ch)
          x++
        } else console.log('err');
      }
    },
    chess1Click(chessInfo) {
      // this.judgeKtoK()
      this.displayChess = chessInfo.displayChess //把子组件发射的棋盘储存一下
      this.manageBoardArray()//整理一下棋盘
      this.sq = chessInfo.sqSelected
      let currentPc = this.displayChess[chessInfo.sqSelected]
      let flag1 = this.playerSide && (currentPc >= 8 && currentPc <= 14) //标识是否为：红方走棋且棋子的值是红方
      let flag2 = !this.playerSide && currentPc >= 16 // 标识是否为：黑方走棋且棋子的值是黑方
      if (this.selectedPos === 0 && (flag1 || flag2)) {
        // 当前棋盘上没有棋子被选中,如果点击的是己方棋子，那么直接选中该子
        this.selectedPos = chessInfo.sqSelected
      }
      else if (this.selectedPos !== 0) {//当前棋盘上有棋子被选中
        if (flag1 || flag2) {// 点击的是本方棋子
          this.selectedPos = chessInfo.sqSelected
        }
        else {//点击的是对方棋子或空白处
          this.sqSrc = this.selectedPos
          this.sqDest = chessInfo.sqSelected
          let flag3 = this.judgeMove(this.displayChess[this.sqSrc], this.sqSrc, this.sqDest)//用于标记走棋是否合法
          if (flag3) {

            /*前2种情况是游戏结束时执行*/
            if (this.displayChess[this.sqDest] === 8) {//如果吃掉红方的帅
              $('div.tipBox2').attr('style', 'display: flex;')
              this.bScore += 40
              this.markBoard()
            }
            else if (this.displayChess[this.sqDest] === 16) {//如果吃掉黑方的将
              $('div.tipBox2').attr('style', 'display: flex;')
              this.wScore += 40
              this.markBoard()
            }
            else {
              if (this.displayChess[this.sqDest] & 8) {//终点处是红方棋子
                this.bScore += 10
              }
              else if (this.displayChess[this.sqDest] & 16) {//终点处是黑方棋子
                this.wScore += 10
              }

              this.$set(this.displayChess, this.sqDest, this.displayChess[this.sqSrc])//将起点处的棋子移到终点处
              this.$set(this.displayChess, this.sqSrc, 1)
              this.playerSide = !this.playerSide

              // console.log('终点棋子:' + this.displayChess[this.sqDest]);
              // console.log('起点棋子:' + this.displayChess[this.sqSrc]);
            }

          }
        }

      }
      this.judgeKtoK()
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
      let pieNum = pieceVal - this.pcSelfSide //棋子的编号，即this.pieceNumber中的某个值
      let item = sqDest - sqSrc
      if (pieNum === this.pieceNumber.king) {//将、帅
        // console.log('移动的是将/帅');
        // console.log('sqDest:' + sqDest);
        // console.log('sqSrc:' + sqSrc);
        if(sqDest > 128) {//证明是红方的帅在移动
          this.KING0_INDEX = sqDest
        }
        else if(sqDest < 128) {
          this.KING1_INDEX = sqDest
        }
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
      else if (pieNum === this.pieceNumber.rook) {//车
        let isHavePc = false
        if (item > 0) {
          if (item % 16 === 0) {//按列往下走
            for (let i = sqSrc + 16; i < sqDest;) {
              if (this.displayChess[i] >= 8) {
                isHavePc = true
                break
              }
              i += 16
            }
          } else {//向右移
            for (let i = sqSrc + 1; i < sqDest; i++) {
              if (this.displayChess[i] >= 8) {
                isHavePc = true
                break
              }
            }
          }
        } else if (item < 0) {
          if (Math.abs(item) % 16 === 0) {//按列往上走
            for (let i = sqSrc - 16; i > sqDest;) {
              if (this.displayChess[i] >= 8) {
                isHavePc = true
                break
              }
              i -= 16;
            }
          } else {//向左移
            for (let i = sqSrc - 1; i > sqDest; i--) {
              if (this.displayChess[i] >= 8) {
                isHavePc = true
                break
              }
            }
          }
        }
        return (this.RANK_Y(sqSrc) === this.RANK_Y(sqDest) || this.FILE_X(sqSrc) === this.FILE_X(sqDest))
            && !isHavePc
      }
      else if (pieNum === this.pieceNumber.cannon) {//炮
        let havePcNum = 0, isHavePc = false
        if (Math.abs(item) % 16 === 0) { //按列走
          if (item > 0) {//往下走
            for (let i = sqSrc + 16; i < sqDest;) {//按列往下走
              if (this.displayChess[i] >= 8) {
                // console.log(i);
                havePcNum++
                isHavePc = true
                if (havePcNum > 1) break
              }
              i += 16
            }
          } else if (item < 0) {//往上走
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
        } else {
          if (item > 0) {//向右移
            for (let i = sqSrc + 1; i < sqDest; i++) {
              if (this.displayChess[i] >= 8) {
                havePcNum++
              }
              if (havePcNum > 1) break
            }
          } else {//向左移
            for (let i = sqSrc - 1; i > sqDest; i--) {
              if (this.displayChess[i] >= 8) {
                havePcNum++
              }
              if (havePcNum > 1) break
            }
          }
        }
        /*炮要想越过一个棋子，其终点处必须为对方棋子*/
        let flag = false
        if (this.playerSide) {//走棋方为红方
          if (this.displayChess[sqDest] & 16) {//终点处为黑方棋子
            flag = true
          }
        } else {
          if (this.displayChess[sqDest] & 8) {//终点处为红方棋子
            flag = true
          }
        }
        return (this.RANK_Y(sqSrc) === this.RANK_Y(sqDest) || this.FILE_X(sqSrc) === this.FILE_X(sqDest)) //同行同列
            && ((havePcNum === 1 && flag) || havePcNum === 0)
      }
      else if (pieNum === this.pieceNumber.pawn) {//兵
        let sd, //用于标记走棋方
            flag1 = false, //用于标记是否可以左右走
            flag2 = false //用于标记是否可以往前走
        if (this.pcSelfSide === 16) {//走棋方为黑方
          sd = 1
          if (item === 16) flag2 = true
        } else if (this.pcSelfSide === 8) {//走棋方为红方
          sd = 0
          if (item === -16) flag2 = true
        }

        if (this.AWAY_HALF(sqDest, sd)) {
          if (Math.abs(item) === 1) {
            flag1 = true
          }
        }
        return flag2 || flag1
      }
      else
        console.log('走法不合法或点击了空白处');
    },
    /*判断将帅相对时游戏结束*/
    judgeKtoK() {
      let isHavePc_KING = false //用于查询将帅之间是否有棋子格挡
      for(let i = this.KING1_INDEX + 16; i <= this.KING0_INDEX - 16;) {//查询将帅之间是否有棋子格挡
        if(this.displayChess[i] >= 8) {
          isHavePc_KING = true
          // console.log('在i处有格挡:' + i);
          break
        }
        i += 16
      }
      if(this.FILE_X(this.KING0_INDEX) === this.FILE_X(this.KING1_INDEX) && !isHavePc_KING) {
        //将帅在同一列且中间无棋子格挡
        if(this.playerSide) {//红方走
          this.wScore += 40
        }
        else
          this.bScore += 40
        // this.playerSide = !this.playerSide
        this.markBoard()
        $('div.tipBox2').attr('style', 'display: flex;')
        // console.log('将帅在同一列');
      }
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
        if ((this.displayChess[i] === undefined || this.displayChess[i] < 8) && this.IN_BOARD_[i]) {
          this.displayChess[i] = 1
        }
      }
    },
    winSure() {
      $('div.tipBox2').attr('style', 'display: none;')
      this.initBoard()
    },
    markBoard() {
      let wScore = this.wScore
      if (wScore <= 20) this.wMarkMsg = this.markMsgArr[0];
      else if (wScore <= 30) this.wMarkMsg = this.markMsgArr[1];
      else if (wScore <= 40) this.wMarkMsg = this.markMsgArr[2];
      else if (wScore <= 50) this.wMarkMsg = this.markMsgArr[3];
      else if (wScore <= 60) this.wMarkMsg = this.markMsgArr[4];
      else if (wScore > 60) this.wMarkMsg = this.markMsgArr[5];
      else this.wMarkMsg = '暂无评分'
      let bScore = this.bScore

      if (bScore <= 20) this.bMarkMsg = this.markMsgArr[0];
      else if (bScore <= 30) this.bMarkMsg = this.markMsgArr[1];
      else if (bScore <= 40) this.bMarkMsg = this.markMsgArr[2];
      else if (bScore <= 50) this.bMarkMsg = this.markMsgArr[3];
      else if (bScore <= 60) this.bMarkMsg = this.markMsgArr[4];
      else if (bScore > 60) this.bMarkMsg = this.markMsgArr[5];
      else this.wMarkMsg = '暂无评分'
    },
    btnClick() {
      console.log(-32 % 16);
    }
  },
}
</script>

<style scoped lang="scss">
  .totalBox {
    position: relative;
    font-size: 2ch;
    .css2ebd673af7243b7 {
      position: absolute;
      right: 45%;
      left: 45%;
      top: 50%;
      transform: translateX(-50%);
      font-size: 2.5vw;
      display: flex;
      flex-wrap: nowrap;
      width: 50%;
    }
    .tipBox {
      font-family: 'LiShu';
      position: absolute;
      left: 10%;
      top: 40%;
      /* width: 2ch; */
      /* transform: translateX(-50%); */
      font-size: 2.5vw;
      display: flex;
      flex-direction: column;
      /* align-items: baseline; */
      flex-wrap: nowrap;
      width: 1ch;
    }

    .tipBox2 {
      display: none;
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: rgba(38, 50, 56, .9);
      color: white;
      //display: flex;
      justify-content: center;
      //align-items: center;
      flex-wrap: wrap;
      padding: 5px;
      z-index: 1;
      .winMsg {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        font-size: 5vw;
        .scoreBox {
          display: flex;
          margin-bottom: -20vw;
          .wScore {
            width: 100%;
            text-align: center;
          }
          .bScore {
            width: 100%;
            text-align: center;
          }
          .commentBox {
            width: 100%;
          }
        }
      }
      .btnBox {
        width: 100%;
        //display: flex;
        text-align: center;
        justify-content: center;
      }
    }

    .f1 {
      margin: 5px;
      border: none;
      box-sizing: border-box;
      padding: 13px 10px;
      color: white;
      background-color: #1a6aa6;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
    }

    .f1:hover {
      background-color: #12609b;
    }
  }
  @font-face {
    font-family: 'LiShu';
    src: url("../public/css/LiShu/LiShu.eot"); /* IE9 */
    src: url("../public/css/LiShu/LiShu.eot?#iefix") format("embedded-opentype"); /* IE6-IE8 */

    src: url('../public/css/LiShu/LiShu.woff') format('woff'), /* Modern Browsers */
    url('../public/css/LiShu/LiShu.ttf')  format('truetype'), /* Safari, Android, iOS */
    url("../public/css/LiShu/LiShu.svg")  format('svg'); /* Legacy iOS */
  }
</style>