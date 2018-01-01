import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		banners:[],
		topLists:[],
		isTopListsShow: false,
		isPlayListShow: false,
		listId: '',
		playlist: {},
		privateContent: [],
		recommendMV: []
	},
	getters: {
		partlyList(state){
			return state.topLists.slice(0,6)
		},
		partlyPrivate(state){
			return state.privateContent.slice(1,3)
		},
		privateAd(state){
			return state.privateContent[0]
		}
	},
	mutations: {
		toggleTopListsShow(state){
			state.isTopListsShow = !state.isTopListsShow
		},
		togglePlayListShow(state, id){
			state.listId = id
			state.isPlayListShow = !state.isPlayListShow
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
		getTopLists(context){
			axios.get('http://localhost:3000/top/playlist')
				.then((data) => {
					console.log(data.data)
					context.state.topLists = data.data.playlists
				})
		},
		getPlayList(context){
			context.state.playlist = {}
			axios.get(`http://localhost:3000/playlist/detail?id=${context.state.listId}`)
				.then((data) => {
					console.log(data)
					context.state.playlist = data.data.playlist
				})
		},
		getPrivateContent(context){
			context.state.playlist = {}
			axios.get('http://localhost:3000/personalized/privatecontent')
				.then((data) => {
					console.log(data)
					context.state.privateContent = data.data.result
				})
		},
		getRecommendMV(context){
			context.state.playlist = {}
			axios.get('http://localhost:3000/personalized/mv')
				.then((data) => {
					context.state.recommendMV = data.data.result
				})
		}
	},
	plugins: [createLogger()]
})