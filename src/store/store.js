import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createLogger from 'vuex/dist/logger'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:1810'

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
		isLoading: true,
		type: '',
		searchResult:{},
		isSearching: false,
		albumSongs: [],
		albumInfo:{},
		isPlay: false,
		currentSong: '',
		currentSongIndex: 0,
		playingList: [],
		isPlayerShow: false,
		userInfo:{},
		userPlaylist: {}
	},
	getters: {
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
		},
		userID(state){
			if (state.userInfo.account) return state.userInfo.account.id
		}
	},
	mutations: {
		setSongListDetail(state, payload){
			state.songListDetail = payload
		},
		setIsLoading(state, payload){
			state.isLoading = payload
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
		},
		setCurrentSong(state, payload){
			state.currentSong = payload
		},
		setCurrentSongIndex(state, payload){
			state.currentSongIndex = payload
		},
		showPlayer(state){
			state.isPlayerShow = true
		},
		hidePlayer(state) {
			state.isPlayerShow = false
		},
		setPlayingList(state, payload){
			state.playingList = payload
		},
		togglePlay(state){
			state.isPlay = !state.isPlay
		},
		setIsPlay(state, payload){
			state.isPlay = payload
		},
		songIndexAddOne(state){
			state.currentSongIndex += 1
		},
		songIndexReduceOne(state) {
			state.currentSongIndex -= 1
		},
		setSearchSongs(state, payload){
			state.playingList = []
			for(let item of payload){
				state.playingList.push({
					name: item.name,
					id: item.id,
					al: {
						picUrl: item.album.artist.img1v1Url
					},
					ar: item.artists
				})
			}
		},
		setUserInfo(state, payload){
			state.userInfo = payload
		},
		setUserPlaylist(state, payload){
			state.userPlaylist = payload
		}
	},
	actions:{
		getBanners(context){
			axios.get('/banner')
				.then((data) => {
					context.state.banners = data.data.banners
				})
		},
		getTopLists(context){
			axios.get('/top/playlist?limit=6')
				.then((data) => {
					context.state.topLists = data.data.playlists
				})
		},
		getPrivateContent(context){
			axios.get('/personalized/privatecontent')
				.then((data) => {
					context.state.privateContent = data.data.result
				})
		},
		getRecommendMV(context){
			axios.get('/personalized/mv')
				.then((data) => {
					context.state.recommendMV = data.data.result
				})
		},
		getRecommendDJ(context){
			axios.get('/personalized/djprogram')
				.then((data) => {
					context.state.recommendDJ = data.data.result
				})
		},
		getLatestLists(context){
			context.state.songLists = []
			axios.get('/top/playlist?limit=20&order=new')
				.then((data) => {
					context.state.songLists = data.data.playlists
				})
		},
		getPopularLists(context){
			context.state.songLists = []
			axios.get('/top/playlist?limit=20&order=hot')
				.then((data) => {
					context.state.songLists = data.data.playlists
				})
		},
		getRecommendLists(context){
			context.state.songLists = []
			axios.get('/top/playlist/highquality')
				.then((data) => {
					context.state.songLists = data.data.playlists
				})
		},
		getRank(context){
			// 新歌榜
			axios.get('/top/list?idx=0')
				.then((data) => {
					context.state.newSongRank = data.data.playlist
				})
			// 热歌榜
			axios.get('/top/list?idx=1')
				.then((data) => {
					context.state.hotSongRank = data.data.playlist
				})
			// 原创榜
			axios.get('/top/list?idx=2')
				.then((data) => {
					context.state.originalSongRank = data.data.playlist
				})
			// 彪升榜
			axios.get('/top/list?idx=3')
				.then((data) => {
					context.state.rapidSongRank = data.data.playlist
				})
		},
		async getSongListDetail(context,payload){
			context.commit('setIsLoading', true)
			let data = await axios.get(`/playlist/detail?id=${payload}`)
			context.commit('setSongListDetail', data.data.playlist)
			context.commit('setIsLoading', false)			
		},
		async getSongSearch(context,payload){
			if (context.state.isSearching) return 
			context.state.isSearching = true
			let data = await axios.get(`/search?keywords=${payload.keywords}&type=${payload.type}`)
			context.state.isSearching = false
			payload.data = data
			context.commit('setSearch', payload)
		},
		async getAlbum(context, payload) {
			context.commit('clearAlbumSongs')
			context.commit('clearAlbumInfo')
			let data = await axios.get(`/album?id=${payload}`)
			context.commit('setAlbumSongs', data.data.songs)
			context.commit('setAlbumInfo', data.data.album)			
		},
		async getSongUrl(context, payload){
			let data = await axios.get(`/music/url?id=${payload}`)
			context.commit('setCurrentSong', data.data.data[0].url)
		},
		// 以下是个人资料
		async getMyInfo(context, payload){
			
		},
		async login(context){
			let data = await axios.get('/login/cellphone?phone=13288081126&password=1172161412')
			context.commit('setUserInfo', data.data)
		},
		async getUserPlaylist(context){
			let data = await axios.get(`/user/playlist?uid=${context.getters.userID}`)
			context.commit('setUserPlaylist', data.data.playlist)
		}
	},
	// plugins: [createLogger()]
})