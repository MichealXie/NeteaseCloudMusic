<template>
	<div class="home">
		<home-header></home-header>
    <home-tab></home-tab>
		<transition name="fade">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>	
		</transition>
		<mini-player v-show="playType === 1"></mini-player>
		<mini-FM v-show="playType === 2"></mini-FM>		
	</div>
</template>

<script>
import homeHeader from '@/components/home-header/home-header'
import homeTab from '@/components/home-tab/home-tab'
import miniPlayer from '@/base/mini-player/mini-player'
import miniFM from '@/base/mini-FM/mini-FM'


export default {
	components: {
		'home-header': homeHeader,
		'home-tab': homeTab,
		'mini-player': miniPlayer,
		'mini-FM': miniFM		
	},
	computed: {
		playType(){
			return this.$store.state.playType
		}
	}
}
</script>

<style lang="stylus" scoped>
  .fade-enter-active, .fade-leave-active 
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>
