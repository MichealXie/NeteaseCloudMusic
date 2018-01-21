<template>
	<li class="item">
		<div class="top">
			<div class="avatar"><img :src="item.user.avatarUrl" alt=""></div>
			<div class="name">{{item.user.nickname}}</div>
			<div class="like">
				<span class="like-count">{{item.likedCount}}</span>
				<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
			</div>
		</div>
		<div class="bottom">
			<li class="word" v-for="word in comment">{{word}}</li>
		</div>
	</li>
</template>

<script>
export default {
	props: {
		item: Object
	},
	computed: {
		comment(){
			return this.item.content.split('\n')
		}
	}
}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

	.item
		display flex
		flex-direction column
		width 100%
		background-color $list-background
		.top
			display flex
			align-items center
			height 40px
			width 100%
			.avatar
				flex 0 0 48px
				flex-center()
				img 
					border-radius 50%
					width 30px
					height 30px
			.name
				flex 1
				padding 10px
				font-size 12px
				color $default-text
			.like
				padding-right 10px
				color $default-text
				.like-count
					font-size 12px
		.bottom
			width 100%
			padding 0px 10px 10px 58px
			font-size 13px
			border-1px()
			.word
				padding 3px 0
				line-height 1.2
				width calc(100% - 48px - 30px)

</style>
