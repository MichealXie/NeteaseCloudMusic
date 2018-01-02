<template>
	<div class="song-lists">
		<div class="lists-tab">
			<div class="latest" :class="{active: status === 'latest'}" @click="switchStatus('latest')">最新</div>
			<div class="popular" :class="{active: status === 'popular'}" @click="switchStatus('popular')">热门</div>
			<div class="recommend" :class="{active: status === 'recommend'}" @click="switchStatus('recommend')">精品</div>
		</div>
		<div class="duet-lists">
			<ul>
				<li class="item" v-for="item in imgs" :key="item.id">
					<div class="img-ct">
						<img class="img" :src="item.coverImgUrl">
						<div class="info">
							<i aria-hidden="true" class="fa fa-music"></i>
							<span class="count">{{item.playCount}}</span>
						</div>
					</div>
					<p class="name">{{item.name}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			status: 'latest'
		}
	},
	computed: {
		imgs(){
			return this.$store.state.songLists
		}
	},
	methods: {
		switchStatus(status){
			this.status = status
			switch (status){
				case 'latest':
					this.$store.dispatch('getLatestLists')
					break
				case 'popular':
					this.$store.dispatch('getPopularLists')
					break
				case 'recommend':
					this.$store.dispatch('getRecommendLists')
					break
			}
		}
	},
	created () {
		this.$store.dispatch('getLatestLists')
	}
}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

	.song-lists
		.lists-tab
			position fixed
			top 88px
			// 被迫 hack 居中
			right 50%
			transform translateX(50%)
			display flex
			justify-content space-around
			width 70%
			margin 10px 0
			border-radius 20px
			border 1px solid $color-background
			overflow hidden
			z-index 999
			background white
			&>*
				flex 1
				display flex
				justify-content center
				align-items center
				height 30px
				box-sizing border-box
				border-right: 1px solid $color-background
				&:last-child
					border none
			.active
				background $color-background
				color white
		.duet-lists
			padding-top 140px
			ul
				display flex
				flex-wrap wrap
				.item
					position relative
					width 50%
					box-sizing border-box
					font-size $font-size-small
					//奇怪的处理方法
					&:nth-child(odd)
						padding-right 2px
					&:nth-child(even)
						padding-left 2px
					.img-ct
						.img
							width 100%
						.info
							position absolute
							top .2rem
							right .3rem
							color white
					.name
						default-font()
						no-wrap()
</style>
