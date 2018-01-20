<template>
	<div class="phone-login">
		<loading v-show="isLoading"></loading>
		<div class="header">
			<div class="back" @click="goback()"><i class="fa fa-arrow-left" aria-hidden="true"></i></div>
			<span class="title">手机号登录</span>
		</div>
		<input v-model="phoneNumber" class="phone" type="text" placeholder="请输入手机号">
		<input v-model="password" class="password" type="text" placeholder="请输入密码">
		<div class="login-btn" @click="login()">登录</div>
	</div>
</template>

<script>
import loading from '@/base/loading/loading'

export default {
	components:{
		loading,
	},
	data () {
		return {
			isLoading: false,
			phoneNumber: '',
			password: '',
		}
	},
	computed: {
		loginState(){
			return this.$store.state.userInfo.code
		}
	},
	methods: {
		goback(){
			this.$router.go(-1)
		},
		login(){
			this.isLoading = true
			let info = {
				account: this.phoneNumber,
				password: this.password
			}
			this.$store.dispatch('login', info)
		}
	},
	watch: {
		loginState(newV, oldV){
			if(newV === 200){
				this.$router.push('home/recommend')
			}
		}
	}
}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

	.phone-login
		position relative
		height 100vh
		.header
			color white
			font-size 18px
			height 48px
			display flex
			align-items center
			background-color $color-background
			.back
				flex 0 0 56px
				flex-center()
			.title
				flex 1
		.phone, .password
			position absolute
			middleX()
			border-1px()
			width 90%
			padding 5px 0
			outline none
		.phone
			top 10%
		.password
			top 20%
		.login-btn
			position absolute
			width 85%
			middleX()
			top 30%
			padding 10px 0
			text-align center 
			border-radius 32px
			color white
			background-color $color-background
</style>
