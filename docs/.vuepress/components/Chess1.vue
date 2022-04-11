<template>
  <div>
    <div class="chessBoard">

      <div class="imgBox myImgBox" v-for="(item,index) in 90">
        <img :src="$withBase(`/img/chess/K_.png`)" :id="`pos${index}`" alt="一个棋子" :key="index">
      </div>
      <div class="myFontBox">
        <div class="css2ebd673af7243b7">楚河</div>
        <div class="css2ebd673af7243b7">汉界</div>
      </div>
    </div>

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
    }
  },
  data() {
    return {
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
      // fileName: '',//图片文件名的首字母
      sqSelected: 0,//鼠标是否选中一棋子
      currentChess: ''//当前选中的棋子，的首字母
    }
  },
  computed: {
    imgDomArr() {
      return document.querySelectorAll('div.imgBox img')
    }
  },
  watch: {
    displayChess: {
      handler(val, oldVal) {
        // console.log('监听到有变化,新旧value：' + oldVal + '\n' + newVal);
        // console.log(newVal);
        this.displayChessTemp = val
        // console.log(val);
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
          } else continue
        }
        // console.log(this.imgDomArr[0].src);
      },
      // deep: true
    }
  },
  mounted() {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'http://cdn.repository.webfont.com/webfonts/nomal/148407/46489/625407aaf629d81300ac19b3.css';
    document.body.appendChild(css);

    this.initBoard()
    /*每个img绑定一个点击事件*/
    document.querySelectorAll('div.imgBox img').forEach((e, index) => {
      e.addEventListener('mousedown', (e, index) => {

        let fileName = e.target.src.slice(32, 33)
        let alertStr = this.ImgNameToChessName(fileName)

        let imgIndex = parseInt(e.target.id.slice(3)) + 1
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
    IN_BOARD(sq) {
      return this.IN_BOARD_[sq] !== 0;
    },
    COORD_XY(x, y) {// 将二维矩阵坐标转换为一维矩阵坐标 (x,y)含(0,0)
      return x + (y << 4);
    },
    RANK_Y(sq) {// 根据一维矩阵，获取二维矩阵行数 行数从0开始
      return sq >> 4;
    },
    FILE_X(sq) {// 根据一维矩阵，获取二维矩阵列数
      return sq & 15;
    },
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
        if (ch == '/') {//换行
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
          return 'err'
      }
    },
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
    /*将第几个图片标签转换为sq*/
    imgIndexToSq(imgIndex) {
      let row = Math.floor((imgIndex - 1) / 9) + 3
      return imgIndex + 30 + 7 * row - 1
      // console.log('sq:' + sq);
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
      this.test2()
    },
    chess1Click(info) {
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
  .myFontBox {
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
</style>