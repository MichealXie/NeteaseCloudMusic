<template>
	<div class="home">
		<home-header></home-header>
    <home-tab></home-tab>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<mini-player></mini-player>
	</div>
</template>

<script>
import homeHeader from '@/components/home-header/home-header'
import homeTab from '@/components/home-tab/home-tab'
import miniPlayer from '@/base/mini-player/mini-player'

export default {
	components: {
		'home-header': homeHeader,
		'home-tab': homeTab,
		'mini-player': miniPlayer
	}
}
</script>

<style>

</style>
