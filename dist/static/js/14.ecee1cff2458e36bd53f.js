webpackJsonp([14],{"0jfJ":function(t,e){},KcoA:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("Akn+"),i=s("d0pL"),o=s("nGbZ"),n=s("y/jF"),l=s("yJEY"),r={components:{loading:n.a,"comment-title":a.a,"common-header":l.a,"mini-player":i.a,"mini-FM":o.a},computed:{playType:function(){return this.$store.state.playType},isLoading:function(){return this.$store.state.isLoading},myId:function(){return this.$store.getters.myId},myInfo:function(){return this.$store.state.myInfo},myPlaylist:function(){return this.$store.state.myPlaylist}},methods:{logout:function(){this.$store.commit("setIsPlay",{}),this.$store.commit("setPlayingList",{}),this.$store.commit("setMyPlaylist",{}),localStorage.removeItem("myPlaylist"),localStorage.removeItem("myInfo"),localStorage.removeItem("lovedListID"),document.getElementById("player").pause(),this.$store.commit("setIsLogin",!1),console.log(localStorage),this.$router.push("/login")}},deactivated:function(){this.$store.commit("setIsLoading",!1)}},m={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"my-profile"},[s("loading",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}]},[t._v("梦想涌动的声音")]),t._v(" "),t.myInfo.profile?s("div",{staticClass:"top",style:"background-image:url("+t.myInfo.profile.backgroundUrl+")"},[s("common-header",[t._v("我的资料")]),t._v(" "),s("div",{staticClass:"avatar"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.myInfo.profile.avatarUrl,expression:"myInfo.profile.avatarUrl"}],attrs:{alt:""}})]),t._v(" "),s("div",{staticClass:"name"},[t._v(t._s(t.myInfo.profile.nickname))]),t._v(" "),s("div",{staticClass:"logout",attrs:{to:"/login"},on:{click:function(e){t.logout()}}},[t._v("退出登录")])],1):t._e(),t._v(" "),s("div",{staticClass:"my-list"},[s("ul",{staticClass:"lists"},[s("comment-title",[t._v("创建的歌单")]),t._v(" "),t._l(t.myPlaylist,function(e){return e.userId===t.myId?s("router-link",{key:e.trackNumberUpdateTime,staticClass:"item",attrs:{to:"/song-details/"+e.id}},[s("div",{staticClass:"cover"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.coverImgUrl,expression:"item.coverImgUrl"}],attrs:{alt:""}})]),t._v(" "),s("div",{staticClass:"info"},[s("span",{staticClass:"name"},[t._v(t._s(e.name))]),t._v(" "),s("span",{staticClass:"count"},[t._v(t._s(e.trackCount)+"首, 播放"+t._s(e.playCount)+"次")])])]):t._e()}),t._v(" "),s("comment-title",[t._v("收藏的歌单")]),t._v(" "),t._l(t.myPlaylist,function(e){return e.userId!==t.myId?s("li",{key:e.trackNumberUpdateTime,staticClass:"item"},[s("div",{staticClass:"cover"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.coverImgUrl,expression:"item.coverImgUrl"}],attrs:{alt:""}})]),t._v(" "),s("div",{staticClass:"info"},[s("span",{staticClass:"name"},[t._v(t._s(e.name))]),t._v(" "),s("span",{staticClass:"count"},[t._v(t._s(e.trackCount)+"首, 播放"+t._s(e.playCount)+"次")])])]):t._e()})],2)]),t._v(" "),s("mini-player",{directives:[{name:"show",rawName:"v-show",value:1===t.playType,expression:"playType === 1"}]}),t._v(" "),s("mini-FM",{directives:[{name:"show",rawName:"v-show",value:2===t.playType,expression:"playType === 2"}]})],1)},staticRenderFns:[]},c=s("VU/8")(r,m,!1,function(t){s("0jfJ")},"data-v-19d45e12",null);e.default=c.exports}});
//# sourceMappingURL=14.ecee1cff2458e36bd53f.js.map