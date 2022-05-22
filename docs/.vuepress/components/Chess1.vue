<template>
  <div>
    <div class="chessBoard">
      <div class="imgBox myImgBox" v-for="(item,index) in 90">
        <img :src="$withBase(`/img/chess/K_.png`)"
             :id="`pos${index}`" alt="一个棋子"
             :key="index">
      </div>
      <div class="myFontBox">
        <div class="css2ebd673af7243b7">楚河</div>
        <div class="css2ebd673af7243b7">汉界</div>
      </div>
    </div>
    <ul class="audioBx" style="display: none">
      <li><audio id="skill1" :src="$withBase(`/music/兵线刷新.mp3`)"></audio></li>
      <li><audio id="skill2" :src="$withBase(`/music/替父从军.mp3`)"></audio></li>
      <li><audio id="skill3" :src="$withBase(`/music/草木皆兵.mp3`)"></audio></li>
    </ul>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "Chess",
  props: {
    displayChess: {
      type: Array,
      default: [
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
    },
    playerSide: {
      type: Boolean,
      default: false
    },
    isSelectMachine: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      test: [],
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
      displayChessTemp: [
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
      FEN: 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR',
      FENArray: [],
      userInputFEN: '',
      userInput: '',
      sqSelected: 0,//鼠标是否选中一棋子
      currentChess: '',//当前选中的棋子，的首字母,
      displayChess_Old: []
    }
  },
  computed: {
    imgDomArr() {
      return document.querySelectorAll('div.imgBox img')
    },
  },
  watch: {
    displayChess: {
      handler(val, oldVal) {
        this.displayChess_Old = oldVal.map((item) => {return item})
        this.displayChessTemp = val.map(item => {return item})
        let start = this.COORD_XY(3, 3) //51,循环开始处
        let end = this.COORD_XY(11, 12) //203，循环结束处
        /*tag用作记录文件名关键信息；
        **row是当前循环索引值i对应的二维坐标的行数,col是列数；
        **imgIndex用于记录i对应第几个图片*/
        let tag = '', row = 0, imgIndex = 0, col = 0;
        for (let i = start; i <= end; i++) {
          if (this.IN_BOARD(i)) {
            switch (val[i]) {
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
        // console.log(this.imgDomArr[0].src);
      },
      // deep: true
    },
    async playerSide(newVal,oldVal) {
      if(!newVal && this.isSelectMachine) {//表示黑方走棋且选择了人机对战
        // let skill = await this.machine_passiveSkills()
        let skill = 0
        if(skill === 1) {
          this.$message.warning('触发被动技能：兵线刷新')
        }
        else if(skill === 2) {
          this.$message.warning('触发被动技能：替父从军')
        }
        else if(skill === 3) {
          this.$message.warning('触发被动技能：草木皆兵')
        }
        else if(skill === 0) {
          // let dom1 = $('#pos8')
          let domArr = this.machine_getPcToBeMoved().map(e => {return e})
          let dom1 = domArr[0]
          // let dom2 = this.machine_getSteps(dom1)[0]
          // let dom2 = this.machine_getExactStep(dom1)
          let dom2 = domArr[1]
          this.$message.success('电脑移动了' + this.ImgNameToChessName(dom1.attr('src').slice(11,12)))

          this.machineMove(dom1,dom2)
          // console.log(dom1);
          // console.log(dom2);
          // console.log(this.machine_getSteps(dom1));
        }
      }
    }
  },
  mounted() {
    // const css = document.createElement('link');
    // css.rel = 'stylesheet';
    // css.href = 'https://cdn.repository.webfont.com/webfonts/nomal/148407/46489/625407aaf629d81300ac19b3.css';
    // document.body.appendChild(css);

    this.initBoard()
    /*每个img绑定一个点击事件*/
    document.querySelectorAll('div.imgBox img').forEach((e, index) => {
      e.addEventListener('mousedown', (e, index) => {
        let fileName = e.target.src.slice(32, 33)
        // console.log(fileName);
        let alertStr = this.ImgNameToChessName(fileName)

        let imgIndex = parseInt(e.target.id.slice(3)) + 1
        // console.log(imgIndex);
        // console.log(this.displayChessTemp);
        let chessInfo = {//棋子的一些信息
          displayChess: this.displayChessTemp,
          fileName: fileName,
          imgIndex: imgIndex,
          sqSelected: this.imgIndexToSq(imgIndex)
        }

        this.chess1Click(chessInfo)

        /*用户每次点击棋子应该将该棋子储存到当前棋子currentChess*/
        // this.currentChess = fileName
        // if(this.sqSelected) {
        //   if(this.currentChess != 'U') {
        //     console.log('上次点击的是空白处');
        //   }
        // }
      })
    })

  },
  methods: {
    /*传入一维坐标，如果在棋盘内，返回true*/
    IN_BOARD(sq) {
      return this.IN_BOARD_[sq] !== 0;
    },
    /*判断是否在九宫格内,若是，返回true*/
    IN_FORT(sq) {
      return this.IN_FORT_[sq] !== 0;
    },
    /*将二维矩阵坐标转换为一维矩阵坐标 (x,y)含(0,0)*/
    COORD_XY(x, y) {// 将二维矩阵坐标转换为一维矩阵坐标 (x,y)含(0,0)
      return x + (y << 4);
    },
    /*根据一维矩阵，获取二维矩阵行数 行数从0开始*/
    RANK_Y(sq) {// 根据一维矩阵，获取二维矩阵行数 行数从0开始
      return sq >> 4;
    },
    /*根据一维矩阵，获取二维矩阵列数*/
    FILE_X(sq) {// 根据一维矩阵，获取二维矩阵列数
      return sq & 15;
    },
    /*初始化棋盘，得到棋盘一开始的布局*/
    initBoard() {
      this.displayChessTemp = []//清空一下棋盘
      this.FENArray = this.FEN.split('') //将FEN字符串转为数组

      this.FENtoBoard(this.FENArray)//将FEN串(array型)转化为一维数组形式，并且字符元素映射为整型,保存在this.displayChessTemp
      for (let i = 0; i < 256; i++) {//将棋盘外元素设置为null
        if (!this.IN_BOARD(i)) {
          this.displayChessTemp[i] = null
        }
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
          switch (this.displayChessTemp[i]) {
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
        } else continue
      }

    },
    /*将FEN串(array型)转化为一维数组形式，并且字符元素映射为整型,保存在this.displayChessTemp*/
    FENtoBoard(FENArray) {
      let x = 3, y = 3
      for (let i in FENArray) {
        let ch = FENArray[i]
        if (ch === '/') {//换行
          y++
        }
        if (y > 12) break
        if (x > 11) x = 3
        else if (ch >= '1' && ch <= '9') {//出现空位
          x += parseInt(ch)
        } else if ((ch >= 'a' && ch <= 'z')) {//红方棋子或黑方棋子
          let index = x + (y << 4)
          this.displayChessTemp[index] = this.FENCharToNum(ch)
          x++
        } else if (ch >= 'A' && ch <= 'Z') {
          let index = x + (y << 4)
          this.displayChessTemp[index] = this.FENCharToNum(ch)
          x++
        } else console.log('err');
      }
    },
    /*将棋子字符转成对应的整数*/
    FENCharToNum(item) {//将棋子字符转成对应的整数
      switch (item) {
        case 'K' : {
          return 8;
        }
        case 'A':
          return 9;
        case 'B':
          return 10;
        case 'N':
          return 11;
        case 'R':
          return 12;
        case 'C':
          return 13;
        case 'P':
          return 14;

        case 'k':
          return 16;
        case 'a':
          return 17;
        case 'b':
          return 18;
        case 'n':
          return 19;
        case 'r':
          return 20;
        case 'c':
          return 21;
        case 'p':
          return 22;
        default:
          return 'err'
      }
    },
    /*根据字符，返回图片文件名(的关键信息)*/
    FENCharToImg(ch) {
      switch (ch) {
        case 'K' : {
          return 'K';
        }
        case 'A':
          return 'A';
        case 'B':
          return 'B';
        case 'N':
          return 'N';
        case 'R':
          return 'R';
        case 'C':
          return 'C';
        case 'P':
          return 'P';

        case 'k':
          return 'k_';
        case 'a':
          return 'a_';
        case 'b':
          return 'b_';
        case 'n':
          return 'n_';
        case 'r':
          return 'r_';
        case 'c':
          return 'c_';
        case 'p':
          return 'p_';
        default:
          return 'err'
      }
    },
    /*根据棋子图片文件名，返回棋子中文字符串*/
    ImgNameToChessName(imgName) {
      switch (imgName) {
        case 'K' : {
          return '红方_帅';
        }
        case 'A':
          return '红方_士';
        case 'B':
          return '红方_相';
        case 'N':
          return '红方_马';
        case 'R':
          return '红方_车';
        case 'C':
          return '红方_炮';
        case 'P':
          return '红方_兵';

        case 'k':
          return '黑方_将';
        case 'a':
          return '黑方_仕';
        case 'b':
          return '黑方_象';
        case 'n':
          return '黑方_马';
        case 'r':
          return '黑方_车';
        case 'c':
          return '黑方_炮';
        case 'p':
          return '黑方_卒';
        default:
          return '空'
      }
    },
    /*根据FEN串绘制棋盘*/
    drawWithFEN(FEN) {
      this.FENArray = []
      this.FENArray = FEN.split('')
      this.displayChessTemp = []
      this.FENtoBoard(this.FENArray)
      // console.log(this.displayChessTemp);
      for (let i = 0; i < 256; i++) {//将棋盘外元素设置为null
        if (!this.IN_BOARD(i)) {
          this.displayChessTemp[i] = null
        }
      }
      let start = this.COORD_XY(3, 3) //51,循环开始处
      let end = this.COORD_XY(11, 12) //203，循环结束处
      // this.imgDomArr = document.querySelectorAll('div.imgBox img')
      /*tag用作记录文件名关键信息；
      **row是当前循环索引值i对应的二维坐标的行数,col是列数；
      **imgIndex用于记录i对应第几个图片*/
      let tag = '', row = 0, imgIndex = 0, col = 0;
      for (let i = start; i <= end; i++) {
        if (this.IN_BOARD(i)) {
          switch (this.displayChessTemp[i]) {
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
          this.imgDomArr[imgIndex].src = imgSrcStr // 重新渲染棋子图片
          /*清空变量*/
          tag = '';
          row = 0;
          imgIndex = 0
        }
      }

    },
    /*根据displayChessTemp重新绘制局面*/
    drawWithSq() {
      let start = this.COORD_XY(3, 3) //51,循环开始处
      let end = this.COORD_XY(11, 12) //203，循环结束处
      // this.imgDomArr = document.querySelectorAll('div.imgBox img')
      /*tag用作记录文件名关键信息；
      **row是当前循环索引值i对应的二维坐标的行数,col是列数；
      **imgIndex用于记录i对应第几个图片*/
      let tag = '', row = 0, imgIndex = 0, col = 0;
      for (let i = start; i <= end; i++) {
        if (this.IN_BOARD(i)) {
          switch (this.displayChessTemp[i]) {
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
          this.imgDomArr[imgIndex].src = imgSrcStr // 重新渲染棋子图片
          /*清空变量*/
          tag = '';
          row = 0;
          imgIndex = 0
        }
      }
    },
    /*将第几个图片标签转换为sq*/
    imgIndexToSq(imgIndex) {
      let row = Math.floor((imgIndex - 1) / 9) + 3
      return imgIndex + 30 + 7 * row - 1
      // console.log('sq:' + sq);
    },
    /*如果从起点sqSrc到终点sqDst没有过河，则返回true；否则返回false*/
    SAME_HALF(sqSrc, sqDst) {// 如果从起点sqSrc到终点sqDst没有过河，则返回true；否则返回false
      return ((sqSrc ^ sqDst) & 0x80) === 0;
    },
    /*电脑走棋
    * dom:电脑操控模拟鼠标点击处的dom对象(实际上是调用了chess1Click函数，没有点击)
    * 1代表起点，2代表终点
    * 实现效果为棋子移动
    * */
    machineMove(dom1,dom2){
      let fileName1 = dom1.attr('src').slice(11, 12)
      let imgIndex1 = parseInt(dom1.attr('id').slice(3)) + 1
      let chessInfo1 = {//棋子的一些信息
        displayChess: this.displayChessTemp,
        fileName: fileName1,
        imgIndex: imgIndex1,
        sqSelected: this.imgIndexToSq(imgIndex1)
      }
      this.chess1Click(chessInfo1)//相当于鼠标点击了pos0车的位置

      setTimeout(() => {
        let fileName2 = dom2.attr('src').slice(11, 12)
        let imgIndex2 = parseInt(dom2.attr('id').slice(3)) + 1
        let chessInfo2 = {//棋子的一些信息
          displayChess: this.displayChessTemp,
          fileName: fileName2,
          imgIndex: imgIndex2,
          sqSelected: this.imgIndexToSq(imgIndex2)
        }
        this.chess1Click(chessInfo2)
      },500)

    },
    /*根据输入的棋子dom对象，返回该棋子所有可能的下一步走法（array型，但数组元素为dom对象）*/
    machine_getSteps(dom) {
      let step = []
      let fileName = dom.attr('src').slice(11, 12)
      let sqSrc = this.imgIndexToSq(parseInt(dom.attr('id').slice(3)) + 1)//获取一维坐标
      switch (fileName) {
        case 'k': {
          let KING_DELTA= [-16, -1, 1, 16];
          for (let i in KING_DELTA) {// 将的4个方向
            let sqDst = sqSrc + KING_DELTA[i]; // 得到一个可能的终点位置
            if(!this.IN_BOARD(sqDst)) {//终点处不在棋盘内
              continue
            }
            if(this.displayChessTemp[sqDst] < 16 && this.IN_FORT(sqDst)) {
              //终点处没有棋子没有本方（黑方）棋子，且终点在九宫格内
              let row = this.RANK_Y(sqDst)
              let imgIndex = sqDst - 7*row -29 - 1
              let domTemp =  $('#pos' + imgIndex)
              step.push(domTemp)
            }
          }
          break
        }
        case 'a': {
          let ADVISOR_DELTA = [-15, -17, 17, 15];
          for(let i in ADVISOR_DELTA) {
            let sqDst = sqSrc + ADVISOR_DELTA[i]; // 得到一个可能的终点位置
            if(!this.IN_BOARD(sqDst) ) {//终点处不在棋盘内，或不在九宫格内
              continue
            }
            if(this.displayChessTemp[sqDst] < 16 && this.IN_FORT(sqDst)) {
              //终点处没有棋子没有本方（黑方）棋子,且终点在九宫格内
              let row = this.RANK_Y(sqDst)
              let imgIndex = sqDst - 7*row -29 - 1
              let domTemp =  $('#pos' + imgIndex)
              step.push(domTemp)
            }
          }
          break
        }
        case 'b': {
          let BISHOP_DELTA = [-34, -30, 30, 34];
          for(let i in BISHOP_DELTA) {
            let sqDst = sqSrc + BISHOP_DELTA[i]; // 得到一个可能的终点位置
            if(!this.IN_BOARD(sqDst) || !this.SAME_HALF(sqSrc,sqDst)
                || this.displayChessTemp[(sqSrc+sqDst)/2] > 1) {
              //终点处不在棋盘内,或过河,或象眼无棋子
              continue
            }
            if(this.displayChessTemp[sqDst] < 16) {
              //终点处没有棋子没有本方（黑方）棋子
              let row = this.RANK_Y(sqDst)
              let imgIndex = sqDst - 7*row -29 - 1
              let domTemp =  $('#pos' + imgIndex)
              step.push(domTemp)
            }
          }
          break
        }
        case 'n': {
          let KING_DELTA= [-16, -1, 1, 16];
          let KNIGHT_DELTA = [[-33, -31], [-18, 14], [-14, 18], [31, 33]];
          for(let i in KNIGHT_DELTA) {// 马腿的4个方向
            let sqDst = sqSrc + KING_DELTA[i]; // 得到一个马腿的位置
            if(this.displayChessTemp[sqDst] > 1) {
              //马脚处有棋子
              continue
            }
            for (let j = 0; j < 2; j ++) { // 1个马腿对应2个马的方向
              sqDst = sqSrc + KNIGHT_DELTA[i][j]; // 得到一个马的可能的终点位置
              if (!this.IN_BOARD(sqDst)) {
                continue;
              }
              if(this.displayChessTemp[sqDst] < 16) {
                //终点处没有棋子没有本方（黑方）棋子
                let row = this.RANK_Y(sqDst)
                let imgIndex = sqDst - 7*row -29 - 1
                let domTemp =  $('#pos' + imgIndex)
                step.push(domTemp)
              }
            }
          }
          break
        }
        case 'r': {
          let KING_DELTA= [-16, -1, 1, 16];
          for (let i = 0; i < 4; i ++) {
            let delta = KING_DELTA[i];    // 得到一个方向
            let sqDst = sqSrc + delta;    // 从起点sqSrc开始，沿着方向delta走一步
            while (this.IN_BOARD(sqDst)) {
              //在棋盘上
              if(this.displayChessTemp[sqDst] < 16) {
                //终点处没有棋子没有本方（黑方）棋子,或有红方棋子
                let row = this.RANK_Y(sqDst)
                let imgIndex = sqDst - 7*row -29 - 1
                let domTemp =  $('#pos' + imgIndex)
                step.push(domTemp)
                if(this.displayChessTemp[sqDst] >= 8) {
                  //终点处有对方（红方）棋子
                  break
                }
              }
              else break
              sqDst += delta;     // 沿着方向delta向前走一步
            }
          }
          break
        }
        case 'c': {
          let KING_DELTA= [-16, -1, 1, 16];
          for (let i = 0; i < 4; i ++) {
            let delta = KING_DELTA[i];    // 得到一个方向
            let sqDst = sqSrc + delta;    // 从起点sqSrc开始，沿着方向delta走一步
            while (this.IN_BOARD(sqDst)) {
              if(this.displayChessTemp[sqDst] === 1) {
                //终点处没有棋子
                let row = this.RANK_Y(sqDst)
                let imgIndex = sqDst - 7*row -29 - 1
                let domTemp =  $('#pos' + imgIndex)
                step.push(domTemp)
              }
              else {            // 终点存在棋子，炮需要翻山
                break;
              }
              sqDst += delta;     // 沿着方向delta向前走一步
            }
            sqDst += delta;       // 沿着方向delta向前走一步
            while (this.IN_BOARD(sqDst)) { // 如果sqDst仍位于棋盘，那么此时炮已经翻山了
              if(this.displayChessTemp[sqDst] >= 8 && this.displayChessTemp[sqDst] < 16) {
                //终点处是红方棋子
                let row = this.RANK_Y(sqDst)
                let imgIndex = sqDst - 7*row - 29 - 1
                let domTemp = $('#pos' + imgIndex)
                step.push(domTemp)
                break
              }
              sqDst += delta;
            }
          }
          break
        }
        case 'p': {
          let PAWN_delta = [16,1,-1] //兵一开始只能向下走,过河后可向左/右走
          let sqDst = sqSrc + PAWN_delta[0]
          if(this.displayChessTemp[sqDst] < 16) {//终点处不是黑方棋子
            let row = this.RANK_Y(sqDst)
            let imgIndex = sqDst - 7*row -29 - 1
            let domTemp =  $('#pos' + imgIndex)
            step.push(domTemp)
          }
          if(sqSrc >= 131) {//若兵过河了(此处的131是经过计算得到的过河临界值
            for (let i = 0; i < 2; i++) {
              sqDst = sqSrc + PAWN_delta[i+1]
              if(this.displayChessTemp[sqDst] < 16) {
                let row = this.RANK_Y(sqDst)
                let imgIndex = sqDst - 7*row -29 - 1
                let domTemp =  $('#pos' + imgIndex)
                step.push(domTemp)
              }
            }
          }
          break
        }

        case 'K': {
          let KING_DELTA= [-16, -1, 1, 16];
          for (let i in KING_DELTA) {// 将的4个方向
            let sqDst = sqSrc + KING_DELTA[i]; // 得到一个可能的终点位置
            if(!this.IN_BOARD(sqDst)) {//终点处不在棋盘内
              continue
            }
            if(!(this.displayChessTemp[sqDst] & 8) && this.IN_FORT(sqDst)) {
              //终点处没有棋子没有本方（红方）棋子，且终点在九宫格内
              let row = this.RANK_Y(sqDst)
              let imgIndex = sqDst - 7*row -29 - 1
              let domTemp =  $('#pos' + imgIndex)
              step.push(domTemp)
            }
          }
          break
        }
        case 'A': {
          let ADVISOR_DELTA = [-15, -17, 17, 15];
          for(let i in ADVISOR_DELTA) {
            let sqDst = sqSrc + ADVISOR_DELTA[i]; // 得到一个可能的终点位置
            if(!this.IN_BOARD(sqDst) ) {//终点处不在棋盘内，或不在九宫格内
              continue
            }
            if(!(this.displayChessTemp[sqDst] & 8) && this.IN_FORT(sqDst)) {
              //终点处没有棋子没有本方（红方）棋子,且终点在九宫格内
              let row = this.RANK_Y(sqDst)
              let imgIndex = sqDst - 7*row -29 - 1
              let domTemp =  $('#pos' + imgIndex)
              step.push(domTemp)
            }
          }
          break
        }
        case 'B': {
          let BISHOP_DELTA = [-34, -30, 30, 34];
          for(let i in BISHOP_DELTA) {
            let sqDst = sqSrc + BISHOP_DELTA[i]; // 得到一个可能的终点位置
            if(!this.IN_BOARD(sqDst) || !this.SAME_HALF(sqSrc,sqDst)
                || this.displayChessTemp[(sqSrc+sqDst)/2] > 1) {
              //终点处不在棋盘内,或过河,或象眼无棋子
              continue
            }
            if(!(this.displayChessTemp[sqDst] & 8)) {
              //终点处没有棋子没有本方（红方）棋子
              let row = this.RANK_Y(sqDst)
              let imgIndex = sqDst - 7*row -29 - 1
              let domTemp =  $('#pos' + imgIndex)
              step.push(domTemp)
            }
          }
          break
        }
        case 'N': {
          let KING_DELTA= [-16, -1, 1, 16];
          let KNIGHT_DELTA = [[-33, -31], [-18, 14], [-14, 18], [31, 33]];
          for(let i in KNIGHT_DELTA) {// 马腿的4个方向
            let sqDst = sqSrc + KING_DELTA[i]; // 得到一个马腿的位置
            if(this.displayChessTemp[sqDst] > 1) {
              //马脚处有棋子
              continue
            }
            for (let j = 0; j < 2; j ++) { // 1个马腿对应2个马的方向
              sqDst = sqSrc + KNIGHT_DELTA[i][j]; // 得到一个马的可能的终点位置
              if (!this.IN_BOARD(sqDst)) {
                continue;
              }
              if(!(this.displayChessTemp[sqDst] & 8)) {
                //终点处没有棋子没有本方（红方）棋子
                let row = this.RANK_Y(sqDst)
                let imgIndex = sqDst - 7*row -29 - 1
                let domTemp =  $('#pos' + imgIndex)
                step.push(domTemp)
              }
            }
          }
          break
        }
        case 'R': {
          let KING_DELTA= [-16, -1, 1, 16];
          for (let i = 0; i < 4; i ++) {
            let delta = KING_DELTA[i];    // 得到一个方向
            let sqDst = sqSrc + delta;    // 从起点sqSrc开始，沿着方向delta走一步
            while (this.IN_BOARD(sqDst)) {
              //在棋盘上
              if(!(this.displayChessTemp[sqDst] & 8)) {
                //终点处没有棋子没有本方（红方）棋子,或有红方棋子
                let row = this.RANK_Y(sqDst)
                let imgIndex = sqDst - 7*row -29 - 1
                let domTemp =  $('#pos' + imgIndex)
                step.push(domTemp)
                if(this.displayChessTemp[sqDst] & 16) {
                  //终点处有对方（黑方）棋子
                  break
                }
              }
              else break
              sqDst += delta;     // 沿着方向delta向前走一步
            }
          }
          break
        }
        case 'C': {
          let KING_DELTA= [-16, -1, 1, 16];
          for (let i = 0; i < 4; i ++) {
            let delta = KING_DELTA[i];    // 得到一个方向
            let sqDst = sqSrc + delta;    // 从起点sqSrc开始，沿着方向delta走一步
            while (this.IN_BOARD(sqDst)) {
              if(this.displayChessTemp[sqDst] === 1) {
                //终点处没有棋子
                let row = this.RANK_Y(sqDst)
                let imgIndex = sqDst - 7*row -29 - 1
                let domTemp =  $('#pos' + imgIndex)
                step.push(domTemp)
              }
              else {            // 终点存在棋子，炮需要翻山
                break;
              }
              sqDst += delta;     // 沿着方向delta向前走一步
            }
            sqDst += delta;       // 沿着方向delta向前走一步
            while (this.IN_BOARD(sqDst)) { // 如果sqDst仍位于棋盘，那么此时炮已经翻山了
              if(this.displayChessTemp[sqDst] & 16) {
                //终点处是黑方棋子
                let row = this.RANK_Y(sqDst)
                let imgIndex = sqDst - 7*row - 29 - 1
                let domTemp = $('#pos' + imgIndex)
                step.push(domTemp)
                break
              }
              sqDst += delta;
            }
          }
          break
        }
        case 'P': {
          let PAWN_delta = [-16,1,-1] //兵一开始只能向上走,过河后可向左/右走
          let sqDst = sqSrc + PAWN_delta[0]
          if(!(this.displayChessTemp[sqDst] & 8)) {//终点处不是红方棋子,则走法合法
            let row = this.RANK_Y(sqDst)
            let imgIndex = sqDst - 7*row -29 - 1
            let domTemp =  $('#pos' + imgIndex)
            step.push(domTemp)
          }
          if(sqSrc < 131) {//若兵过河了(此处的131是经过计算得到的过河临界值
            for (let i = 0; i < 2; i++) {
              sqDst = sqSrc + PAWN_delta[i+1]
              if(!(this.displayChessTemp[sqDst] & 8)) {
                let row = this.RANK_Y(sqDst)
                let imgIndex = sqDst - 7*row -29 - 1
                let domTemp =  $('#pos' + imgIndex)
                step.push(domTemp)
              }
            }
          }
          break
        }
        default: step.push(null)
      }
      return step
    },
    /*根据局面评估值，返回下一步要走的棋子*/
    machine_getPcToBeMoved() {
      let blackAllPc = [], whiteAllPc = []
      let displayChess_evaluate = this.displayChessTemp.map(item => {return item})
      //该循环得到所有可以选择走的棋子，的一维坐标
      for(let sqSrc in this.displayChessTemp) {
        if(this.displayChessTemp[sqSrc] & 16) {
          blackAllPc.push(sqSrc)
        }
        else if(this.displayChessTemp[sqSrc] & 8) whiteAllPc.push(sqSrc)
      }
      console.log(blackAllPc);
      /*该循环可得到红方棋子下一步的起点选择哪个*/
      let val2 = 0, maxVal = 0, maxVal2_sqSrc_w, DstDom
      for(let k in whiteAllPc) {
        let sqSrc_w = whiteAllPc[k]//某个红方棋子的起点一维坐标
        // console.log(sqSrc2);
        /*针对该红棋红方得到最有利于它的走法*/
        DstDom = this.machine_getExactStep(this.sqToDom(sqSrc_w))
        if(DstDom === undefined) break //如果遍历到的红方棋子一种走法都没有，就跳过
        // console.log(DstDom);
        /*该红方棋子最佳走法的终点一维坐标*/
        let sqDst_w = this.domToSq(DstDom)
        // console.log(sqDst2);
        let tempNum2 = displayChess_evaluate[sqDst_w]//保存一下落子前终点处的棋子Num
        displayChess_evaluate[sqDst_w] = displayChess_evaluate[sqSrc_w] //假设落子了
        displayChess_evaluate[sqSrc_w] = 1//原来的起点变为空
        val2 = this.machine_evaluate(displayChess_evaluate)//试求评估值2
        /*站在红方的角度，我肯定力求val2最大*/
        if(val2 > maxVal) {
          maxVal = val2 //更新最大评估值
          maxVal2_sqSrc_w = sqSrc_w//更新评估值最大时选择的棋子
        }
        else {
          // minMaxVal2_sqSrc = blackAllPc[i]
          console.log('error');
        }
        displayChess_evaluate[sqSrc_w] = displayChess_evaluate[sqDst_w]//恢复中转棋盘
        displayChess_evaluate[sqDst_w] = tempNum2//恢复中转棋盘
        // break
      }
      console.log('红方最好的起点:');
      console.log(this.sqToDom(maxVal2_sqSrc_w));
      console.log('红方最好的终点:');
      console.log(this.machine_getExactStep(this.sqToDom(maxVal2_sqSrc_w)));
      console.log('假设该红方棋子落子后的评估值：' + maxVal);

      let sqDst_b,sqSrc_b//黑方最终决定的起点、终点
      let val1 = 0,minVal = maxVal
      // let minMaxVal2_sqSrc = blackAllPc[0]//使maxVal2最小时的棋子的起点一维坐标(黑方执棋)
      for(let i in blackAllPc) {//遍历所有黑棋
        console.log(i);
        if(i == 3) break //先遍历前4颗棋子
        let sqSrc = blackAllPc[i]//某个黑方棋子的起点一维坐标
        console.log('一黑方棋子的起点:');
        console.log(this.sqToDom(sqSrc));
        console.log('一黑方棋子的终点：');
        /*走法数组，元素为对象类型*/
        let stepArray = this.machine_getSteps(this.sqToDom(sqSrc)).map(e => {return e})
        for(let j in stepArray) {//遍历某黑棋的所有走法
          /*该黑方棋子其中一个走法的终点，的一维坐标*/
          let sqDst = this.domToSq(stepArray[j])
          console.log(this.sqToDom(sqDst));

          let sqDst_w = this.domToSq(this.machine_getExactStep(this.sqToDom(maxVal2_sqSrc_w)))//重新求一下之前确定的红方棋子的终点
          console.log('重新求了红棋的终点：');
          console.log(this.sqToDom(sqDst_w));
          let tempNum3 = displayChess_evaluate[maxVal2_sqSrc_w]//保存红棋落子前的棋子Num
          displayChess_evaluate[sqDst_w] = displayChess_evaluate[maxVal2_sqSrc_w]//假设红棋落子了
          displayChess_evaluate[maxVal2_sqSrc_w] = 1//原来的起点变为空

          // console.log('可以到达①');
          let tempNum = displayChess_evaluate[sqDst] //保存一下黑方棋子落子前终点处的棋子Num
          displayChess_evaluate[sqDst] = displayChess_evaluate[sqSrc] //假设黑棋落子了
          displayChess_evaluate[sqSrc] = 1//原来的起点变为空

          // console.log('可以到达②');
          val1 = this.machine_evaluate(displayChess_evaluate)//黑、红方都假设走完后，求评估值1
          console.log('假设黑棋落子后的评估值：' + val1);
          /*站在黑方的角度，我肯定力求val1最小,maxVal2最小*/
          if(val1 <= minVal) {
            minVal = val1
            sqDst_b = sqDst
            sqSrc_b = sqSrc
            console.log('最小评估值' + minVal);
          }
          // else console.log('err');
          /*黑方走棋破坏的*/
          displayChess_evaluate[sqSrc] = displayChess_evaluate[sqDst]//恢复中转棋盘
          displayChess_evaluate[sqDst] = tempNum//恢复中转棋盘
          /*红方走棋破坏的*/
          displayChess_evaluate[maxVal2_sqSrc_w] = displayChess_evaluate[sqDst_w]
          displayChess_evaluate[sqDst_w] = tempNum3
          // break
        }

        // break
      }
      console.log('黑棋最终的起点:');
      console.log(this.sqToDom(sqSrc_b));
      console.log('黑棋最终的终点:');
      console.log(this.sqToDom(sqDst_b));
      // return randomSrcDom
      return [this.sqToDom(sqSrc_b),this.sqToDom(sqDst_b)]
      // let randomIndex
      // let randomSrcDom//起点,终点
      // while(1) {
      //   randomIndex = Math.floor(Math.random() * blackAllPc.length)//随机数在数组中的索引值
      //   // let randomSq = blackAllPc[randomIndex]
      //   randomSrcDom = this.sqToDom(blackAllPc[randomIndex])
      //   if(this.machine_getSteps(randomSrcDom).length > 0)
      //     //当选中的棋子至少有一种走法时，才退出循环，否则一直循环直到找到一棋子其走法有至少一种
      //     break
      // }

    },
    /*根据输入的起点dom对象，返回使评估值最小的终点的dom对象*/
    machine_getExactStep(srcDom,arr) {
      console.log(arr);
      if(!arr) {
        let allWays = this.machine_getSteps(srcDom)
      }
      let allWays = this.machine_getSteps(srcDom) //该棋子的所有走法,数组元素是dom对象
      /*棋盘中转站*/
      let displayChess_evaluate = this.displayChessTemp.map((item) => {
        //用于评估分数的中转棋盘(不能直接对数组赋值，应对元素赋值)
        return item
      })
      if(!this.playerSide) {
        //如果是黑方执棋
        let maxVal = this.machine_evaluate(this.displayChessTemp)
        let randomDstIndex = Math.floor(Math.random() * allWays.length)
        let dstDom = allWays[randomDstIndex]//初始就赋一个随机值
        // console.log(srcDom);
        for(let i in allWays) {
          let srcNum = displayChess_evaluate[this.domToSq(srcDom)]//起点棋子代表的Num值
          let sqDst = this.domToSq(allWays[i])//终点棋子的一维坐标
          let tempNum = displayChess_evaluate[sqDst]//保存一下落棋前终点处的棋子Num
          /*假设终点落下该棋，即终点处的Num值改变*/
          displayChess_evaluate[sqDst] = srcNum
          let currentVal = this.machine_evaluate(displayChess_evaluate)
          // console.log('评估值：'+ currentVal);
          if(this.machine_evaluate(displayChess_evaluate) > maxVal) {//如果评估值比原来大
            maxVal = this.machine_evaluate(displayChess_evaluate)//更新最大值
            dstDom = this.sqToDom(sqDst)//更新终点
          }
          // else console.log('此次循环没有大的');
          displayChess_evaluate[this.domToSq(srcDom)] = srcNum//恢复中转棋盘
          displayChess_evaluate[sqDst] = tempNum//恢复中转棋盘
        }
        return dstDom
      }
      else {
        let minVal = this.machine_evaluate(this.displayChessTemp)
        let randomDstIndex = Math.floor(Math.random() * allWays.length)
        let dstDom = allWays[randomDstIndex]//初始就赋一个随机值
        // console.log(srcDom);
        for(let i in allWays) {
          let srcNum = displayChess_evaluate[this.domToSq(srcDom)]//起点棋子代表的Num值
          let sqDst = this.domToSq(allWays[i])//终点棋子的一维坐标
          let tempNum = displayChess_evaluate[sqDst]//保存一下落棋前终点处的棋子Num
          /*假设终点落下该棋，即终点处的Num值改变*/
          displayChess_evaluate[sqDst] = srcNum
          let currentVal = this.machine_evaluate(displayChess_evaluate)
          if(this.machine_evaluate(displayChess_evaluate) < minVal) {//如果评估值比原来小
            // console.log('------------');
            minVal = this.machine_evaluate(displayChess_evaluate)//更新最小值
            dstDom = this.sqToDom(sqDst)//更新终点
          }
          displayChess_evaluate[this.domToSq(srcDom)] = srcNum//恢复中转棋盘
          displayChess_evaluate[sqDst] = tempNum//恢复中转棋盘
        }
        return dstDom
      }
      // console.log(dstDom);
      // console.log(allWays);
      // console.log('当前评估值:' + this.machine_evaluate(this.displayChessTemp));
    },
    /*根据输入的整个棋盘数组，返回红方分数-黑方分数的值，记作《评估值》*/
    machine_evaluate(array) {
      let wVal = this.machine_getVal(array,true), bVal = this.machine_getVal(array,false)
      return wVal - bVal
    },
    /*根据输入的整个棋盘数组，返回*/
    machine_getVal(array,isWhite) {
      let val = 0
      for(let i in array) {
        if(isWhite) {//若是红方
          switch (array[i]) {
            case 8: val += 1000;break
            case 9: val += 20;break
            case 10: val += 20;break
            case 11: val += 45;break
            case 12: val += 90;break
            case 13: val += 40;break
            case 14: val += 10;break
            default: val += 0
          }
        }
        else {
          switch (array[i]) {
            case 16: val += 1000;break
            case 17: val += 20;break
            case 18: val += 20;break
            case 19: val += 45;break
            case 20: val += 90;break
            case 21: val += 40;break
            case 22: val += 10;break
            default: val += 0
          }
        }
      }
      return val
    },
    /*该函数会使局面重新绘制，返回1,2,3,0
    * 1：表示触发了兵线刷新
    * 2：替父从军
    * 3：草木皆兵*/
    machine_passiveSkills() {
      /*兵线刷新*/
      return new Promise((resolve,reject) => {
        /*兵线刷新*/
        let advisorSum = 0, isEaten = false
        let currentVal = this.machine_evaluate(this.displayChessTemp), isSkill3 = false
        // console.log(this.machine_getVal(this.displayChessTemp, false));
        for(let i in this.displayChessTemp) {
          if(this.displayChessTemp[i] === 22) {
            advisorSum ++
          }
          /*替父从军*/
          if(this.displayChessTemp[i] & 8 && this.displayChess_Old[i] & 16) {
            //若某处上一步为黑方棋子，下一步为红方棋子，说明黑方棋子被吃掉
            if(Math.floor(Math.random() + 0.3)) { //附加条件：大概30%几率触发替父从军
              isEaten = true
              this.displayChessTemp[i] = this.displayChess_Old[i]
            }
          }
          /*草木皆兵*/
          if(currentVal > 180 || this.machine_getVal(this.displayChessTemp,false) < 1220) {
            //黑方总价值＜1220，大约损失了两车一炮
            isSkill3 = true
            if(this.displayChessTemp[i] === 1) {
              this.displayChessTemp[i] = 22
            }
          }
        }
        if(advisorSum < 3) {
          for(let i = 0,j = 0;i <5;i++,j+=2) {
            let domSq = this.domToSq($(`#pos${27 + j}`))
            // console.log($(`#pos${27 + j}`));
            this.displayChessTemp[domSq] = 22
          }
          document.querySelector('#skill1').play()
          setTimeout(() => {
            this.drawWithSq()
            // let chessInfo = null
            this.chess1Click(null)
            resolve(1)
          },3000)
        }
        /*替父从军*/
        else if(isEaten) {
          document.querySelector('#skill2').play()
          setTimeout(() => {
            this.drawWithSq()
            // let chessInfo = null
            this.chess1Click(null)
            resolve(2)
          },3000)
        }
        /*草木皆兵*/
        else if(isSkill3) {
          document.querySelector('#skill3').play()
          setTimeout(() => {
            this.drawWithSq()
            // let chessInfo = null
            this.chess1Click(null)
            resolve(3)
          },3000)
        }
        else resolve(0)
      })
    },
    /*根据输入的sq（一维坐标），返回棋盘中该棋子的dom对象*/
    sqToDom(sq) {
      let row = this.RANK_Y(sq)
      let imgIndex = sq - 7*row -29 - 1
      // let domTemp =  $('#pos' + imgIndex)
      return $('#pos' + imgIndex)
    },
    /*根据输入的dom对象，返回sq（一维坐标）*/
    domToSq(dom) {
      let imgIndex = parseInt(dom.attr('id').slice(3)) + 1
      return this.imgIndexToSq(imgIndex)
    },
    sureInput() {
      let newFEN = this.userInput
      this.drawWithFEN(newFEN)
    },
    test2() {
      let newFEN = '1n1akabnr/r8/9/9/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR'
      this.drawWithFEN(newFEN)
    },
    btnClick2() {
      document.querySelectorAll('.audioBx li > audio').forEach((e) => {
        e.play()
      })
    },
    chess1Click(info) {
      // console.log(info);
      this.$emit('show', info)
    }
  },
}
</script>

<style scoped lang="scss">
.input-box {
  background-color: #1a6aa6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 0 0 0 15px;
  overflow: hidden;
  height: 5ch;


  i::before {
    font-size: 1.5ch;
    color: white;
  }

  input {
    border: none;
    box-sizing: border-box;
    background: none;
    color: white;
    outline: none;
    margin-left: 5px;
    padding: 5px;
    width: 100%;
  }

  input::placeholder {
    color: white;
  }

  div {
    background-color: #e0e1e2;
    cursor: pointer;
    color: #5a5a5a;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    width: 20%;
    font-weight: 600;
    justify-content: center;
  }

  div:hover {
    background-color: #cacbcd;
  }
}
.f1 {
  margin: 0 5px;
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
.chessBoard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 65%;
  padding: 0.2vw;
  border: 2px solid black;
  box-sizing: border-box;
  position: relative;
  margin: auto;
  .myFontBox {
    font-family: 'LiShu',serif;
    position: absolute;
    top: 46%;
    left: 50%;
    display: flex;
    justify-content: space-around;
    width: 100%;
    transform: translateX(-50%);
    font-size: 3vw;
    div {
    }
  }
  .imgBox {
    width: 11.1%;
    box-sizing: border-box;
    padding: 0.2vw;
    //border: 1px solid black;
    background: url("../public/img/chess/bc.png");
    background-size: 100%;

    img {
      width: 100%;
      cursor: pointer;

    }

    :hover {
      transform: scale(1.1);
    }
  }

  :nth-child(n+37):nth-child(-n+54) {
    //border: none;
    //background: none;
    //background-image: url("../public/img/chess/bc-down.png");
    background-size: 100%;
    background-repeat: no-repeat;
    //margin: 10px 0;
    //padding: 0;
    //display: flex;
    //justify-content: center;
    //align-items: center;
    img {
      //cursor: default;
      //width: 80%;

    }
  }
  :nth-child(n+37):nth-child(-n+45) {
    margin: -10px 0 10px 0;
    background-image: url('../public/img/chess/bc-up.png');
    background-repeat: no-repeat;
    background-size: 100%;
  }
  :nth-child(n+46):nth-child(-n+54) {
    background-image: url('../public/img/chess/bc-down.png');
    margin: 10px 0 -10px 0;
    background-repeat: no-repeat;
    background-size: 100%;
  }
}

@font-face {
  font-family: 'LiShu';
  //src: url('YourWebFontName.eot'); /* IE9 Compat Modes */
  //src: url('YourWebFontName.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  src: url('../public/css/LiShu/LiShu.woff') format('woff'), /* Modern Browsers */
  url('../public/css/LiShu/LiShu.ttf')  format('truetype'), /* Safari, Android, iOS */
  url("../public/css/LiShu/LiShu.svg")  format('svg'); /* Legacy iOS */
}
</style>