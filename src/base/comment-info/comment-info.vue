<template>
	<div class="comment-info-all">
		<div class="comment-info" v-if="this.$route.params.type === 'playlist'">
			<div class="img"><img v-lazy="songListDetail.coverImgUrl"></div>
			<div class="info">
				<div class="list-name">{{songListDetail.name}}</div>
				<div class="nickname">{{songListDetail.creator.nickname}}</div>
			</div>
		</div>
		<div class="comment-info" v-if="this.$route.params.type === 'music'">
			<div class="img"><img v-lazy="img"></div>
			<div class="info">
				<div class="list-name">{{song}}</div>
				<div class="nickname">{{singer}}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		playType(){
			return this.$store.state.playType
		},
		FM(){
			return this.$store.state.FM
		},
		currentSongIndex(){
			return this.$store.state.currentSongIndex
		},
		playingList(){
			return this.$store.state.playingList
		},
		songListDetail(){
			return this.$store.state.songListDetail
		},
		singer(){
			if(this.playType === 2) return this.FM.artists[0].name
			else return this.playingList[this.currentSongIndex].ar[0].name
		},
		song(){
			if(this.playType === 2) return this.FM.name
			else return this.playingList[this.currentSongIndex].name
		},
		img(){
			if(this.playType === 2) return this.FM.album.picUrl
			else return this.playingList[this.currentSongIndex].al.picUrl
		}
	}
}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

	.comment-info
		padding-top 48px
		display flex
		align-items center		
		background-color $list-background
		.img
			flex 0 0 72px
			img 
				width 56px
				height 56px
				padding 8px
		.info
			flex 1
			display flex
			flex-direction column
			padding-left 10px
			.list-name
				padding 5px 0
			.nickname
				font-size 12px
				color $not-important
</style>
