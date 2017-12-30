<template>
	<div class="play-list">
		<div class="list-header">
			<i class="fa fa-arrow-left" aria-hidden="true" @click="togglePlayListShow"></i>
			<h2 class="title">歌单</h2>
		</div>
		<ul class="list">
			<li class="single-song" v-for="item in list"></li>
		</ul>
	</div>
</template>

<script>
export default {
	data () {
		return {
			list: []
		}
	},
	methods: {
		togglePlayListShow(){
			this.$store.commit('togglePlayListShow')
		}
	},
	mounted () {
		console.log(this.id)
		this.$http.get(`http://localhost:3000/playlist/detail?id=${this.id}`)
		.then( (data) => {
			console.log(data)
			this.list = data
		})
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
