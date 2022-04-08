# vuepress-plugin-flowchart
flowchart plugin for vuepress

> New features for (ulivz/vuepress-plugin-flowchart)(https://github.com/ulivz/vuepress-plugin-flowchart)

## Installation

```shell
yarn add -D @maginapp/vuepress-plugin-flowchart
# or npm install -D @maginapp/vuepress-plugin-flowchart
```

## Usage

### config

```js
module.exports = {
    // ...
    plugins: [
        '@maginapp/vuepress-plugin-flowchart',
        {
          openMarker: '```mermaid',
          closeMarker: '```',
          scondMarker: 'flowchat',
          ignoreSecondLine: false
        }
    ]
    // ...
}
```

### options

#### openMarker

* type: `string`
* default: ````mermaid`

setting open marker

#### closeMarker

* type: `string`
* default: ` ``` `

setting close marker

#### scondMarker

* type: `string`
* default: `flowchat`

setting scondline marker when `ignoreSecondLine = false`

#### ignoreSecondLine

* type: `boolean`
* default: `false`

setting whether to use scondMarker

### difference with `ulivz/vuepress-plugin-flowchart@v1.4.3`

Just modify some code to be compatible with CSDN blog

* It's just that the outer marker is different


```md
​```mermaid
flowchat

...
sanme code with ulivz/vuepress-plugin-flowchart@v1.4.3
...

​```
```

* Added configuration feature

> It can be set to be the same as `ulivz/vuepress-plugin-flowchart@v1.4.3` by configuring parameters

```js
{
    openMarker: '@flowstart',
    closeMarker: '@flowend',
    ignoreSecondLine: true
}
```


### docs

Same Usage with [`ulivz/vuepress-plugin-flowchart@v1.4.3`](https://flowchart.vuepress.ulivz.com/)

## Quote

* [ulivz/vuepress-plugin-flowchart](https://github.com/ulivz/vuepress-plugin-flowchart)
