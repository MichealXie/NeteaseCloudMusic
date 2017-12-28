<template>
	<div class="recommend">
		<div class="recommend-content">
			<div class="slider-wrapper">
				<slider>
					<div v-for="item in recommendList">
						<a>
							<img :src="item.pic">
						</a>
					</div>
				</slider>
			</div>
		</div>
	</div>
</template>

<script>
import slider from '@/base/slider/slider'

export default {
	components: {
		slider,
	},
	data () {
		return {
			recommendList: {},

		}
	},
	created () {
		this.$http.get('http://localhost:3000/banner')
		.then( (data) => {
			console.log(data)
			this.recommendList = data.data.banners
		})
	}
}
</script>

<style lang='stylus'>

</style>
