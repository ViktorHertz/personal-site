<template>
  <div class="root">
<!--    <p class="text">CodingStartup</p>-->
    <p class="text">忆已往兮,宠辱偕忘,心旷神怡;</p>
<!--    <p class="text">俟其离兮,思愁千万,心寓感激.</p>-->
  </div>
</template>

<script>
export default {
  name: "CssDemo",
   mounted() {
    const p = document.querySelector('p.text')
    p.innerHTML = p.textContent.replace(/\S/g,"<span>$&</span>")

     let delay = 0
     document.querySelectorAll('.text span').forEach((span, index) => {
       delay += 0.1
       if(index %5 === 0) delay += 0.3
       span.style.setProperty('--delay', `${delay}s`)
     })

     p.addEventListener('animationend', (e) => {
       if(e.target === document.querySelector('p.text span:last-child')) {
         p.classList.add('ended')
       }
     })
  }
}
</script>

<style lang="scss">
  .root {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    .text {
      font-size: 6rem;
      margin: 0;
      padding: 0;
      font-family: monospace;
      position: relative;
      line-height: normal;
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
          width: 2ch;
        }
      }
    }

    .text::after {
      content: '';
      display: inline-block;
      position: absolute;
      width: 20px;
      height: 6rem;
      background-color: #000;
      border-radius: 2px;
      right: -30px;
    }

    .text.ended::after {
      /*光字体显示全部后光标才闪烁*/
      animation: 1.1s cursor steps(2, jump-none) infinite;
    }

  }
</style>