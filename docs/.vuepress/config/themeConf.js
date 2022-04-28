const nav = require('./nav')
const sidebar = require('./sidebar')

module.exports = {
  type: 'blog',
  logo: '/img/avatar.png',
  // author: 'GaoSen',
  authorAvatar: '/img/avatar.png',
  lastUpdated: '上次更新 ',
  nav: nav,
  sidebar: sidebar,
  noFoundPageByTencent: false,
  blogConfig: {
    socialLinks: [     // 信息栏展示社交信息
      {icon: 'reco-mayun', link: 'https://gitee.com/gao_sen_g'},
      {icon: 'reco-github', link: 'https://github.com/ViktorHertz'},
      {icon: 'reco-qq', link: 'https://wx2.sinaimg.cn/mw2000/008eCrIAly1h0tyovdqryj30ku11c41i.jpg'},
      {icon: 'reco-wechat', link: 'https://wx1.sinaimg.cn/mw2000/008eCrIAly1h0tyovm9p8j30by0by3z2.jpg'},
    ],
  }
  // vssueConfig: {
  //   platform: 'gitee',
  //   owner: 'gao_sen_g',
  //   repo: 'GaoSen',
  //   clientId: '78fb41184ae1dd78e95ccaed5812da351d2c682f33a3b6e0344af2fa60cc8249',
  //   clientSecret: '1cab839a8d5620af4ba2868ebcc4995d64116a7f1c4676eaeea2fa349860a334',
  // }
}