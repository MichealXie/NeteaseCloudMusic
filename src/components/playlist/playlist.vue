<template>
	<div class="play-list">
		<div class="list-header">
			<i class="fa fa-arrow-left" aria-hidden="true" @click="togglePlayListShow"></i>
			<h2 class="title">歌单</h2>
		</div>
		<ul class="list">
			这里是歌曲页
			<li class="single-song" v-for="(item,index) in songs" :key="item.encodeId">
				<span class="index">{{index}}</span>
				{{item.name}} + {{item.ar[0].name}}
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	computed: {
		creator(){
			return this.$store.state.playlist.creator
		},
		songs(){
			return this.$store.state.playlist.tracks
		}
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
		background grey
		color black
		.list-header
			position: relative
			height: 44px
			text-align: center
			color: white
			font-size: 0
			background-color $color-background
			i,.title
				float left
				margin 1rem 0 0 .8rem
				font-size 1.3rem
</style>
