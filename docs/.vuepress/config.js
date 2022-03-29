const pluginConf = require('./config/pluginConf')
const themeConf = require('./config/themeConf')

module.exports = {
  base: '/gaosen/',
  theme: 'reco',
  title: 'GaoSen',
  description: '海压竹枝低复举，风吹山脚晦还明。',
  dest: './dist',
  themeConfig: themeConf,
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
      /*百度统计*/
    ['script',{},`
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?8e19a40a52a8064bb93b2bd275a6a448";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
       })();
    `],
    ['link', {rel: 'icon', href: './public/img/avatar.jpg'}],//这是配置网站头像
    ['script',{src: './public/js/jquery-3.6.0.min.js'}],
    ['script',{src: './public/js/loading.js'}]
  ],
  markdown: {
    lineNumbers: true
  },
  plugins: pluginConf,
}