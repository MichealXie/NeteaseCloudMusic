<template>
	<div class="play-list">
		<div class="list-header">
			<i class="fa fa-arrow-left" aria-hidden="true" @click="togglePlayListShow"></i>
			<h2 class="title">歌单</h2>
		</div>
		<div class="creator" v-if="creator">
			<div class="creator-content">
				<div class="left-ct">
					<img class="list-img" :src="playlist.coverImgUrl">
				</div>
				<div class="right-ct">
					<div class="list-name">{{playlist.name}}</div>
					<img class="creator-img" :src="creator.avatarUrl">
					<div class="creator-name">{{creator.nickname}}</div>
				</div>
			</div>
			<div class="creator-info">
				<i class="fa fa-folder-o" aria-hidden="true"></i>
				<i class="fa fa-commenting-o" aria-hidden="true"></i>
				<i class="fa fa-share-alt" aria-hidden="true"></i>
				<i class="fa fa-download" aria-hidden="true"></i>
			</div>
		</div>
		<ul class="list">
			<li class="single-song" v-for="(item,index) in songs" :key="item.encodeId">
				<span class="index">{{index}}</span>
				<div class="song-info">
					<div class="main-info">
						<div class="song-name">{{item.name}}</div>
						<!-- 可加循环 -->
						<div class="singer-name">{{item.ar[0].name}}</div>
					</div>
					<div class="more">
						<i class="fa fa-ellipsis-v" aria-hidden="true"></i>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	computed: {
		playlist(){
			return this.$store.state.playlist
		},
		creator(){
			return this.$store.state.playlist.creator
		},
		songs(){
			return this.$store.state.playlist.tracks
		},
	},
	methods: {
		togglePlayListShow(){
			this.$store.commit('togglePlayListShow')
		}
	},
	mounted () {

	}
}
</script>

<style lang='stylus'>
  @import "../../common/stylus/variable"

	.play-list
		position absolute
		top 0
		left 0
		height 100vh
		width 100%
		z-index: 100
		background $list-background
		color black
		.list-header
			position: fixed
			height: 44px
			width 100%
			text-align: center
			color: white
			font-size: 0
			background-color $color-background
			z-index 10
			i,.title
				float left
				margin 1rem 0 0 .8rem
				font-size 1.3rem
		.creator
			margin-top 44px
			border-bottom 2px solid grey
			.creator-content
				display flex
				.left-ct
					flex: 1
					position relative
					width 25%
					padding 1rem
					.list-img
						width 100%
				.right-ct
					flex: 2		
					.list-name
						font-size: 18px
						margin 2.5rem 0 1rem 0
					.creator-img
						display inline-block
						border-radius 50%
						width 30px
					.creator-name
						display inline-block
						vertical-align 50%
			.creator-info
				display flex
				justify-content space-around
				padding-bottom 1rem
		.list
			.single-song
				display flex
				position relative
				.index
					flex 0 0 2rem
					padding-top 1rem
					text-align center
				.song-info
					flex 1
					display flex
					padding .3rem 0
					border-bottom: 1px solid lightgrey
					.main-info
						flex 1
						.song-name
							font-size: $font-size-medium-x
							padding .2rem 0
							width 100%
						.singer-name
							font-size: $font-size-small
							width 100%
							color: grey
					.more
						flex 0 0 3rem
						display flex
						justify-content center
						align-items center
						height 2rem		
						i 
							text-align center




				

				
</style>
