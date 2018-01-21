<template>
	<div class="title">
		<slot></slot>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
	.title
		height 24px
		font-size 12px
		color #555
		padding 0 10px
		background-color #e6e9e8
		display flex
		align-items center
</style>
