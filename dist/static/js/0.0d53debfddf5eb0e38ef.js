webpackJsonp([0],{"12ZE":function(t,i){},"9bBU":function(t,i,s){s("mClu");var n=s("FeBl").Object;t.exports=function(t,i,s){return n.defineProperty(t,i,s)}},"Akn+":function(t,i,s){"use strict";var n={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"title"},[this._t("default")],2)},staticRenderFns:[]},e=s("VU/8")({},n,!1,function(t){s("Vw2d")},"data-v-72be452c",null);i.a=e.exports},C4MV:function(t,i,s){t.exports={default:s("9bBU"),__esModule:!0}},Rxd6:function(t,i){},Vw2d:function(t,i){},bOdI:function(t,i,s){"use strict";i.__esModule=!0;var n=function(t){return t&&t.__esModule?t:{default:t}}(s("C4MV"));i.default=function(t,i,s){return i in t?(0,n.default)(t,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[i]=s,t}},d0pL:function(t,i,s){"use strict";var n,e=s("bOdI"),a=s.n(e),r={computed:(n={isLoved:function(){return this.lovedSongs.includes(this.id)},isLogin:function(){return this.$store.state.isLogin},id:function(){if(this.playingList[this.currentSongIndex])return this.playingList[this.currentSongIndex].id},currentSongIndex:function(){return this.$store.state.currentSongIndex},playingList:function(){return this.$store.state.playingList},lovedSongs:function(){return this.$store.state.lovedSongs},img:function(){return this.playingList[this.currentSongIndex]?this.playingList[this.currentSongIndex].al.picUrl:null},song:function(){return this.playingList[this.currentSongIndex]?this.playingList[this.currentSongIndex].name:this.isLogin?"已登录":"还没有登录哦"},singer:function(){return this.playingList[this.currentSongIndex]?this.playingList[this.currentSongIndex].ar[0].name:this.isLogin?"正在努力加载我喜欢的歌曲":"当前无歌曲播放~"},player:function(){return document.getElementById("player")},isPlay:function(){return this.$store.state.isPlay}},a()(n,"currentSongIndex",function(){return this.$store.state.currentSongIndex}),a()(n,"playingList",function(){return this.$store.state.playingList}),n),methods:{toggleLoved:function(){var t={isLoved:this.isLoved,id:this.id};this.$store.dispatch("toggleLoved",t)},togglePlay:function(){console.log(this.player.src),"http://localhost:8080/"===this.player.src&&this.$store.dispatch("getSongUrl",this.id),this.playingList.length&&this.$store.commit("togglePlay")},nextSong:function(){this.$store.commit("setIsPlay",!1),this.$store.commit("changeSongIndex"),this.$store.dispatch("getSongUrl",this.id),this.$store.commit("setIsPlay",!0)}}},o={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"mini-player"},[s("router-link",{staticClass:"img-ct",attrs:{to:"/player"}},[s("img",{staticClass:"cover",attrs:{src:t.img}})]),t._v(" "),s("router-link",{staticClass:"info",attrs:{to:"/player"}},[s("span",{staticClass:"song"},[t._v(t._s(t.song))]),t._v(" "),s("span",{staticClass:"singer"},[t._v(t._s(t.singer))])]),t._v(" "),s("div",{staticClass:"btn",on:{click:function(i){t.toggleLoved()}}},[s("i",{staticClass:"fa",class:{"fa-heart-o":!t.isLoved,"fa-heart loved":t.isLoved},attrs:{"aria-hidden":"true"}})]),t._v(" "),s("div",{staticClass:"play-btn",on:{click:function(i){t.togglePlay()}}},[s("i",{staticClass:"fa",class:{"fa-play-circle-o":!t.isPlay,"fa-pause-circle-o":t.isPlay},attrs:{"aria-hidden":"true"}})]),t._v(" "),s("div",{staticClass:"next-btn",on:{click:function(i){t.nextSong()}}},[s("i",{staticClass:"fa fa-step-forward",attrs:{"aria-hidden":"true"}})])],1)},staticRenderFns:[]},c=s("VU/8")(r,o,!1,function(t){s("k4Ik")},"data-v-2401c9f0",null);i.a=c.exports},hBlw:function(t,i){},k4Ik:function(t,i){},mClu:function(t,i,s){var n=s("kM2E");n(n.S+n.F*!s("+E39"),"Object",{defineProperty:s("evD5").f})},nGbZ:function(t,i,s){"use strict";var n={computed:{id:function(){if(this.FM)return this.FM.id},FM:function(){return this.$store.state.FM},song:function(){return this.FM?this.FM.name:"oops"},singer:function(){return this.FM?this.FM.artists[0].name:"当前无 FM 播放~"},lovedSongs:function(){return this.$store.state.lovedSongs},isLoved:function(){return this.lovedSongs.includes(this.id)},img:function(){if(this.FM)return this.FM.album.picUrl},player:function(){return document.getElementById("player")},isPlay:function(){return this.$store.state.isPlay}},methods:{toggleLoved:function(){var t={isLoved:this.isLoved,id:this.id};this.$store.dispatch("toggleLoved",t)},togglePlay:function(){this.$store.commit("togglePlay")},nextSong:function(){this.$store.dispatch("getFM")}}},e={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"mini-FM"},[s("router-link",{staticClass:"img-ct",attrs:{to:"/personal-fm"}},[s("img",{staticClass:"cover",attrs:{src:t.img}})]),t._v(" "),s("router-link",{staticClass:"info",attrs:{to:"/personal-fm"}},[s("span",{staticClass:"song"},[t._v(t._s(t.song))]),t._v(" "),s("span",{staticClass:"singer"},[t._v(t._s(t.singer))])]),t._v(" "),s("div",{staticClass:"btn",on:{click:function(i){t.toggleLoved()}}},[s("i",{staticClass:"fa",class:{"fa-heart-o":!t.isLoved,"fa-heart loved":t.isLoved},attrs:{"aria-hidden":"true"}})]),t._v(" "),s("div",{staticClass:"play-btn",on:{click:function(i){t.togglePlay()}}},[s("i",{staticClass:"fa",class:{"fa-play-circle-o":!t.isPlay,"fa-pause-circle-o":t.isPlay},attrs:{"aria-hidden":"true"}})]),t._v(" "),s("div",{staticClass:"next-btn",on:{click:function(i){t.nextSong()}}},[s("i",{staticClass:"fa fa-step-forward",attrs:{"aria-hidden":"true"}})])],1)},staticRenderFns:[]},a=s("VU/8")(n,e,!1,function(t){s("Rxd6")},"data-v-f17f09ce",null);i.a=a.exports},"y/jF":function(t,i,s){"use strict";var n={data:function(){return{timeOut:null}},activated:function(){var t=this;this.timeOut=setTimeout(function(){t.$store.commit("setIsLoading",!1),t.$store.commit("throwError")},3e4)},deactivated:function(){clearTimeout(this.timeOut)}},e={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"loading"},[i("i",{staticClass:"fa fa-spinner fa-spin fa-3x",attrs:{"aria-hidden":"true"}}),this._v(" "),i("p",{staticClass:"word"},[this._t("default")],2)])},staticRenderFns:[]},a=s("VU/8")(n,e,!1,function(t){s("hBlw")},"data-v-07c29e1d",null);i.a=a.exports},yJEY:function(t,i,s){"use strict";var n={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"common-header"},[s("div",{staticClass:"icon",on:{click:function(i){t.goback()}}},[s("i",{staticClass:"fa fa-chevron-left",attrs:{"aria-hidden":"true"}})]),t._v(" "),s("p",{staticClass:"title"},[t._t("default")],2),t._v(" "),s("div",{staticClass:"icon",on:{click:function(i){t.goPlayer()}}},[s("i",{staticClass:"fa fa-headphones",attrs:{"aria-hidden":"true"}})])])},staticRenderFns:[]},e=s("VU/8")({methods:{goback:function(){this.$router.go(-1)},goPlayer:function(){2===this.playType?this.$router.push("/personal-fm"):this.$router.push("/player")}}},n,!1,function(t){s("12ZE")},null,null);i.a=e.exports}});
//# sourceMappingURL=0.0d53debfddf5eb0e38ef.js.map