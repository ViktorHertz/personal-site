<template>
  <div class="root">
<!--    <p class="text">忆已往兮,宠辱偕忘,心旷神怡;</p>-->
  </div>
</template>

<!--<script>-->
<!--export default {-->
<!--  name: "ShowFont",-->
<!--  mounted() {-->
<!--    this.typingEffect()-->
<!--  },-->
<!--  methods: {-->
<!--    typingEffect() {-->
<!--      console.log('home:'+this.$page.frontmatter.home);-->
<!--      if (this.$page.frontmatter.home === true) {-->
<!--        const p = document.querySelector('p.text')-->
<!--        p.innerHTML = p.textContent.replace(/\S/g, "<span>$&</span>")-->

<!--        let delay = 0-->
<!--        document.querySelectorAll('.text span').forEach((span, index) => {-->
<!--          delay += 0.1-->
<!--          if (index % 5 === 0) delay += 0.3-->
<!--          span.style.setProperty('&#45;&#45;delay', `${delay}s`)-->
<!--        })-->

<!--        p.addEventListener('animationend', (e) => {-->
<!--          if (e.target === document.querySelector('p.text span:last-child')) {-->
<!--            p.classList.add('ended')-->
<!--          }-->
<!--        })-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<style lang="scss">
.root {
  font-family: 'my-font';
  display: flex;
  justify-content: center;
  align-items: center;
  //min-height: 100vh;
  height: 20%;
  position: absolute;
  top: 40vw;
  z-index: 25;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  .text {
    font-size: 3vw;
    margin: 0;
    padding: 0;
    //font-family: monospace;
    position: relative;
    line-height: normal;
    color: #0dcac8;
    span {
      --delay: 10s;

      display: inline-block;
      overflow: hidden;
      width: 0ch;
      animation: 0.1s text-in ease-in-out forwards;
      animation-delay: var(--delay);
    }
    @keyframes cursor {
      /*光标闪烁*/
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes text-in {
      from {
        width: 0ch;
      }
      to {
        width: 3ch;
      }
    }
  }

  .text::after {
    content: '';
    display: inline-block;
    position: absolute;
    width: 0.5vw;
    height: 3vw;
    background-color: #0dcac8;
    border-radius: 2px;
    right: -1vw;
    top: 0.2vw;
    /*一直闪烁*/
    animation: 1.1s cursor steps(2, jump-none) infinite;
  }

  .text.ended::after {
    /*光字体显示全部后光标才闪烁*/
    //animation: 1.1s cursor steps(2, jump-none) infinite;
  }

  @font-face {
    font-family: 'my-font';
    //src: url('YourWebFontName.eot'); /* IE9 Compat Modes */
    //src: url('YourWebFontName.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    src: url('../public/css/my-font.woff') format('woff'), /* Modern Browsers */
         url('../public/css/my-font.ttf')  format('truetype'), /* Safari, Android, iOS */
         url("../public/css/my-font.svg")  format('svg'); /* Legacy iOS */
  }
}


</style>