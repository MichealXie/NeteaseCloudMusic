import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		banners:[],
		topList:[],
	},
	getters: {
		partlyList(state){
			console.log(state)
			return state.topList.slice(0,6)
		}
	},
	actions:{
		getBanners(context){
			axios.get('http://localhost:3000/banner')
				.then((data) => {
					console.log(data)
					context.state.banners = data.data.banners
				})
		},
		getTopList(context){
			axios.get(' https://easy-mock.com/mock/5a464f96f0010a43ffbe743e/cloudmusic/top/playlist')
				.then((data) => {
					console.log(data.data)
					context.state.topList = data.data.playlists
				})
		}
	},
	plugins: [createLogger()]
})