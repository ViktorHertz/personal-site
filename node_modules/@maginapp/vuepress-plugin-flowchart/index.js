// Make changes based on https://github.com/ulivz/vuepress-plugin-flowchart

const path = require('path')

module.exports = (options = {}, context) => ({
  // component: './flowcharts.vue'
  enhanceAppFiles: [
    path.resolve(__dirname, './lib/client.js')
  ],

  chainMarkdown (config) {
    config
      .plugin('flowchart')
      .use(require('./lib/markdownItPlugin'), [Object.assign({
        openMarker: '```mermaid',
        closeMarker: '```',
        scondMarker: 'flowchat',
        ignoreSecondLine: false
      }, options)])
  }
})
