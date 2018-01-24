import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createLogger from 'vuex/dist/logger'
import router from "../router/index.js"

axios.defaults.timeout = 30000
axios.defaults.baseURL = 'http://localhost:1810'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		isLogin: false,
		loginCode: 0,
		isLoading: false,
		isError: false,
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
		albumInfo:{},
		// 控制播放按钮/ 唱片转动
		isPlay: false,
		currentSong: '',
		currentSongIndex: 0,
		playingList: [],
		isPlayerShow: false,
		// 储存在 local 里的登录信息
		myInfo:{},
		myPlaylist: {},
		userProfile:{},
		userPlaylist: {},
		comments: {},
		currentCommentsId: null,
		// 0 单曲  1 顺序  2随机
		playMode: 1,
		lovedListId: 0,
		lovedSongs: [],
		currentListId: null,
		FM: null,
		// 1: 歌单模式, 2: FM 模式
		playType: 1,
	},
	getters: {
		partlyPrivate(state){
			if (state.privateContent) return state.privateContent.slice(1,3)
		},
		myId(state){
			if (state.myInfo.account) return state.myInfo.account.id
		}
	},
	mutations: {
		setIsLoading(state, payload){
			state.isLoading = payload
		},
		throwError(state, payload){
			state.isError = true
			setTimeout( () => {
				state.isError = false
			}, 2000)
		},
		setIsLogin(state, payload){
			state.isLogin = payload
		},
		setLoginCode(state, payload){
			state.loginCode = payload
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
			let player = document.getElementById('player')
			if (state.isPlay) player.pause()
			else player.play()
			state.isPlay = !state.isPlay
		},
		setIsPlay(state, payload){
			state.isPlay = payload
		},
		changeSongIndex(state){
			switch (state.playMode){
				case 0:
					break
				case 1:
					// 边界处理
					if (state.currentSongIndex === state.playingList.length -1) state.currentSongIndex = 0
					else state.currentSongIndex += 1
					break
				case 2:
					state.currentSongIndex = Math.round(Math.random() * state.playingList.length)
					break
			}
		},
		changePlayMode(state){
			if (state.playMode === 0) state.playMode = 1
			else if (state.playMode === 1) state.playMode = 2
			else if (state.playMode === 2) state.playMode = 0
		},
		songIndexReduceOne(state) {
			// 边界处理
			if (state.currentSongIndex === 0) state.currentSongIndex = state.playingList.length - 1
			else state.currentSongIndex -= 1
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
		setMyInfo(state, payload){
			state.myInfo = payload
		},
		setMyPlaylist(state, payload){
			state.myPlaylist = payload
		},
		setLovedListId(state, payload){
			state.lovedListId = payload
		},
		setSingleLoved(state, payload){
			let index
			if (payload.isLoved){
				index = state.lovedSongs.indexOf(payload.id)
				state.lovedSongs.splice(index, 1)
			}
			if (!payload.isLoved){
				state.lovedSongs.unshift(payload.id)
			}
		},
		setlovedSongs(state, payload){
			let ret = []
			for (let e of payload) {
				ret.push(e.id)
			}
			state.lovedSongs = ret
		},
		changelovedSongs(state, payload){
			let index = state.lovedSongs.indexOf(payload)
			state.lovedSongs.splice(index, 1)
		},
		setFM(state, payload){
			state.FM = payload
		},
		setPlayType(state, payload){
			state.playType = payload
		},
		setComments(state, payload){
			state.comments = payload
		},
		setCurrentCommentsId(state, id){
			state.currentCommentsId = id
		},
		setUserProfile(state, payload){
			state.userProfile = payload
		},
		setUserPlaylist(state, payload){
			state.userPlaylist = payload
		},
		setCurrentListId(state, id){
			state.currentListId = id
		}
	},
	actions:{
		async getRecommend(context){
			context.commit('setIsLoading', true)
			//获取推荐歌单
			await axios.get('/top/playlist?limit=6')
				.then((data) => {
					context.state.topLists = data.data.playlists
				})
			context.commit('setIsLoading', false)
			//获取独家放送
			axios.get('/personalized/privatecontent')
				.then((data) => {
					context.state.privateContent = data.data.result
				})
				//获取推荐 MV
			axios.get('/personalized/mv')
				.then((data) => {
					context.state.recommendMV = data.data.result
				})
			//获取推荐电台
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
		async getSongListDetail(context,id){
			// id 没改变就别发请求了
			if (context.state.currentListId === id) return
			else{
				context.commit('setIsLoading', true)
				let data = await axios.get(`/playlist/detail?id=${id}`)
				// 设置当前播放列表 ID
				context.commit('setCurrentListId', id)
				context.commit('setSongListDetail', data.data.playlist)
				context.commit('setIsLoading', false)		
			}
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
			if(data.data.code === 200 )context.commit('setCurrentSong', data.data.data[0].url)
			else{
				context.commit('throwError')
			}
			context.state.isPlay = true
		},
		async getFM(context){
			let time = new Date().valueOf()
			let data = await axios.get(`/personal_fm?date=${time}`)
			console.log(data)
			// 进入 FM 的时候发送请求, 发现未登录时直接去 login 界面
			if (data.data.code === 405) {
				context.commit('setIsLogin', false)
				router.push('/login')
			}
			// 获取到歌曲 url
			else if (data.data.code === 200){
				context.commit('setFM', data.data.data[0])
				// 获取歌曲的 mp3 文件
				let url = await axios.get(`/music/url?id=${context.state.FM.id}`)
				if (data.data.code === 200) {
					context.commit('setCurrentSong', url.data.data[0].url)
					context.commit('setPlayType', 2)					
					context.state.isPlay = true
				}
				// 获取不到 mp3 抛出错误
				else {
					context.commit('throwError')
				}
			}
		},
		// 以下是个人资料
		// 登陆后获取我的信息, 第一个列表 ID (我喜欢的音乐) => 获取该 ID 的歌曲
		async login(context, payload){
			let time = new Date().valueOf()
			context.commit('setIsLoading', true)
			let data = await axios.get(`/login/cellphone?phone=${payload.account}&password=${payload.password}&date=${time}`)
			context.commit('setLoginCode', data.data.code)
			context.commit('setIsLoading', false)
			console.log('登录码: ' + data.data.code)
			// 登录成功
			if (context.state.loginCode === 200){
				// 设置我的信息
				context.commit('setMyInfo', data.data)
				// 储存在 localStorage 里
				let info = JSON.stringify(payload)
				localStorage.myInfo = info
				context.commit('setIsLogin', true)
				// 假如是真的第一次...
				if (!Object.keys(context.state.myPlaylist).length){
					// 获取我的歌曲列表
					await context.dispatch('getMyPlaylist')
					// 获取喜欢的歌曲
					await context.dispatch('getLovedSongs', context.state.lovedListId)				
				}
			}
			else{
				router.push('/login')
			}
		},
		async getLovedSongs(context, payload){
			let data = await axios.get(`/playlist/detail?id=${payload}`)
			// 默认登录后正在播放的是我喜欢歌曲
			context.commit('setPlayingList', data.data.playlist.tracks)
			// 一个数组, 储存 id, 检测是否喜欢
			context.commit('setlovedSongs', data.data.privileges)
		},
		async getMyPlaylist(context){
			// 检查local 里有没有喜欢的歌曲
			let myPlaylist
			if (!localStorage.myPlaylist){
				console.log('获取我lovedListID')
				let data = await axios.get(`/user/playlist?uid=${context.getters.myId}`)
				myPlaylist = data.data.playlist
				// 获取成功 => 储存到 local
				if (data.data.code === 200) {
					myPlaylist = JSON.stringify(data.data.playlist)
					localStorage.myPlaylist = myPlaylist
				}
			}
			else{
				console.log('从 local 里拿myPlaylist')
				myPlaylist = JSON.parse(localStorage.myPlaylist)
			}
			context.commit('setMyPlaylist', myPlaylist)
			context.commit('setLovedListId', myPlaylist[0].id)
		},
		async getComments(context, payload){
			// 评论 id 一样的话, 就别发请求了
			if (payload.id === context.state.currentCommentsId) return
			else{
				context.commit('setIsLoading', true)
				let data = await axios.get(`/comment/${payload.type}?id=${payload.id}&limit=${payload.limit}`)
				context.commit('setComments', data.data)
				context.commit('setCurrentCommentsId', payload.id)
				setTimeout(() => {
					context.commit('setIsLoading', false)
				}, 0)
			}
		},
		async getUserProfile(context, id){
			context.commit('setIsLoading', true)
			let profile = await axios.get(`/user/detail?uid=${id}`)
			context.commit('setUserProfile', profile.data)
			let playlist = await axios.get(`/user/playlist?uid=${id}`)
			context.commit('setUserPlaylist', playlist.data.playlist)
			context.commit('setIsLoading', false)
		},
		async toggleLoved(context, payload){
			context.commit('changelovedSongs')
			// 增加日期防止 304....
			let date = new Date().valueOf()
			// 现在可以了! 但...我喜欢的音乐更新怎么办?
			let data = await axios.get(`/like?id=${payload.id}&like=${!payload.isLoved}&date="${date}"`, {withCredentials: true })
			// 成功即删除对应 ID 列表片段
			if (data.data.code === 200 ){
				context.commit('setSingleLoved', payload)
			}
		}
	},
	// plugins: [createLogger()]
})