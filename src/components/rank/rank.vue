<template>
	<div class="rank">
		<loading v-show="!Object.keys(newSongRank).length">٩( ö̆ ) و</loading>
		<common-header class="common-header">精品歌单</common-header>
		<app-title>
			网易云官方榜
		</app-title>
		<div class="ranks" v-if="newSongRank.coverImgUrl">
			<router-link :to="'/song-details/' + newSongRank.id" class="new-song rank-item">
				<div class="img-ct">
					<img :src="newSongRank.coverImgUrl" alt="">
				</div>
				<div class="mini-rank">
					<li class="top3" v-for="(item, index) in newTop3" :key="item.id">
						{{index + 1}}.{{item.name}} - {{item.ar[0].name}}
					</li>
				</div>
			</router-link>
			<router-link :to="'/song-details/' + hotSongRank.id" class="hot-song rank-item">
				<div class="img-ct">
					<img :src="hotSongRank.coverImgUrl" alt="">
				</div>
				<div class="mini-rank">
					<li class="top3" v-for="(item, index) in hotTop3" :key="item.id">
						{{index + 1}}.{{item.name}} - {{item.ar[0].name}}
					</li>				
				</div>
			</router-link>
			<router-link :to="'/song-details/' + originalSongRank.id" class="original-song rank-item">
				<div class="img-ct">
					<img :src="originalSongRank.coverImgUrl" alt="">
				</div>
				<div class="mini-rank">
					<li class="top3" v-for="(item, index) in originalTop3" :key="item.id">
						{{index + 1}}.{{item.name}} - {{item.ar[0].name}}
					</li>				
				</div>
			</router-link>
			<router-link :to="'/song-details/' + rapidSongRank.id" class="rapid-song rank-item">
				<div class="img-ct">
					<img :src="rapidSongRank.coverImgUrl" alt="">
				</div>
				<div class="mini-rank">
					<li class="top3" v-for="(item, index) in rapidTop3" :key="item.id">
						{{index + 1}}.{{item.name}} - {{item.ar[0].name}}
					</li>				
				</div>
			</router-link>
		</div>
		<mini-player v-show="playType === 1"></mini-player>
		<mini-FM v-show="playType === 2"></mini-FM>
	</div>
</template>

<script>
import appTitle from '@/components/app-title/app-title'
import loading from '@/base/loading/loading'
import commonHeader from '@/base/common-header/common-header'
import miniPlayer from '@/base/mini-player/mini-player'
import miniFM from '@/base/mini-FM/mini-FM'
import {mapState, mapGetters} from 'vuex'

export default {
	components: {
		'app-title': appTitle,
		loading,
		'common-header': commonHeader,
		'mini-player': miniPlayer,
		'mini-FM': miniFM,
	},
	computed: {
		...mapState([
			'playType',
			'newSongRank',
			'hotSongRank',
			'originalSongRank',
			'rapidSongRank',
		]),
		...mapGetters([
			'newTop3',
			'hotTop3',
			'originalTop3',
			'rapidTop3',
		]),
	},
	created(){
		this.$store.dispatch('getRank')
	}
}
</script>

<style lang='stylus'>
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

	.rank
		padding-top 48px
		padding-bottom 48px
		background $list-background
		min-height calc(100vh - 88px)
		.common-header
			background-color $color-background
			color white
		.rank-item
			display flex
			width 100%
			margin-bottom 5px
			border-bottom 1px solid $light-border
			.img-ct
				flex 1
				font-size 0
				img 
					width 100%
			.mini-rank
				flex 2
				display flex
				flex-direction column
				justify-content space-around
				.top3
					default-font()



</style>
