const moment = require('moment')

module.exports = {
  "vuepress-plugin-auto-sidebar": false,
  "@vuepress-reco/vuepress-plugin-loading-page": {},
  '@vuepress-reco/vuepress-plugin-bgm-player': {
    audios: [
      // 网络文件示例
      {
        name: '鲸',
        artist: 'DInxm Robinson',
        url: '/bgm/bgm1.mp3',
        cover: '/bgm/cover1.png'
      },
      {
        name: '夏日漱石',
        artist: '橘子海',
        url: '/gaosen/bgm/bgm.mp3',
        cover: '/gaosen/bgm/cover.png'
      },
    ]
  },
  // '@vuepress-reco/vuepress-plugin-comments': {
  //   platform: 'gitee',
  //   // 其他的 Vssue 配置
  //   owner: 'gao_sen_g',
  //   repo: 'gaosen',
  //   clientId: '78fb41184ae1dd78e95ccaed5812da351d2c682f33a3b6e0344af2fa60cc8249',
  //   clientSecret: '1cab839a8d5620af4ba2868ebcc4995d64116a7f1c4676eaeea2fa349860a334',
  // },
  '@vuepress/last-updated': {
    transformer: (timestamp, lang) => {
      // 不要忘了安装 moment
      moment.locale("zh-cn")
      return moment(timestamp).format("LLLL")
    }
  },
  '@vuepress-reco/vuepress-plugin-rss': false,
  '@vuepress-reco/extract-code': {},
  "@mr-hope/copy-code": {},
  '@codeciting/vuepress-plugin-echarts': false,
  'one-click-copy': {
    copySelector: ['div#my-copy'], // String or Array
    copyMessage: 'copied', // default is 'Copied successfully!'
    toolTipMessage: '复制', // default is ''Copy to clipboard'
    duration: 1000, // prompt message display time
  },
  'cursor-effects': {
  },
  'vuepress-plugin-flowchart': {
    openMarker: '```mermaid',
    closeMarker: '```',
    scondMarker: 'flowchat',
    ignoreSecondLine: false
  },
  '@maginapp/vuepress-plugin-flowchart': {
    openMarker: '```mermaid',
    closeMarker: '```',
    scondMarker: 'flowchat',
    ignoreSecondLine: false
  },
  /*发现看板娘插件和打赏插件冲突*/
  'vuepress-plugin-sponsor': {
    themeSponsor: "simple",
    wechat: "/img/wechatPay.png",
    qq: "/img/QQpay.png",
    duration: 2000
  },
  '@vuepress-reco/vuepress-plugin-kan-ban-niang': {
    theme: ['shizuku'],
    clean: true,
    messages: {
      welcome: '欢迎来到GaoSen的博客',
      home: '心里的花，我想要带你回家。',
      theme: '好吧，希望你能喜欢我的其他小伙伴。',
      close: '你知道我喜欢吃什么吗？痴痴地望着你。'
    },
    modelStyle: {
      right: '90px', bottom: '-20px', opacity: '0.7'
    },
    width: 150,
    height: 220
  },
  'sakura': {
    num: 5,  // 默认数量
    show: true, //  是否显示
    zIndex: -1,   // 层级
    img: {
      replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
      httpUrl: '...'     // 绝对路径
    }
  },
  'ribbon-animation': {
    size: 90,   // 默认数据
    opacity: 0.3,  //  透明度
    zIndex: -1,   //  层级
    opt: {
      // 色带HSL饱和度
      colorSaturation: "80%",
      // 色带HSL亮度量
      colorBrightness: "60%",
      // 带状颜色不透明度
      colorAlpha: 0.25,
      // 在HSL颜色空间中循环显示颜色的速度有多快
      colorCycleSpeed: 6,
      // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
      verticalPosition: "center",
      // 到达屏幕另一侧的速度有多快
      horizontalSpeed: 200,
      // 在任何给定时间，屏幕上会保留多少条带
      ribbonCount: 2,
      // 添加笔划以及色带填充颜色
      strokeSize: 0,
      // 通过页面滚动上的因子垂直移动色带
      parallaxAmount: -0.5,
      // 随着时间的推移，为每个功能区添加动画效果
      animateSections: true
    },
    ribbonShow: false, //  点击彩带  true显示  false为不显示
    ribbonAnimationShow: true  // 滑动彩带
  },
  '@vuepress/plugin-medium-zoom':{
    selector: '.theme-reco-content :not(a,.myImgBox) > img'
  }
}