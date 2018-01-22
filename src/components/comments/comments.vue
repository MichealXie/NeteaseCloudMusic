<template>
	<div class="comment">
		<loading v-show="isLoading"></loading>
		<ul class="hot" v-if="comments">
			<comment-title>精彩评论</comment-title>
			<li class="item" v-for="item in comments.hotComments">
				<div class="avatar"><img v-lazy="item.user.avatarUrl" alt=""></div>
				<div class="info">
					<div class="name">{{item.user.nickname}}</div>
					<div class="content">{{item.content}}</div>
				</div>
			</li>
		</ul>
		<ul class="all" v-if="comments">
			<comment-title>最新评论({{comments.total}})</comment-title>
			<li class="item" v-for="item in comments.comments">{{item.user.nickname}}{{item.content}}</li>
		</ul>
	</div>
</template>

<script>
import loading from '@/base/loading/loading'
import commentTitle from '@/base/comment-title/comment-title'

export default {
	components:{
		loading,
		'comment-title': commentTitle
	},
	computed: {
		isLoading(){
			return this.$store.state.isLoading
		},
		comments(){
			return this.$store.state.comments
		}	
	},
	activated () {

		let payload = {
			type: this.$route.params.type,
			id: this.$route.params.id
		}
		this.$store.dispatch('getComments', payload)
	}
}
</script>

<style lang="stylus" scoped>

</style>
