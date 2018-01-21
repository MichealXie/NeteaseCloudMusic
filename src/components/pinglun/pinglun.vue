<template>
	<div class="comment">
		<loading v-show="isLoading"></loading>
		<comment-header></comment-header>
		<comment-info></comment-info>
		<ul class="hot" v-if="comments.hotComments.length">
			<comment-title>精彩评论</comment-title>
			<comment-content v-for="item in comments.hotComments" :item="item" :key="item.commentId"></comment-content>
		</ul>
		<ul class="all" v-if="comments">
			<comment-title>最新评论({{comments.total}})</comment-title>
			<comment-content v-for="item in comments.comments" :item="item" :key="item.commentId"></comment-content>
		</ul>
		</ul>
	</div>
</template>

<script>
import loading from '@/base/loading/loading'
import commentInfo from '@/base/comment-info/comment-info'
import commentHeader from '@/base/comment-header/comment-header'
import commentTitle from '@/base/comment-title/comment-title'
import commentContent from '@/base/comment-content/comment-content'

export default {
	components:{
		loading,
		'comment-info':commentInfo,
		'comment-header':commentHeader,		
		'comment-title': commentTitle,
		'comment-content': commentContent,
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

<style lang="stylus">

</style>
