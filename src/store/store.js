import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		banners:[],
		topLists:[],
		playlist: {},
		privateContent: [],
		recommendMV: [],
		recommendDJ: [],
		songLists: [],
		newSongRank: {},
		hotSongRank: {},
		originalSongRank: {},
		rapidSongRank: {},
		songListDetail: {},
		type: '',
		searchResult:{},
		isSearching: false,
		albumSongs: [],
		albumInfo:{}
	},
	getters: {
		partlyList(state){
			if (state.topLists) return state.topLists.slice(0,6)
		},
		partlyPrivate(state){
			if (state.privateContent) return state.privateContent.slice(1,3)
		},
		partlyDJ(state){
			return state.recommendDJ.slice(0,6)
		},
		newTop3(state){
			if (state.newSongRank.tracks){
				return state.newSongRank.tracks.slice(0, 3)
			}
		},
		hotTop3(state) {
			if (state.hotSongRank.tracks){
				return state.hotSongRank.tracks.slice(0, 3)
			}
		},
		originalTop3(state) {
			if (state.originalSongRank.tracks){
				return state.originalSongRank.tracks.slice(0, 3)
			}
		},
		rapidTop3(state) {
			if (state.rapidSongRank.tracks){
				return state.rapidSongRank.tracks.slice(0, 3)
			}
		}
	},
	mutations: {
		clearSongListDetail(state){
			state.songListDetail = {}
		},
		setSongListDetail(state, payload){
			state.songListDetail = payload
		},
		setSearch(state, payload){
			state.searchResult[payload.name] = payload.data.data.result[payload.name]
		},
		clearAlbumSongs(state) {
			state.albumSongs = []
		},
		setAlbumSongs(state,payload){
			state.albumSongs = payload
		},
		clearAlbumInfo(state) {
			state.albumInfo = {}
		},
		setAlbumInfo(state, payload){
			state.albumInfo = payload
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
		},
		getRank(context){
			// 新歌榜
			axios.get('http://localhost:3000/top/list?idx=0')
				.then((data) => {
					context.state.newSongRank = data.data.playlist
				})
			// 热歌榜
			axios.get('http://localhost:3000/top/list?idx=1')
				.then((data) => {
					context.state.hotSongRank = data.data.playlist
				})
			// 原创榜
			axios.get('http://localhost:3000/top/list?idx=2')
				.then((data) => {
					context.state.originalSongRank = data.data.playlist
				})
			// 彪升榜
			axios.get('http://localhost:3000/top/list?idx=3')
				.then((data) => {
					context.state.rapidSongRank = data.data.playlist
				})
		},
		async getSongListDetail(context,payload){
			context.commit('clearSongListDetail')
			let data = await axios.get(`http://localhost:3000/playlist/detail?id=${payload}`)
			context.commit('setSongListDetail', data.data.playlist)
		},
		async getSongSearch(context,payload){
			if (context.state.isSearching) return 
			context.state.isSearching = true
			let data = await axios.get(`http://localhost:3000/search?keywords=${payload.keywords}&type=${payload.type}`)
			context.state.isSearching = false
			payload.data = data
			context.commit('setSearch', payload)
		},
		async getAlbum(context, payload) {
			context.commit('clearAlbumSongs')
			context.commit('clearAlbumInfo')
			let data = await axios.get(`http://localhost:3000/album?id=${payload}`)
			context.commit('setAlbumSongs', data.data.songs)
			context.commit('setAlbumInfo', data.data.album)			
		},
	},
	plugins: [createLogger()]
})