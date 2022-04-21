const pluginConf = require('./config/pluginConf')
const themeConf = require('./config/themeConf')
const
    // md = require('markdown-it')(),
      mathjax3 = require('markdown-it-mathjax3');

module.exports = {
  base: '',
  dest: '',
  theme: 'reco',
  title: 'GaoSen',
  description: '海压竹枝低复举，风吹山脚晦还明。',
  themeConfig: themeConf,
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
      /*百度统计*/
    ['script',{},`
      var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?f79d18380f8a25883838c41126b8eaf8";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
    `],
    ['link', {rel: 'icon', href: '/img/avatar.png'}],//这是配置网站头像
    ["link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css" }],
      /*海压竹枝低复举*/
    ["link", { rel: "stylesheet", href: "https://cdn.repository.webfont.com/webfonts/nomal/148407/46724/62452480f629d80bf48c9852.css",type: 'text/css'}],

    /*GaoSen*/
    ["link", { rel: "stylesheet", href: "https://cdn.repository.webfont.com/webfonts/nomal/148407/45817/624525e4f629d80bf48c9853.css",type: 'text/css'}],

    ['script',{src: '/js/jquery-3.6.0.min.js'}],
    ['script',{src: '/js/loading.js'}],
    ['script',{src: "https://cdn.bootcss.com/echarts/3.7.2/echarts.min.js"}],
  ],
  markdown: {
    lineNumbers: true,
    plugins: {
      'markdown-it-katex': {},
    },
    extendMarkdown: md => {
      md.use(mathjax3);
      // md.use(require("markdown-it-disable-url-encode"));
    }
  },
  plugins: pluginConf,
  extraWatchFiles: [
    './config/sidebar.js'
  ],
}