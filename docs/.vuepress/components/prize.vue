<template>
  <div class="bx">
    <div class="admin">
      <button class="lottery" @click="getAdminNumbers"><i class="iconfont reco-suggestion"></i>开奖</button>
      <div class="numbers">
        开奖号码是：<span style="font-weight: 600;font-size: 20px">{{adminNumbers.join('-')}}</span>
        <br>
        以及特殊号码：<span style="font-weight: 600;font-size: 20px">{{specialNumber}}</span>
      </div>
    </div>
    <div class="msg"><i class="iconfont reco-tongzhi"></i>{{msg}}</div>
    <div class="cheatBx">
      <button @click="showInput"
          class="cheatBtn"><i style="color: white"
          class="iconfont reco-other"></i>不响丸辣，我要作弊！</button>
      <div class="input-box">
        <i class="iconfont reco-douyin"></i>
        <input type="text" placeholder="输入你想抽到的数字,以“-”分隔"
               @keyup.enter="cheat"
               v-model="userInput">
        <div @click="cheat">确定</div>
      </div>
    </div>
    <div class="userNum"><i class="iconfont reco-suggestion"></i>现在你拥有的数字是：
      {{userNumbers.join('-')}}</div>
    <div style="padding-top: 180px">
      <LuckyGrid
          ref="myLucky"
          rows="5"
          cols="6"
          :width="prizeWidth"
          :height="prizeHeight"
          :prizes="prizes"
          :blocks="blocks"
          :default-config="defaultConfig"
          :active-style="activeStyle"
          @start="startCallback"
          @end="endCallback"
      />
    </div>
    <div class="btn-box">
      <button @click="singleClick" class="btn">
        <i class="iconfont reco-three"></i>
        单抽
      </button>
      <button @click="seriesDraw" class="btn">
        <i class="iconfont reco-up"></i>
        五连抽
      </button>
      <button @click="getMyPrize" class="btn">
        <i class="iconfont reco-search"></i>
        兑奖
      </button>
    </div>
  </div>
</template>

<script>
import VueLuckyCanvas from '@lucky-canvas/vue'
import Vue from 'vue'
Vue.use(VueLuckyCanvas)

