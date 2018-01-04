<template>
	<div class="home">
		<home-header></home-header>
    <home-tab></home-tab>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
import homeHeader from '@/components/home-header/home-header'
import homeTab from '@/components/home-tab/home-tab'

export default {
	components: {
		'home-header': homeHeader,
    'home-tab': homeTab,
	}
}
</script>

<style>

</style>
