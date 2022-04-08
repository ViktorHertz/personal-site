<template>
  <div>
    <div class="layout-box">
      <h2>奏乐输入请以以下图片布局为准</h2>
      <br>
      <span>如:一闪一闪亮晶晶:B1/B1/B4/B4/B5/B5/B4/B4/B4/B3/B3/B2/B2/B1

        B5/B5/B4/B4/B3/B3/B2/B5/B5/B4/B4/B3/B3/B2

        B1/B1/B4/B4/B5/B5/B4/B4/B4/B3/B3/B2/B2/B1
      </span>
      <br>
      <img :src="$withBase('/img/layout.png')" alt="示例图" />
    </div>
    <br>
    <div class="btn-box">
      <button class="f1" @click="f0">轮询测试</button>
      <button class="f1" @click="f1">100 ~ 2000Hz</button>
      <button class="f1" @click="compose">奏乐</button>
      <div class="input-box">
        <i class="iconfont reco-douyin"></i>
        <input type="text" placeholder="输入曲子，以'/'分隔" v-model="userInput">
        <div @click="inputCompo">确定</div>
      </div>
    </div>
    <ul style="display: none">
      <li v-for="(index) in keyNum" class="audio-box">
        <audio :src='$withBase(`/music/piano(${index}).mp3`)' :id="`piano${index}`"></audio>
      </li>
    </ul>
    <ul class="key-ul">
      <li class="key-box" v-for="index in keyNum">
        <button class="f1 key-button" @click="f2(index)"></button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "piano",
  data() {
    return {
      keyNum: 38,
      songStr: [],
      playIndex: [],
      userInput: ''
    }
  },
  mounted() {
  },
  methods: {
    f0() {
      /*轮询检查是否有音频损坏、缺失*/
      document.querySelectorAll('.audio-box audio').forEach((e, index) => {
        setTimeout(() => {
          e.play();
        }, index * 500)
      })
    },
    f1() {
      /*100~2000Hz（大概）依次播放*/
      document.querySelectorAll('.audio-box audio').forEach((e, index) => {
        if (index % 2 === 0) {
          setTimeout(() => {
            e.play();
          }, index * 250)
        }
      })
    },
    f2(index) {
      document.querySelector("#piano" + index).play()
      console.log('btn');
    },
    compose() {
      if (this.playIndex.length > 0) {
        let time = 1;
        for (let i in this.playIndex) {
          console.log('循环');
          console.log('此次序数为:'+this.playIndex[i]);
          let temp = this.playIndex[i].toString()
          setTimeout(() => {
            document.querySelector('#piano' + temp).play()
            time ++
          }, i * 1000)
        }
      }
      else {
        document.querySelector('#piano20').play()
        alert('请输入自定义曲子,然后点击确定')
      }

    },
    inputCompo() {
      this.songStr = []
      this.playIndex = []
      console.log(this.userInput);//userInput为类似'A1,B2,C3'的字符串
      this.userInput.split("/").forEach(e => {
        this.songStr.push(e) //
      });

      console.log('songStr:');
      console.log(this.songStr);//此处songStr应为数组类型

      for (let i in this.songStr) {
        let index = this.songStr[i].slice(1) //用于计算audio实际序数
        let ch = this.songStr[i].slice(0, 1) //ch用以判断在第几行

        if(index > 13) {
          alert('谱曲字符串不合法')
          return
        }

        if (ch === 'A') {
          // console.log('第一行');
          this.playIndex.push(index)

        } else if (ch === 'B') {
          // console.log('第二行');
          this.playIndex.push(parseInt(index) + 13)
        } else if (ch === 'C') {
          // console.log('第三行');
          this.playIndex.push(parseInt(index) + 26)
        } else
          alert('谱曲字符串不合法')
      }
      console.log('audio实际序数:\n');
      console.log(this.playIndex);
    },

  }
}
</script>

<style scoped lang="scss">
.btn-box {
  display: flex;
  align-items: center;

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

.key-ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;

  .key-box {
    width: 7%;
    margin: 0 2px;

    .key-button {
      width: 100%;
      height: 100px;
      border-radius: 0;
      padding: 0;
      background-color: #e0e1e2;
      border: none;
      cursor: pointer;
    }

    .key-button:hover {
      background-color: #cacbcd;
    }


  }
}
</style>