const prizeImg = {
  src: 'https://cdn.jsdelivr.net/gh/buuing/cdn/demo/prize.png',
  width: '50%',
  top: '25%'
}
const cellImg = {
  src: 'https://cdn.jsdelivr.net/gh/buuing/cdn/demo/cell-80.png',
  width: '100%',
  height: '100%'
}
const btnImg = {
  src: '/img/btn.png',
  height: '80%',
  width: '80%',
  top: '10%'
}
const bg = {
  src: '/img/prizeBg.png',
  height: '100%',
  // width: '100%',
}
export default {
  name: "prize",
  data () {
    return {
      msg: '',
      isShowMsg: false,
      prizeWidth: '500',
      prizeHeight: '500',
      blocks: [
        { padding: '50px', background: '#869cfa', imgs: [bg] },
        { padding: '10px', background: '#e9e8fe' },
      ],
      prizes: [
        { x: 0, y: 0, imgs: [cellImg], fonts: [{text: '1', top: '35%',fontWeight: '600'}] },
        { x: 1, y: 0, imgs: [cellImg], fonts: [{text: '2', top: '35%',fontWeight: '600'}] },
        { x: 2, y: 0, imgs: [cellImg], fonts: [{text: '3', top: '35%',fontWeight: '600'}] },
        { x: 3, y: 0, imgs: [cellImg], fonts: [{text: '4', top: '35%',fontWeight: '600'}] },
        { x: 4, y: 0, imgs: [cellImg], fonts: [{text: '5', top: '35%',fontWeight: '600'}] },
        { x: 5, y: 0, imgs: [cellImg], fonts: [{text: '6', top: '35%',fontWeight: '600'}] },

        { x: 0, y: 1, imgs: [cellImg], fonts: [{text: '7', top: '35%',fontWeight: '600'}] },
        { x: 1, y: 1, imgs: [cellImg], fonts: [{text: '8', top: '35%',fontWeight: '600'}] },
        { x: 2, y: 1, imgs: [cellImg], fonts: [{text: '9', top: '35%',fontWeight: '600'}] },
        { x: 3, y: 1, imgs: [cellImg], fonts: [{text: '10', top: '35%',fontWeight: '600'}] },
        { x: 4, y: 1, imgs: [cellImg], fonts: [{text: '11', top: '35%',fontWeight: '600'}] },
        { x: 5, y: 1, imgs: [cellImg], fonts: [{text: '12', top: '35%',fontWeight: '600'}] },

        { x: 0, y: 2, imgs: [cellImg], fonts: [{text: '13', top: '35%',fontWeight: '600'}] },
        { x: 1, y: 2, imgs: [cellImg], fonts: [{text: '14', top: '35%',fontWeight: '600'}] },
        { x: 2, y: 2, imgs: [cellImg], fonts: [{text: '15', top: '35%',fontWeight: '600'}] },
        { x: 3, y: 2, imgs: [cellImg], fonts: [{text: '16', top: '35%',fontWeight: '600'}] },
        { x: 4, y: 2, imgs: [cellImg], fonts: [{text: '17', top: '35%',fontWeight: '600'}] },
        { x: 5, y: 2, imgs: [cellImg], fonts: [{text: '18', top: '35%',fontWeight: '600'}] },

        // { x: 0, y: 3, imgs: [cellImg, prizeImg] },
        { x: 1, y: 3, imgs: [cellImg], fonts: [{text: '19', top: '35%',fontWeight: '600'}] },
        { x: 2, y: 3, imgs: [cellImg], fonts: [{text: '20', top: '35%',fontWeight: '600'}] },
        { x: 3, y: 3, imgs: [cellImg], fonts: [{text: '21', top: '35%',fontWeight: '600'}] },
        { x: 4, y: 3, imgs: [cellImg], fonts: [{text: '22', top: '35%',fontWeight: '600'}] },
        // { x: 5, y: 3, imgs: [cellImg, prizeImg] },

        // { x: 0, y: 4, imgs: [cellImg, prizeImg] },
        // { x: 1, y: 4, imgs: [cellImg, prizeImg] },
        // { x: 2, y: 4, imgs: [cellImg, prizeImg] },
        // { x: 3, y: 4, imgs: [cellImg, prizeImg] },
        // { x: 4, y: 4, imgs: [cellImg, prizeImg] },
        // { x: 5, y: 4, imgs: [cellImg, prizeImg] }

      ],
      // buttons: [{
      //   x: 3, y: 4,
      //   col: 1,row:1,
      //   background: '#7f95d1',
      //   fonts: [{ text: '', top: '25%' }],
      //   imgs: [btnImg]
      // }],
      defaultConfig: {speed: 30,accelerationTime: 500,decelerationTime:1000},
      activeStyle: {
        fontColor: '#e9e8fe',
        fontSize: '26px'
      },
      userNumbers: [],
      btnClickNum: 0,
      confirmRes: false,
      adminNumbers: [],
      specialNumber: 0,
      grade: 0,
      userInput: '',
      isShowInput: false,
    }
  },
  watch: {
    userNumbers(newVal) {
      if(newVal.length >= 5) {
        this.userNumbers.forEach((item,index,arr) => {
          arr[index] ++
        })
        setTimeout(() => {
          $('.userNum').animate({opacity: '1'})
        }, 1500)
      }
      else
        setTimeout(() => {
          $('.userNum').animate({opacity: '0'})
        }, 1500)
    },
    adminNumbers(newVal) {
      // console.log(newVal);
      setTimeout(() => {
        $('.admin .numbers').animate({opacity: '1'})
      }, 500)

    }
  },
  methods: {
    // 点击抽奖按钮会触发star回调
    startCallback () {
      // 调用抽奖组件的play方法开始游戏
      this.$refs.myLucky.play()
      // 模拟调用接口异步抽奖
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        let haveSameNum = true
        let prizeIndex//奖品的索引
        let i = 0
        while (1) {
          prizeIndex = Math.floor(Math.random() * 21 + 1) //得到1~22之间的一个随机数，不保证不重复
          // console.log(prizeIndex);
          haveSameNum = this.checkHaveSame(this.userNumbers,prizeIndex)
          if(haveSameNum === false) {
            this.userNumbers.push(prizeIndex)
            break
          }
        }
        // 调用stop停止旋转并传递中奖索引
        this.$refs.myLucky.stop(prizeIndex)
      }, 1000)
    },
    // 抽奖结束会触发end回调
    endCallback (prize) {
      this.msg = '你抽到了数字：' + prize.fonts[0].text
      this.showMsg()
    },
    singleClick() {
      this.btnClickNum ++
      if(this.btnClickNum === 1) {
        if(this.userNumbers.length >= 5) {
          //用户号码数有5个，即此时是选择重开与否
          this.confirmRes = confirm('你已经抽到了5个数，确定重开吗')
          if(this.confirmRes) {
            //若用户选择了重开
            this.userNumbers = []//用户号码数'清零'
            //用户号码数提示框隐藏
            this.startCallback()
            this.confirmRes = false //恢复默认值
          }
        }
        else if(this.userNumbers.length >= 0) {
          //初始情况，直接单抽
          this.startCallback()
        }
        setTimeout(() => {
          this.btnClickNum = 0
        },2000)
      }
    },
    seriesDraw() {
      this.btnClickNum ++
      if (this.btnClickNum === 1) {
        setTimeout(() => {
          this.btnClickNum = 0
        },2000)
        if(this.userNumbers.length >= 5) {
          //当用户号码数有5个
          this.confirmRes = confirm('你已经抽到了5个数，确定重开吗')
          if (this.confirmRes) {
            //若用户选择重开
            this.userNumbers = []//用户号码数'清零'
            //用户号码数提示框隐藏
            $('.userNum').animate({
              opacity: '0'
            })
            for (let i = 0; i <= 4; i++) {
              setTimeout(() => {
                this.startCallback()
              }, i * 3000)
            }
            this.confirmRes = false//恢复默认值
          }
        }
        else if(this.userNumbers.length >= 1) {
          //已经单抽过了
          this.msg = '你已经单抽了，不能五连抽'
          this.showMsg()
        }
        else if (this.userNumbers.length >= 0) {
          //初始情况,可直接进行五连抽
          for (let i = 0; i <= 4; i++) {
            setTimeout(() => {
              this.startCallback()
            }, i * 3000)
          }
        }
      }
    },
    getAdminNumbers() {
      this.btnClickNum ++
      if(this.btnClickNum === 1) {
        //防止按键短时间内被点击使函数执行多次
        setTimeout(() => {this.btnClickNum = 0},2000)
        if(this.adminNumbers.length >= 5) {
          this.confirmRes = confirm('你已开奖，确定重新开奖？')
          if(this.confirmRes) {
            this.confirmRes = false //恢复默认值
            let num = Math.floor(Math.random() * 21 + 1)
            this.adminNumbers = []
            this.adminNumbers.push(num)
            let haveSameNum
            while (this.adminNumbers.length < 5) {
              let adminIndex = Math.floor(Math.random() * 21 + 1)
              haveSameNum = this.checkHaveSame(this.adminNumbers,adminIndex)
              if(haveSameNum === false) {
                this.adminNumbers.push(adminIndex)
              }
            }
            this.specialNumber = Math.floor(Math.random() * 21 + 1)//特殊号码数
          }
        }
        else if(this.adminNumbers.length === 0) {
          //初始情况，直接开奖
          let num = Math.floor(Math.random() * 21 + 1)
          this.adminNumbers = []
          this.adminNumbers.push(num)
          let haveSameNum
          while (this.adminNumbers.length < 5) {
            let adminIndex = Math.floor(Math.random() * 21 + 1)
            haveSameNum = this.checkHaveSame(this.adminNumbers,adminIndex)
            if(haveSameNum === false) {
              this.adminNumbers.push(adminIndex)
            }
          }
          this.specialNumber = Math.floor(Math.random() * 21 + 1)//特殊号码数
        }
      }
    },
    getMyPrize() {
      if(this.userNumbers.length >=5 && this.adminNumbers.length >=5 ) {
        let judgeSum = this.compareArray(this.userNumbers, this.adminNumbers)
        let judgeSpecial = false
        for(let i in this.userNumbers) {
          if(this.userNumbers[i] === this.specialNumber) {
            judgeSpecial = true
            break
          }
        }
        if(judgeSum < 2) this.grade = 0
        else if(judgeSum === 2) this.grade = 1//五等奖
        else if(judgeSum === 3) this.grade = 2//四等奖
        else if(judgeSum === 4) {
          if(!judgeSpecial)
            this.grade = 3 //三等奖
          else this.grade = 4 //二等奖
        }
        else if(judgeSum === 5) {
          if(!judgeSpecial) this.grade = 5//一等奖
          else this.grade = 6//特等奖
        }
        alert('获奖等级：' + this.switchGradeToStr(this.grade))
      }
    },
    compareArray(arr1, arr2) {
      /*比较两个数组，返回相同元素的个数*/
      let sum = 0
      for(let i in arr1) {
        for(let j in arr2) {
          if(arr1[i].toString() === arr2[j].toString()) {
            sum ++
          }
        }
      }
      return sum
    },
    checkHaveSame(array,compareNum) {
      for(let i in array) {
        if(array[i] === compareNum) {
          return true
        }
      }
      return false
    },
    switchGradeToStr(grade) {
      let str
      switch (grade) {
        case 0: str = '没有获奖';break
        case 1: str = '五等奖';break
        case 2: str = '四等奖';break
        case 3: str = '三等奖';break
        case 4: str = '二等奖';break
        case 5: str = '一等奖';break
        case 6: str = '特等奖';break
        default: str = '出了什么错误？'
      }
      return str
    },
    showMsg() {
      $('.msg').animate({
        opacity: '1'
      })
      this.isShowMsg = true
      setTimeout(() => {
        $('.msg').animate({
          opacity: '0'
        })
      },1500)
    },
    showInput() {
      if(!this.isShowInput) {
        $('.input-box').animate({opacity: '1',zIndex: '1'})
        this.isShowInput = true
      }
      else {
        $('.input-box').animate({opacity: '0',zIndex: '-1'})
        this.isShowInput = false
      }

    },
    cheat() {
      this.userNumbers = []
      this.userNumbers = this.userInput.split('-')
      this.userNumbers.forEach((item,index,arr) => {
        arr[index] = parseInt(item) - 1
      })
    }
  },

}

