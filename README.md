# chicken-music

## 遇到的问题: 
1. better-scroll 无限轮播无效... 找不到任何错误
	+ 已注释代码...
	+ 天哪...用这种代码实在太傻了, 有空我要自己写一个轮播


2. 使用 font-awesome
	+ 有空换成 https://github.com/cenkai88/vue-svg-icon
	+ 比较没压缩, 且要线上

3. Todo:  测试 action 传参

## 可改进:
1. 我通过vuex 的 mutation payload 传递歌曲参数, 但好像更正常的做法是把 id 放在 url 最后


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
