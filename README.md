# chicken-music

## 遇到的问题: 
1. better-scroll 无限轮播无效... 找不到任何错误
	+ 已注释代码...
	+ 天哪...用这种代码实在太傻了, 有空我要自己写一个轮播


2. 使用 font-awesome
	+ 有空换成 https://github.com/cenkai88/vue-svg-icon
	+ 比较没压缩, 且要线上

3. Todo:  测试 action 传参 

4. em....search 页面应该怎么在 router 里显示呢
	- [ ] 试试把 app-header 放到 recommend 里
	- [x] 或者重新设计二级路由: 
		+ 首页 home
			- 推荐
			- 歌单
			- 排行榜
		+ 搜索 search
			- 单曲
			- 歌手
			- .....等等
	- [x] components 结构:
		+ 全部做成router-link
		+ 全局只有两个: link 跟播放界面

5. 麻烦的移动端自适应
	+ 选项1: 使用 flexible
	+ 选项2: 添加事件resize, 实时确定根元素的 rem, 默认100, 全程 rem 控制大小
	- [x] 选项3: 直接使用 vh, vw => postcss + px 完全搞定

6. 由问题5引出的问题6...  postcss 如何引入?
	+ 在 .postcsssrc.js 里配置usePostCSS:true...(这步卡了我2小时!生气.jpg)
	+ 安装包, 还有把包放入,build 的 utils.js

7. 项目开始变复杂了, 页面切换有点烦, 实现的方式很多, 最佳实践应该怎么做呢?
	- [ ] 明天花一个小时确定整个项目结构

8. 头疼...  搜索的逻辑
	+ 记录下   保存类型还有名称
	  - store 有一个对象, 包括了所有的搜索结果
		- 每次调用根据 type, keywords来搜索, 再通过对象名称来调用结果	 
## 可改进:
1. - [x] 我通过vuex 的 mutation payload 传递歌曲参数, 但好像更正常的做法是把 id 放在 url 最后  
	+ 修改完成

2. - [ ] rank 界面可重构: 样式完全一样, 把4个东西东西放入一个对象,  v-for 搞定

3. - [x] promise 可改为 async  
	+ 从现在开始使用

4. - [x] 分离 loading 组件

5. - [x] 默认加载中图片可改为灰色网易云

6. - [x] 判断数据是否存在来减少网络请求... 
  + keep-alive 解决

7. - [x] 歌单详情点击后退是回到首页, 能否改成真"后退"?

8. 修复轮播(黑盒我真的无语了)

9. - [x] search怎么做? 是一开始发送所有请求还是...按一个发一个请求?
	+ 一个一个发, 数据储存在一个对象中, 需要哪个属性就发送哪个请求, 再显示对应的 ul

10. - [ ] search 的热门搜索是根据排行榜来的, 假如没打开过排行榜, 就没有数据显示

11. - [ ] 首页获取的50个 playlist 可以用在 toplist
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
