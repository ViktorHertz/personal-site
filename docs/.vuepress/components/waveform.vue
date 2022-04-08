<template>
  <div>
    <div class="my-tip">通道A、B的输入应尽量等长，否则以长度小的通道为准</div>
    <div class="my-tip">非运算只取A通道</div>
    <div class="towInputBox">
      <div class="input-box">
        <i class="iconfont reco-tag"></i>
        <strong>A</strong>
        <input type="text" placeholder="输入变量A的值,如0011" v-model="A">
      </div>
      <div class="input-box" style="padding-right: 0">
        <i class="iconfont reco-tag"></i>
        <strong>B</strong>
        <input type="text" placeholder="输入变量B的值,如0101" v-model="B">
        <div @click="btnClick">draw</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "waveform",
  data() {
    return {
      demoA: [0, 0, 1, 1, 1, 1, 1],
      demoB: [0, 1, 0, 1, 1, 1, 1],
      demoF: [0, 0, 0, 1, 1, 1, 1],
      demoTime: ['t0', 't1', 't2', 't3', 't4', 't5', 't6'],
      time: [],
      A: '',
      B: '',
      /*
      * F0: 与
      * F1: 或
      * F2: 非
      * F3: 异或
      * F4: 同或
      * */
      F0: [],
      F1: [],
      F2: [],
      F3: [],
      F4: [],
    }
  },
  mounted() {
    this.drawLine(this.demoTime, this.demoA, this.demoB, this.demoF, this.demoF, this.demoF, this.demoF, this.demoF)
  },
  methods: {
    drawLine(time, A, B, F0, F1, F2, F3, F4) {
      let myChart = echarts.init(document.getElementById('my-chart-box'));
      window.onresize = function () {
        myChart.resize();
      };
      let option = {
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        legend: {
          data: ['A', 'B', 'F0:与','F1:或','F2:非','F3:异或','F4:同或']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show:true,
          feature: {
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          data: time
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'A',
            type: 'line',
            step: 'end',
            data: A,
            label: {
              show: true,
              position: 'bottom',
              textStyle: {
                fontSize: 20
              }
            }
          },
          {
            name: 'B',
            type: 'line',
            step: 'end',
            data: B,
            label: {
              show: true,
              position: 'bottom',
              textStyle: {
                fontSize: 20
              }
            }
          },
          {
            name: 'F0:与',
            type: 'line',
            step: 'end',
            data: F0,
            label: {
              show: true,
              position: 'bottom',
              textStyle: {
                fontSize: 20
              }
            }
          },
          {
            name: 'F1:或',
            type: 'line',
            step: 'end',
            data: F1,
            label: {
              show: true,
              position: 'bottom',
              textStyle: {
                fontSize: 20
              }
            }
          },
          {
            name: 'F2:非',
            type: 'line',
            step: 'end',
            data: F2,
            label: {
              show: true,
              position: 'bottom',
              textStyle: {
                fontSize: 20
              }
            }
          },
          {
            name: 'F3:异或',
            type: 'line',
            step: 'end',
            data: F3,
            label: {
              show: true,
              position: 'bottom',
              textStyle: {
                fontSize: 20
              }
            }
          },
          {
            name: 'F4:同或',
            type: 'line',
            step: 'end',
            data: F4,
            label: {
              show: true,
              position: 'bottom',
              textStyle: {
                fontSize: 20
              }
            }
          },
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    trans(channel) {
      /*依次将用户输入的A、B按位做逻辑运算填入数组
      /*`this.${channel}`会解析为'this.A'！！不是this.A，有点难受*/
      if (channel === 'A') {
        for (let i in this.A) {
          this.time.push(`t${i}`)
          let item0 = this.A[i] & this.B[i] //与
          this.F0.push(this.compareWithZero(item0))

          let item1 = this.A[i] | this.B[i] //或
          this.F1.push(this.compareWithZero(item1))

          let item2 = ~this.A[i]  //非
          this.F2.push(this.compareWithZero(item2))
          console.log(item2);
          console.log(this.F2);


          let item3 = this.A[i] ^ this.B[i] //异或
          this.F3.push(this.compareWithZero(item3))

          let item4 = ~(this.A[i] ^ this.B[i]) //同或
          this.F4.push(this.compareWithZero(item4))

        }
      } else
        for (let i in this.B) {
          this.time.push(`t${i}`)
          let item0 = this.A[i] & this.B[i] //与
          this.F0.push(this.compareWithZero(item0))

          let item1 = this.A[i] | this.B[i] //或
          this.F1.push(this.compareWithZero(item1))

          let item2 = ~this.A[i]  //非
          this.F2.push(this.compareWithZero(item2))

          let item3 = this.A[i] ^ this.B[i] //异或
          this.F3.push(this.compareWithZero(item3))

          let item4 = ~(this.A[i] ^ this.B[i]) //同或
          this.F4.push(this.compareWithZero(item4))

        }
    },
    btnClick() {
      /*清空之前的数据*/
      this.F0 = [];
      this.F1 = [];
      this.F2 = [];
      this.F3 = [];
      this.F4 = [];
      this.time = []
      /*A长度大，则按B长度作循环次数*/
      if (this.A.length > this.B.length) this.trans('B')

      else this.trans('A')

      let A = this.A.split('')
      let B = this.B.split('')
      this.drawLine(this.time, A, B, this.F0, this.F1, this.F2, this.F3, this.F4);

    },
    compareWithZero(item) {
      if(item === -2) return 0
      else if(item === -1) return 1
      else return item > 0 ? 1 : 0
    },
    test() {
      let a = '1'
      let b = '1'
      console.log('~ (a ^ b) :\n' + (~(a ^ b)));
      console.log(' (a ^ b) :\n' + ((a ^ b)));
      console.log('~ a  :\n' + (~a));
    }
  },
}
</script>

<style scoped lang="scss">
.my-tip {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 10px 0;
  box-sizing: border-box;
  font-weight: 600;
}

//.towInputBox:nth-child(1) {
//  width: 30%;
//}
//.towInputBox:nth-child(2) {
//  width: 50%;
//}
.towInputBox {
  display: flex;
  justify-content: space-around;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;

  .input-box {
    background-color: #1a6aa6;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 8px;
    padding: 0 1%;
    overflow: hidden;
    height: 5ch;
    margin: 5px 1px;
    //margin-right: 10px;
    i::before {
      font-size: 1.5ch;
      color: white;
      width: 10%;
    }

    strong {
      //margin: 0 2px;
      width: 10%;
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
      border-bottom: 1px solid white;
      flex: 1;
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
      flex-wrap: nowrap;
      align-items: center;
      padding: 5px 10px;
      width: 20%;
      font-weight: 600;
      justify-content: center;
      box-sizing: border-box;
    }

    div:hover {
      background-color: #cacbcd;
    }
  }

}

</style>