<template>
	<div class="common-header">
		<div class="icon" @click="goback()">
			<i class="fa fa-chevron-left" aria-hidden="true"></i>
		</div>
		<p class="title"><slot></slot></p>
		<div class="icon" @click="goPlayer()">
			<i aria-hidden="true" class="fa fa-headphones"></i>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		goback(){
			this.$router.go(-1)
		},
    goPlayer(){
      if(this.playType === 2) this.$router.push('/personal-fm')
      else this.$router.push('/player')
    },
	}
}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

	.common-header
		display flex
		align-items center
		height 48px
		width 100%
		background-color rgba(255, 255, 255, 0.1)
		background-size cover				
		position fixed
		top 0
		z-index 2
		.title
			flex 1
			text-align center
		.icon
			flex 0 0 58px
			flex-center()
			font-size 24px
</style>
