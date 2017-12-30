<template>
	<div class="top-lists">
		<div class="list-header">
			<i class="fa fa-arrow-left" aria-hidden="true" @click="toggleTopList()"></i>
			 <h2 class="title">歌单</h2>
		</div>
		<ul class="list">
			<li class="list-item" v-for="item in topList" :key="item.key" @click="showPlayList()" >
				<img :src="item.coverImgUrl">
				<span class="count">
					<i class="fa fa-music" aria-hidden="true"></i>
					{{ item.playCount }}</span>
				<div class="name">{{item.name}}</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	computed: {
		topLists(){
			return this.$store.state.topLists
		}
	},
	methods: {
		showPlayList(){
			this.$store.commit('togglePlayListShow')
		},
		toggleTopList(){
			this.$store.commit('toggleTopListShow')
		}
	}
}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

	.top-lists
		position absolute
		top 0
		left 0
		height 100vh
		width 100%
		z-index: 90
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
		.list
			display flex
			flex-wrap wrap
			.list-item
				position relative
				width 50%
				box-sizing border-box
				&:nth-child(odd)
					padding-right 2px
				img 
					width 100%
				.count
					position absolute
					right .3rem
					top .2rem
					font-size 10px
					color white

</style>
