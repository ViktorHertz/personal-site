---
home: true

---
<ShowFont style="display: none" />
<style>
  /*@import "./.vuepress/public/css/home.scss";*/
.bg-box {
    width: 100%;
    /*height: 100vh;*/
    overflow: hidden;
    position: relative;
}
.my-class {
    max-width: 100%;
    margin: 0 auto;
    padding: 0;
}
.x {
    padding-top: 0;
}
.text-box {
    width: 100%;
    height: 150px;
    text-align: center;
    position: absolute;
    top: 20vw;
    z-index: 3;
    left: 50%;
    transform: translateX(-50%);
    color: aqua;
}
.p1 {
    font-size: 10vw;
    line-height: normal;
    margin: 0 auto;
}
.p2 {
    font-size: 3vw;
    font-weight: 500;
    /*line-height: normal;*/
    margin: 10px auto ;
    letter-spacing: 0.5vw;
}
.my-hero {
    display: none;
}

</style>

<script>
import $ from 'jquery';
export default {
  data() {
    return {
      T: 3500,
      stopTime: 900,
      welcomeStr: [
        /*单个元素不要超过12+3=15字*/
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
    this.listenLeave();

    $('div.hero').addClass('my-hero');
    this.solveBg();
    /*周期执行生成/删除特效文字*/
    this.solveTypingEffect();

    /*自动降低音量*/
    setTimeout(() => {
      $('div.volume-bar div.bar').attr('style','width:40%');
    },500);

    $('i.play').click(() => {
        console.log('i.play被点击');
        $('i.reco-bgm.reco-bgm-left').click();
      });
    
    
  },
  methods: {
    removeDom() {
      $('div.home-blog').empty();

      /*删除特效文字,避免重复添加*/
      /*$('div.root').remove();*/
    },
    addDom() {
      /*添加动态壁纸*/
      $('div.home-blog').prepend(`
          <div class="bg-box">
            <video 
              autoplay muted loop width="100%"
              src="/gaosen/img/bg0.mp4"
            >
            </video>
            <div class="text-box">
              <p class="p1" style="font-family:'En0';">GaoSen</p>
              <p class="p2" style="font-family:'YanTi';">海压竹枝低复举，风吹山角晦还明。</p>
            </div>
          </div>
        `);
    },
    solveBg() {
      /*解决动态壁纸问题*/
      this.addDom();
      $('div.hero').empty();

      /*报错clientHeight来源*/  
      $('div.hero').removeAttr('style');
      $('div.hero').attr('style',"display:none;");
      $('div.page-title').remove();
      $('div.theme-reco-content').removeClass('theme-reco-content content__default');
      $('main.page').addClass('x');
      $('footer.page-edit').remove();
    },
    typingEffect(i) {
      let welcomeStr = this.welcomeStr;
      /*添加特效文字*/
      $('div.bg-box').append(`
          <div class="root">
            <p class="text">${welcomeStr[i]}</p>
          </div>
        `);
      if($('div.root').length > 0) {
        const p = document.querySelector('p.text');
        p.innerHTML = p.textContent.replace(/\S/g,"<span>$&</span>");
        let delay = 0;
        document.querySelectorAll('.text span').forEach((span, index) => {
          delay += 0.1;
          if(index %5 === 0) delay += 0.3;
          span.style.setProperty('--delay', `${delay}s`)
        });
  
        p.addEventListener('animationend', (e) => {
          if(e.target === document.querySelector('p.text span:last-child')) {
            p.classList.add('ended');
            setTimeout(() => {
              /*$('div.root').remove();*/
              /*这里的数字是最后一个字符的停顿时间*/
            },this.stopTime)
          }
        })
      }
      
     
    },
    solveTypingEffect() {
      console.log(this.$page.frontmatter.home);
      if(this.$page.frontmatter.home === true) {
        setInterval(() => {
          if(this.$page.frontmatter.home !== true) {
            clearInterval();
            console.log('home:'+this.$page.frontmatter.home);
            /*$('div.root').remove();*/
          }
          
          /*每次新增打字机前，先查询是否有div.root。 有：删除。添加 */
          if($('div.root').length > 0) {
            $('div.root').remove();
          }
          this.typingEffect(this.typingFlag);
          this.typingFlag ++;
          /*这里的数字是周期*/
          if(this.typingFlag >= this.welcomeStr.length) this.typingFlag = 0;
        },this.T);
      }
    },
    listenLeave() {
      let document = window.document;
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          document.title = '客官别走⊙﹏⊙!';
        }
        if (document.visibilityState === 'visible') document.title = 'GaoSen';
      })
    },
    generateFont() {
      $webfont.load("div.root p", "53507460eb0d4ed2b88d02931770a03b", "LiDeBiao-Xing3");
      $webfont.load("#h1", "53507460eb0d4ed2b88d02931770a03b", "LiDeBiao-Xing3");
      $webfont.draw();
    }
  }
}
</script>