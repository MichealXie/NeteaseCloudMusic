<template>
	<div class="phone-login">
		<loading v-show="isLoading"></loading>
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
			if(this.loginCode === 502) return '密码不正确'
			else if( this.loginCode === 999 ) return '账号或密码未输入'
			else return '账号不存在'
		}
	},
	methods: {
		goback(){
			this.$router.go(-1)
		},
		login(){
			if(this.phoneNumber && this.password){
				this.$store.commit('setIsLoading', true)
				let info = {
					account: this.phoneNumber,
					password: this.password
				}
				this.$store.dispatch('login', info)
			}
			else{
				this.$store.commit('setLoginCode', 999)
			}
		}
	},
	watch: {
		loginCode(newV, oldV){
			if(newV === 200){
				this.$router.push('/home/recommend')
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
			middleX()
			flex-center()
			color $color-background
</style>
