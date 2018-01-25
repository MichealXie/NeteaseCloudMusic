<template>
	<div class="phone-login">
		<loading v-show="isLoading">(/ω＼)害羞</loading>
		<div class="header">
			<div class="back" @click="goback()"><i class="fa fa-arrow-left" aria-hidden="true"></i></div>
			<span class="title">手机号登录</span>
		</div>
		<input v-model="phoneNumber" class="phone" type="text" placeholder="请输入手机号" required="required" @keypress.enter="login()">
		<input v-model="password" class="password" type="password" placeholder="请输入密码" required="required" @keypress.enter="login()">
		<div class="login-btn" @click="login()">登录</div>
		<div class="error" v-if="(loginCode !== 0) & (loginCode !== 200)">{{errorInfo}}</div>
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
			phoneNumber: '',
			password: '',
		}
	},
	computed: {
		isLoading(){
			return this.$store.state.isLoading
		},
		loginCode(){
			return this.$store.state.loginCode
		},
		errorInfo(){
			let msg = ''
			let regExp = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g
			switch (true){
				case (!regExp.test(this.phoneNumber)):
					msg = '这位同志, 请严肃的对待你的手机号码'
					break 
				case (this.password.length < 6):
					msg = '这位同志, 请严肃的对待你的密码'
					break
				case (this.loginCode === 502):
					msg = '同志, 这个密码不对'
					break
				default:
					msg = '同志, 账号不存在, 莫非你还未注册'
			}
			return msg
		}
	},
	methods: {
		goback(){
			this.$router.go(-1)
		},
		login(){
			if(this.phoneNumber && this.password){
				let info = {
					account: this.phoneNumber,
					password: this.password
				}
				this.$store.dispatch('login', info)
			}
			else{
				this.$store.commit('setLoginCode', '密码或账号未填入')
			}
		}
	},
	activated () {
		// 重置登录状态码, 否则退出登录后再登录状态码会失效, 无法推送路由
		this.$store.commit('setLoginCode', 0)
	},
	watch: {
		loginCode(newV, oldV){
			if(newV === 200){
				this.$router.push('/home')
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
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
			height 30px
			font-size 20px
		.phone
			top 15%
		.password
			top 25%
		.login-btn
			position absolute
			width 85%
			middleX()
			top 35%
			padding 10px 0
			text-align center 
			border-radius 32px
			color white
			background-color $color-background
		.error
			position absolute
			top 10%
			width 80%
			middleX()
			flex-center()
			color $color-background
</style>
