webpackJsonp([10],{Guzt:function(t,e){},KcoA:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Dd8w"),i=a.n(s),o=a("Akn+"),l=a("d0pL"),n=a("nGbZ"),r=a("y/jF"),m=a("yJEY"),c=a("NYxO"),v={components:{loading:r.a,"comment-title":o.a,"common-header":m.a,"mini-player":l.a,"mini-FM":n.a},computed:i()({},Object(c.c)(["playType","isLoading","myInfo","myPlaylist"]),{myId:function(){return this.$store.getters.myId}}),methods:{logout:function(){this.$store.commit("setIsPlay",{}),this.$store.commit("setPlayingList",{}),this.$store.commit("setMyPlaylist",{}),localStorage.removeItem("myPlaylist"),localStorage.removeItem("myInfo"),localStorage.removeItem("lovedListID"),document.getElementById("player").pause(),this.$store.commit("setIsLogin",!1),console.log(localStorage),this.$router.push("/login")}},deactivated:function(){this.$store.commit("setIsLoading",!1)}},y={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"my-profile"},[a("loading",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}]},[t._v("梦想涌动的声音")]),t._v(" "),t.myInfo.profile?a("div",{staticClass:"top",style:"background-image:url("+t.myInfo.profile.backgroundUrl+")"},[a("common-header",[t._v("我的资料")]),t._v(" "),a("div",{staticClass:"avatar"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.myInfo.profile.avatarUrl,expression:"myInfo.profile.avatarUrl"}],attrs:{alt:""}})]),t._v(" "),a("div",{staticClass:"name"},[t._v(t._s(t.myInfo.profile.nickname))]),t._v(" "),a("div",{staticClass:"logout",attrs:{to:"/login"},on:{click:function(e){t.logout()}}},[t._v("退出登录")])],1):t._e(),t._v(" "),a("div",{staticClass:"my-list"},[a("ul",{staticClass:"lists"},[a("comment-title",[t._v("创建的歌单")]),t._v(" "),t._l(t.myPlaylist,function(e){return e.userId===t.myId?a("router-link",{key:e.trackNumberUpdateTime,staticClass:"item",attrs:{to:"/song-details/"+e.id}},[a("div",{staticClass:"cover"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.coverImgUrl,expression:"item.coverImgUrl"}],attrs:{alt:""}})]),t._v(" "),a("div",{staticClass:"info"},[a("span",{staticClass:"name"},[t._v(t._s(e.name))]),t._v(" "),a("span",{staticClass:"count"},[t._v(t._s(e.trackCount)+"首, 播放"+t._s(e.playCount)+"次")])])]):t._e()}),t._v(" "),a("comment-title",[t._v("收藏的歌单")]),t._v(" "),t._l(t.myPlaylist,function(e){return e.userId!==t.myId?a("li",{key:e.trackNumberUpdateTime,staticClass:"item"},[a("div",{staticClass:"cover"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.coverImgUrl,expression:"item.coverImgUrl"}],attrs:{alt:""}})]),t._v(" "),a("div",{staticClass:"info"},[a("span",{staticClass:"name"},[t._v(t._s(e.name))]),t._v(" "),a("span",{staticClass:"count"},[t._v(t._s(e.trackCount)+"首, 播放"+t._s(e.playCount)+"次")])])]):t._e()})],2)]),t._v(" "),a("mini-player",{directives:[{name:"show",rawName:"v-show",value:1===t.playType,expression:"playType === 1"}]}),t._v(" "),a("mini-FM",{directives:[{name:"show",rawName:"v-show",value:2===t.playType,expression:"playType === 2"}]})],1)},staticRenderFns:[]},d=a("VU/8")(v,y,!1,function(t){a("Guzt")},"data-v-9288484c",null);e.default=d.exports}});
//# sourceMappingURL=10.fc28ff7064ef4d59f5a4.js.map