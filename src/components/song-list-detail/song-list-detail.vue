<template>
	<div class="song-list-detail">
		<div class="detail-header">
			<i class="fa fa-chevron-left" aria-hidden="true"></i>
			<p class="title">歌单</p>
			<i aria-hidden="true" class="fa fa-headphones"></i>
		</div>
		<div class="detail-info">
			<div class="img-ct">
				<img :src="songListDetail.creator.backgroundUrl">
				<span class="count">{{songListDetail.playCount}}</span>
			</div>
			<div class="list-creator">
				<img :src="songListDetail.creator.avatarUrl" alt="">
				<div class="list-name">
					{{songListDetail.name}}
				</div>
				<div class="creator-name">
					{{songListDetail.nickname}}
				</div>
			</div>
		</div>
		<div class="detail-list">
			<ul class="songs">
				<li class="song" v-for="(item, index) in songListDetail.tracks" :key="item.id">
					<span class="index">{{index}}</span>
					<div class="song-name">{{item.name}}</div>
					<div class="singer">{{item.ar[0].name}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

export default {
	computed: {
		songListDetail(){
			return this.$store.state.songListDetail
		}
	},
	mounted () {
		this.$store.dispatch('getSongListDetail',this.$route.params.id)
	}
}
</script>

<style lang='stylus'>

</style>
