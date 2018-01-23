<template>
	<div class="loading">
		<img src="../../assets/waiting.gif" alt="">
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
		}, 30000)
	},
	deactivated () {
		console.log(this.timeOut)
		clearTimeout(this.timeOut)
	}
}
</script>

<style scoped lang='stylus'>
  @import "../../common/stylus/mixin"

	.loading
		position: fixed
		top: 50%
		left 50%
		transform translate(-50%,-100%)
		display flex
		justify-content space-around
		align-items center
		flex-direction column
		width 150px
		background rgba(17, 17, 17, 0.7)
		color white
		z-index 999
		img 
			width 100%
</style>
