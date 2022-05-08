<template>
  <div>
    <div class="typing-root">
      <!-- 文字容器，统一由h1控制 -->
      <!-- 使用span显示文字, data-text为Json格式的数组 -->
      <span id="text"
      ></span>
      <!-- 闪烁的光标 -->
      <span class="mark"></span>
    </div>
<!--  箭头渐隐  -->
    <div class="my-box"></div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  data() {
    return {
      welcomeStr: [
        '如果有来生，要做一棵树',
        '站成永恒，没有悲欢的姿势',
        '一半在尘土里安详',
        '一半在风里飞扬',
        '一半洒落荫凉',
        '一半沐浴阳光',
        '非常沉默、非常骄傲',
        '从不依靠、从不寻找',
        '如果有来生，要化成一阵风',
        '一瞬间也能成为永恒',
        '没有善感的情怀',
        '没有多情的眼睛',
        '一半在雨里洒脱',
        '一半在春光里旅行',
        '寂寞了，孤自去远行',
        '把淡淡的思念统带走',
        '从不思念、从不爱恋',
        '如果有来生，要做一只鸟',
        '飞越永恒，没有迷途的苦恼',
        '东方有火红的希望，南方有温暖的巢床',
        '向西逐退残阳，向北唤醒芬芳',
        '如果有来生',
        '希望每次相遇',
        '都能化为永恒',
        '把淡淡的思念统带走',
        '—— 三毛《如果有来生》'
      ],
      typingFlag: 0
    }
  },
  mounted() {
    // 获取显示文字的span元素
    const textEl = document.querySelector("#text");
// 获取并解析要展示的文本数组JSON.parse
    const texts = this.welcomeStr

// 当前显示文本数组中的第几个
    let index = 0;
// 当前显示第几个字
    let charIndex = 0;
// 每个字显示间隔默认是500毫秒
    let delta = 300;

// 记录动画执行开始时间
    let start = null;
// 是否为删除动画
    let isDeleting = false;

// 动画回调函数
    function type(time) {
      window.requestAnimationFrame(type);
      // 初始化开始时间
      if (!start) start = time;
      // 获取时间间隔
      let progress = time - start;
      // 每隔一定的时间，打印出一个新的字符
      if (progress > delta) {
        // 获取完整的字符
        let text = texts[index];
        // 如果是打字效果
        if (!isDeleting) {
          // 给展示文字的span新增一个字符，使用innerHTML来替换，charIndex自增1，然后返回新的字符串子串
          textEl.innerHTML = text.slice(0, ++charIndex);
          // 每个字符打印出来的速度不一样，模仿人工打字的速度
          delta = 500 - Math.random() * 400;
        } else {
          // 如果是删除效果，则把文字一个一个减掉
          textEl.innerHTML = text.slice(0, charIndex--);
        }
        // 把star更新为当前时间，进行下一个周期
        start = time;

        // 如果文字已经全部打印完毕
        if (charIndex === text.length) {
          // 下次开始删除文字
          isDeleting = true;
          // 删除文字的间隔为200毫秒
          delta = 200;
          // 额外等待1.2秒后再删除
          start = time + 1200;
        }

        // 如果文字删除完毕
        if (charIndex < 0) {
          isDeleting = false;
          // 额外增加200毫秒延迟
          start = time + 200;
          // 把index移动到下一个文本，并且在文本数组元素个数中循环
          index = ++index % texts.length;
        }
      }
    }

    window.requestAnimationFrame(type);


  },
}
</script>

<style lang="scss">
.typing-root {
  position: absolute;
  color: white;
  top: 62%;
  left: 50%;
  transform: translateX(-50%);
  span#text, span.mark {
    font-family: monospace;
    color: aqua;
    font-size: 3vw;
  }
  span.mark {
    border-right: 2px solid white;
    animation: blink 0.6s step-end infinite;
  }
  .typing-root h1 {
    color: white;
    font-size: 2.5rem;
    font-weight: 300;
    font-family: monospace;
  }
  .typing-root span.mark {
    border-right: 2px solid white;
    animation: blink 0.6s step-end infinite;
  }
  @keyframes blink {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: white;
    }
  }
}

.my-box:after {
  position: absolute;
  //top: 50%;
  content: '';
  border-top: 1vw solid #8c8c8c;
  border-left: 1vw solid transparent;
  border-right: 1vw solid transparent;
  animation: my-move 1s infinite;
  -moz-animation: my-move 1s infinite;
  -webkit-animation: my-move 1s infinite;
  -o-animation: my-move 1s infinite;
}
@keyframes my-move {
  from {
    top: 70%;
    border-top-color: rgb(174, 174, 174);
  }
  to {
    top: 75%;
    border-top-color: rgb(255, 255, 255);
  }
}
@-moz-keyframes my-move {
  from {
    top: 60%;
    border-top-color: rgb(174, 174, 174);
  }
  to {
    top: 70%;
    border-top-color: rgb(255, 255, 255);
  }
}
@-webkit-keyframes my-move {
  from {
    top: 60%;
    border-top-color: rgb(174, 174, 174);
  }
  to {
    top: 70%;
    border-top-color: rgb(255, 255, 255);
  }
}
@-o-keyframes my-move {
  from {
    top: 60%;
    border-top-color: rgb(174, 174, 174);
  }
  to {
    top: 70%;
    border-top-color: rgb(255, 255, 255);
  }
}
//@keyframes fade {
//  from {
//    border-top-color: rgb(174, 174, 174);
//  }
//  to {
//    border-top-color: rgb(255, 255, 255);
//  }
//}
//@-moz-keyframes fade {
//  from {
//    border-top-color: rgb(174, 174, 174);
//  }
//  to {
//    border-top-color: rgb(255, 255, 255);
//  }
//}
//@-webkit-keyframes fade {
//  from {
//    border-top-color: rgb(174, 174, 174);
//  }
//  to {
//    border-top-color: rgb(255, 255, 255);
//  }
//}
//@-o-keyframes fade {
//  from {
//    border-top-color: rgb(174, 174, 174);
//  }
//  to {
//    border-top-color: rgb(255, 255, 255);
//  }
//}
@font-face {
  font-family: "YanTi";
  //src: url("../../css/YanTi/YanTi.eot"); /* IE9 */
  src: url("../../css/YanTi/YanTi.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */

  url("../../css/YanTi/YanTi.woff") format("woff"), /* chrome、firefox */
  url("../../css/YanTi/YanTi.ttf") format("truetype"), /* chrome、firefox、opera、Safari, Android, iOS 4.2+ */

  url("../../css/YanTi/YanTi.svg#YanTi") format("svg"); /* iOS 4.1- */
  font-style: normal;
  font-weight: normal;
}
@font-face {
  font-family: 'En0';
  src: url("../../css/En0/En0.eot"); /* IE9 */
  //src: url("../public/css/En0/En0.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
  //src: url("../public/css/En0/En0.eot?#iefix") format("embedded-opentype"); /* IE6-IE8 */


  src: url('../../css/En0/En0.woff') format('woff'), /* Modern Browsers */
  url('../../css/En0/En0.ttf')  format('truetype'), /* Safari, Android, iOS */

  url("../../css/En0/En0.svg")  format('svg'); /* Legacy iOS */
  font-style: normal;
  font-weight: normal;
}
</style>