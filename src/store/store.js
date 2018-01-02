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
		recommendMV: [],
		recommendDJ: [],
		songLists: []
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
		},
		partlyDJ(state){
			return state.recommendDJ.slice(0,6)
		}
	},
	mutations: {
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
			axios.get(`http://localhost:3000/playlist/detail?id=${context.state.listId}`)
				.then((data) => {
					console.log(data)
					context.state.playlist = data.data.playlist
				})
		},
		getPrivateContent(context){
			axios.get('http://localhost:3000/personalized/privatecontent')
				.then((data) => {
					console.log(data)
					context.state.privateContent = data.data.result
				})
		},
		getRecommendMV(context){
			axios.get('http://localhost:3000/personalized/mv')
				.then((data) => {
					context.state.recommendMV = data.data.result
				})
		},
		getRecommendDJ(context){
			axios.get('http://localhost:3000/personalized/djprogram')
				.then((data) => {
					context.state.recommendDJ = data.data.result
				})
		},
		getLatestLists(context){
			context.state.songLists = []
			axios.get('http://localhost:3000/top/playlist?limit=20&order=new')
				.then((data) => {
					context.state.songLists = data.data.playlists
				})
		},
		getPopularLists(context){
			context.state.songLists = []
			axios.get('http://localhost:3000/top/playlist?limit=20&order=hot')
				.then((data) => {
					context.state.songLists = data.data.playlists
				})
		},
		getRecommendLists(context){
			context.state.songLists = []
			axios.get('http://localhost:3000/top/playlist/highquality')
				.then((data) => {
					context.state.songLists = data.data.playlists
				})
		}
	},
	plugins: [createLogger()]
})