<template>
	<div class="loading">
		<i class="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
		<p class="word"><slot></slot></p>
	</div>
</template>

<script>
export default {
	data () {
		return {
			timeOut: null
		}
	},
	activated () {
		this.timeOut = setTimeout( () => {
			this.$store.commit('setIsLoading', false)
			this.$store.commit('throwError')
		}, 30000)
	},
	deactivated () {
		clearTimeout(this.timeOut)
	}
}
</script>

<style scoped lang='stylus'>
  @import "../../common/stylus/mixin"

	.loading
		position: fixed
		top: 35%
		middleX()
		display flex
		justify-content space-around
		align-items center
		flex-direction column
		width 100px
		height 150px
		border-radius 8px
		padding 10px
		background rgba(17, 17, 17, 0.7)
		color white
		z-index 999

</style>
