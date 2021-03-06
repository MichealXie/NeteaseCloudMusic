import axios from 'axios'
import router from "../router/index.js"

export default{
	async getRecommend(context) {
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
	getLatestLists(context) {
		context.state.songLists = []
		axios.get('/top/playlist?limit=20&order=new')
			.then((data) => {
				context.state.songLists = data.data.playlists
			})
	},
	getPopularLists(context) {
		context.state.songLists = []
		axios.get('/top/playlist?limit=20&order=hot')
			.then((data) => {
				context.state.songLists = data.data.playlists
			})
	},
	getRecommendLists(context) {
		context.state.songLists = []
		axios.get('/top/playlist/highquality')
			.then((data) => {
				context.state.songLists = data.data.playlists
			})
	},
	getRank(context) {
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
	async getSongListDetail(context, id) {
		// id 没改变就别发请求了
		if (context.state.currentListId === id) return
		else {
			context.commit('setIsLoading', true)
			let data = await axios.get(`/playlist/detail?id=${id}`)
			// 设置当前播放列表 ID
			context.commit('setCurrentListId', id)
			context.commit('setSongListDetail', data.data.playlist)
			context.commit('setIsLoading', false)
		}
	},
	async getSongSearch(context, payload) {
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
	async getSongUrl(context, payload) {
		context.commit('setCurrentSong', `http://music.163.com/song/media/outer/url?id=${payload}.mp3`)
		context.state.isPlay = true
	},
	async getFM(context) {
		let time = new Date().valueOf()
		let data = await axios.get(`/personal_fm?date=${time}`)
		// 进入 FM 的时候发送请求, 发现未登录时直接去 login 界面
		if (data.data.code === 405) {
			context.commit('setIsLogin', false)
			router.push('/login')
		}
		// 获取到歌曲 url
		else if (data.data.code === 200) {
			console.log(data)
			context.commit('setFM', data.data.data[0])
			// 获取歌曲的 mp3 文件
			context.commit('setCurrentSong', `http://music.163.com/song/media/outer/url?id=${context.state.FM.id}.mp3`)
			context.commit('setPlayType', 2)
			context.state.isPlay = true
		}
	},
	// 以下是个人资料
	// 登陆后获取我的信息, 第一个列表 ID (我喜欢的音乐) => 获取该 ID 的歌曲
	async login(context, payload) {
		let time = new Date().valueOf()
		context.commit('setIsLoading', true)
		let data = await axios.get(`/login/cellphone?phone=${payload.account}&password=${payload.password}&date=${time}`)
		context.commit('setLoginCode', data.data.code)
		context.commit('setIsLoading', false)
		console.log('登录码: ' + data.data.code)
		// 登录成功
		if (context.state.loginCode === 200) {
			// 设置我的信息
			context.commit('setMyInfo', data.data)
			// 储存在 localStorage 里
			let info = JSON.stringify(payload)
			localStorage.myInfo = info
			context.commit('setIsLogin', true)
			// 假如是真的第一次...
			if (!Object.keys(context.state.myPlaylist).length) {
				console.log('没有myPlaylist')
				// 获取我的歌曲列表
				await context.dispatch('getMyPlaylist')
				// 获取喜欢的歌曲
				await context.dispatch('getLovedSongs', context.state.lovedListId)
			}
		}
		else {
			router.push('/login')
		}
	},
	async getLovedSongs(context, payload) {
		if (!payload) return
		let data = await axios.get(`/playlist/detail?id=${payload}`)
		// 默认登录后正在播放的是我喜欢歌曲
		if (data.data.code === 200) {
			context.commit('setPlayingList', data.data.playlist.tracks)
			// 一个数组, 储存 id, 检测是否喜欢
			context.commit('setlovedSongs', data.data.privileges)
		}
		else context.commit('throwError')
	},
	async getMyPlaylist(context) {
		// 检查local 里有没有喜欢的歌曲
		let myPlaylist
		if (!localStorage.myPlaylist) {
			let data = await axios.get(`/user/playlist?uid=${context.getters.myId}`)
			myPlaylist = data.data.playlist
			// 获取成功 => 储存到 local
			if (data.data.code === 200) {
				// 把我的歌单储存在local 里~
				myPlaylist = JSON.stringify(data.data.playlist)
				localStorage.myPlaylist = myPlaylist
				myPlaylist = JSON.parse(localStorage.myPlaylist)
			}
		}
		else {
			console.log('从 local 里拿myPlaylist')
			myPlaylist = JSON.parse(localStorage.myPlaylist)
		}
		context.commit('setMyPlaylist', myPlaylist)
		context.commit('setLovedListId', myPlaylist[0].id)
	},
	async getComments(context, payload) {
		// 评论 id 一样的话, 就别发请求了
		if (payload.id === context.state.currentCommentsId) return
		// 预设加载1个评论时, 就别 loading 了
		else if (payload.limit === 1) {
			let data = await axios.get(`/comment/${payload.type}?id=${payload.id}&limit=${payload.limit}`)
			context.commit('setComments', data.data)
			context.commit('setCurrentCommentsId', payload.id)
		}
		else {
			context.commit('setIsLoading', true)
			let data = await axios.get(`/comment/${payload.type}?id=${payload.id}&limit=${payload.limit}`)
			context.commit('setIsLoading', false)
			context.commit('setComments', data.data)
			context.commit('setCurrentCommentsId', payload.id)
		}
	},
	async getUserProfile(context, id) {
		context.commit('setIsLoading', true)
		let profile = await axios.get(`/user/detail?uid=${id}`)
		context.commit('setUserProfile', profile.data)
		let playlist = await axios.get(`/user/playlist?uid=${id}`)
		context.commit('setUserPlaylist', playlist.data.playlist)
		context.commit('setIsLoading', false)
	},
	async toggleLoved(context, payload) {
		context.commit('changelovedSongs')
		// 增加日期防止 304....
		let date = new Date().valueOf()
		// 现在可以了! 但...我喜欢的音乐更新怎么办?
		let data = await axios.get(`/like?id=${payload.id}&like=${!payload.isLoved}&date="${date}"`)
		// 成功即删除对应 ID 列表片段
		if (data.data.code === 200) {
			context.commit('setSingleLoved', payload)
		}
		else context.commit('throwError')
	},
	async getDailyRecommend(context) {
		let data = await axios.get(`/recommend/songs`)
		console.log(data)
		if (data.data.code === 200) {
			context.commit('setDailyRecommend', data.data.recommend)
		}
		else context.commit('throwError')
	}
}