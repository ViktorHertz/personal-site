module.exports = {
  "vuepress-plugin-auto-sidebar": {},
  "@vuepress-reco/vuepress-plugin-loading-page": {},
  'ribbon': {
    size: 90, // width of the ribbon, default: 90
    opacity: 0.8, // opacity of the ribbon, default: 0.3
    zIndex: -1, // z-index property of the background, default: -1
  },
  '@vuepress-reco/vuepress-plugin-bgm-player': {
    audios: [
      // 本地文件示例
      {
        name: '夏日漱石',
        artist: '橘子海',
        url: '../public/bgm/bgm.mp3',
        cover: '../public/bgm/cover.png'
      },
      // 网络文件示例
      {
        name: '강남역 4번 출구',
        artist: 'Plastic / Fallin` Dild',
        url: 'https://assets.smallsunnyfox.com/music/2.mp3',
        cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
      },
      {
        name: '用胳膊当枕头',
        artist: '최낙타',
        url: 'https://assets.smallsunnyfox.com/music/3.mp3',
        cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
      }
    ]
  }
}