</script>

<style scoped lang="scss">
.bx {
  position: relative;
  .admin {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top: -10px;
    left: 50px;
    z-index: 2;
    > button {
      display: block;
      padding: 10px;
      background: none;
      border: 1px solid palevioletred;
      cursor: pointer;
      border-radius: 5px;
      margin-right: 5px;
      color: var(--text-color);
      > i {
        margin-right: 5px;
        color: var(--text-color);
      }
    }
    > button:hover {
      background-color: palevioletred;
      color: white;
    }
    .numbers {
      opacity: 0;
    }
  }
  .btn-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    width: 300px;
    .btn {
      display: block;
      padding: 10px;
      background: none;
      border: 1px solid palevioletred;
      cursor: pointer;
      border-radius: 5px;
      color: var(--text-color);
      i {
        color: var(--text-color);
      }
    }
    .btn:hover {
      background-color: palevioletred;
      color: white;
    }
  }
  .cheatBx {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 100px;
    .cheatBtn {
      border: none;
      box-sizing: border-box;
      padding: 13px 10px;
      color: white;
      background-color: #1a6aa6;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .input-box {
      opacity: 0;
      z-index: -1;
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
      }

      div:hover {
        background-color: #cacbcd;
      }
    }
  }
}
  .msg, .userNum {
    position: absolute;
    top: 45px;
    left: 50px;
    z-index: 2;
    opacity: 0;
    /*display: none;*/
    font-size: 20px;
    font-weight: 600;
    color: grey;
  }
  .userNum {
    /*opacity: 1;*/
    top: -45px;
  }
  .msg i, .userNum i {
    margin-right: 5px;
  }

</style>