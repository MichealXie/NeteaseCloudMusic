webpackJsonp([3],{Q0bK:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=i("Dd8w"),n=i.n(e),a=i("y/jF"),o={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"comment-info-all"},["playlist"===this.$route.params.type?s("div",{staticClass:"comment-info"},[s("div",{staticClass:"img"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:this.songListDetail.coverImgUrl,expression:"songListDetail.coverImgUrl"}]})]),this._v(" "),s("div",{staticClass:"info"},[s("div",{staticClass:"list-name"},[this._v(this._s(this.songListDetail.name))]),this._v(" "),s("div",{staticClass:"nickname"},[this._v(this._s(this.songListDetail.creator.nickname))])])]):this._e(),this._v(" "),"music"===this.$route.params.type?s("div",{staticClass:"comment-info"},[s("div",{staticClass:"img"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:this.img,expression:"img"}]})]),this._v(" "),s("div",{staticClass:"info"},[s("div",{staticClass:"list-name"},[this._v(this._s(this.song))]),this._v(" "),s("div",{staticClass:"nickname"},[this._v(this._s(this.singer))])])]):this._e()])},staticRenderFns:[]},r=i("VU/8")({computed:{playType:function(){return this.$store.state.playType},FM:function(){return this.$store.state.FM},currentSongIndex:function(){return this.$store.state.currentSongIndex},playingList:function(){return this.$store.state.playingList},songListDetail:function(){return this.$store.state.songListDetail},singer:function(){return 2===this.playType?this.FM.artists[0].name:this.playingList[this.currentSongIndex].ar[0].name},song:function(){return 2===this.playType?this.FM.name:this.playingList[this.currentSongIndex].name},img:function(){return 2===this.playType?this.FM.album.picUrl:this.playingList[this.currentSongIndex].al.picUrl}}},o,!1,function(t){i("UXot")},null,null).exports,c={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"comment-header"},[i("div",{staticClass:"back",on:{click:function(s){t.goback()}}},[i("i",{staticClass:"fa fa-chevron-left",attrs:{"aria-hidden":"true"}})]),t._v(" "),i("div",{staticClass:"info"},[t._v("评论("+t._s(t.comments.total)+")")])])},staticRenderFns:[]},m=i("VU/8")({computed:{comments:function(){return this.$store.state.comments}},methods:{goback:function(){this.$router.go(-1)}}},c,!1,function(t){i("WxOp")},null,null).exports,l=i("Akn+"),u={props:{item:Object},computed:{comment:function(){return this.item.content.split("\n")}}},h={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("li",{staticClass:"item"},[i("div",{staticClass:"top"},[i("router-link",{staticClass:"avatar",attrs:{to:"/user-profile/"+t.item.user.userId}},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.item.user.avatarUrl,expression:"item.user.avatarUrl"}],attrs:{alt:""}})]),t._v(" "),i("router-link",{staticClass:"name",attrs:{to:"/user-profile/"+t.item.user.userId}},[t._v(t._s(t.item.user.nickname))]),t._v(" "),i("div",{staticClass:"like"},[i("span",{staticClass:"like-count"},[t._v(t._s(t.item.likedCount))]),t._v(" "),i("i",{staticClass:"fa fa-thumbs-o-up",attrs:{"aria-hidden":"true"}})])],1),t._v(" "),i("div",{staticClass:"bottom"},t._l(t.comment,function(s,e){return i("li",{key:e,staticClass:"word"},[t._v(t._s(s))])}))])},staticRenderFns:[]},v=i("VU/8")(u,h,!1,function(t){i("nXOT")},"data-v-4bd64566",null).exports,d=i("NYxO"),_={components:{loading:a.a,"comment-info":r,"comment-header":m,"comment-title":l.a,"comment-content":v},computed:n()({},Object(d.c)(["isLoading","comments"])),activated:function(){var t={type:this.$route.params.type,id:this.$route.params.id,limit:100};this.$store.dispatch("getComments",t)},deactivated:function(){this.$store.commit("setIsLoading",!1)}},p={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"comment"},[s("loading",{directives:[{name:"show",rawName:"v-show",value:this.isLoading,expression:"isLoading"}]},[this._v("ψ(｀∇´)ψ")]),this._v(" "),s("comment-header"),this._v(" "),s("comment-info"),this._v(" "),this.comments.hotComments?s("ul",{staticClass:"hot"},[s("comment-title",[this._v("精彩评论")]),this._v(" "),this._l(this.comments.hotComments,function(t){return s("comment-content",{key:t.commentId,attrs:{item:t}})})],2):this._e(),this._v(" "),this.comments.comments?s("ul",{staticClass:"all"},[s("comment-title",[this._v("最新评论("+this._s(this.comments.total)+")")]),this._v(" "),this._l(this.comments.comments,function(t){return s("comment-content",{key:t.commentId,attrs:{item:t}})}),this._v(" "),this.comments.comments?this._e():s("p",{staticClass:"no-comment"},[this._v("暂无评论, 欢迎抢沙发")])],2):this._e()],1)},staticRenderFns:[]},f=i("VU/8")(_,p,!1,function(t){i("iVgu")},"data-v-034fbcc9",null);s.default=f.exports},UXot:function(t,s){},WxOp:function(t,s){},iVgu:function(t,s){},nXOT:function(t,s){}});
//# sourceMappingURL=3.f459db9ca06209701bf4.js.map