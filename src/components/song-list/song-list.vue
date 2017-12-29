<template>
	<div class="song-list">
		<ul class="list">
			<li class="list-item" v-for="item in topList">
				{{item.name}}
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props:{
		topList: Array,

	}
}
</script>

<style lang="stylus">
	.song-list
		z-index: 90
</style>
