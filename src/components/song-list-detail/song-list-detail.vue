<template>
	<div class="song-list-detail">
		<div class="detail-header">
			<div class="top">
				<router-link class="icon" to="/">
					<i class="fa fa-chevron-left" aria-hidden="true"></i>
				</router-link>
				<p class="title">歌单</p>
				<div class="icon">
					<i aria-hidden="true" class="fa fa-headphones"></i>
				</div>
			</div>
			<div class="detail-info">
				<div class="img-ct">
					<img v-lazy="songListDetail.creator.backgroundUrl">
					<span class="count">{{songListDetail.playCount}}</span>
				</div>
				<div class="list-creator">
						{{songListDetail.name}}
					<div class="creator-info">
						<img v-lazy="songListDetail.creator.avatarUrl" alt="">
						<span class="nickname">{{songListDetail.creator.nickname}}</span>
					</div>
				</div>
			</div>
			<div class="list-data">
				<div class="icon-ct">
					<i class="fa fa-plus-square-o" aria-hidden="true"></i>
					<p>{{songListDetail.subscribedCount}}</p>
				</div>
				<div class="icon-ct">
					<i class="fa fa-commenting-o" aria-hidden="true"></i>
					<p>{{songListDetail.trackCount}}</p>
				</div>
				<div class="icon-ct">
					<i class="fa fa-share-square-o" aria-hidden="true"></i>
					<p>{{songListDetail.shareCount}}</p>					
				</div>
			</div>
		</div>
		<div class="detail-list">
			<ul class="songs">
				<li class="song" v-for="(item, index) in songListDetail.tracks" :key="item.id">
					<span class="index">{{index + 1}}</span>
					<div class="info">
						<div class="name">{{item.name}}</div>
						<div class="singer">{{item.ar[0].name}} - {{item.al.name}}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

export default {
	computed: {
		songListDetail(){
			return this.$store.state.songListDetail
		}
	},
	//FIXME: 只生效一次, 
	created () {
		this.$store.dispatch('getSongListDetail',this.$route.params.id)
	}
}
</script>

<style lang='stylus'>
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

	.song-list-detail
		.detail-header
			background url('./background.png')
			.top
				display flex
				align-items center
				height 48px
				.title
					flex 1
					text-align center
				.icon
					flex 0 0 24px
					padding 10px
			.detail-info
				display flex
				.img-ct
					flex 1
					position relative
					margin 10px 0 0 20px
					img 
						width 100%
					.count
						position absolute
						top 5px 
						right 5px
				.list-creator
					flex 2
					margin-left 20px
					padding-top 25px
					.creator-info
						display flex
						align-items center
						margin-top 20px
						img 
							width 30px
							border-radius 50%
						.nickname
							padding 5px
							font-size: $font-size-medium
							color $default-text
			.list-data
				display flex
				.icon-ct
					flex 1
					display flex
					align-items center
					flex-direction column
					padding 8px 0
					i 
						font-size 20px
		.detail-list
			.songs
				.song
					display flex
					.index
						flex 0 0 40px
						height 50px
						color $not-important
						flex-center()
					.info
						flex 1
						display flex
						flex-direction column
						justify-content center
						border-1px()
						.name
							song-name()
						.singer
							default-singer()


						
						



		
</style>
