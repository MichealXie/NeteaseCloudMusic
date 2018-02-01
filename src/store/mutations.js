export default{
	setIsLoading(state, payload) {
		state.isLoading = payload
	},
	throwError(state, payload) {
		state.isError = true
		setTimeout(() => {
			state.isError = false
		}, 2000)
	},
	setIsLogin(state, payload) {
		state.isLogin = payload
	},
	setLoginCode(state, payload) {
		state.loginCode = payload
	},
	setSongListDetail(state, payload) {
		state.songListDetail = payload
	},
	setSearch(state, payload) {
		state.searchResult[payload.name] = payload.data.data.result[payload.name]
	},
	clearAlbumSongs(state) {
		state.albumSongs = []
	},
	setAlbumSongs(state, payload) {
		state.albumSongs = payload
	},
	clearAlbumInfo(state) {
		state.albumInfo = {}
	},
	setAlbumInfo(state, payload) {
		state.albumInfo = payload
	},
	setCurrentSong(state, payload) {
		state.currentSong = payload
	},
	setCurrentSongIndex(state, payload) {
		state.currentSongIndex = payload
	},
	setPlayingList(state, payload) {
		state.playingList = payload
	},
	togglePlay(state) {
		let player = document.getElementById('player')
		if (state.isPlay) player.pause()
		else player.play()
		state.isPlay = !state.isPlay
	},
	setIsPlay(state, payload) {
		let player = document.getElementById('player')
		if (payload === false) player.pause()
		else if (payload === true) player.play()
		state.isPlay = payload
	},
	changeSongIndex(state) {
		switch (state.playMode) {
			case 0:
				break
			case 1:
				// 边界处理
				if (state.currentSongIndex === state.playingList.length - 1) state.currentSongIndex = 0
				else state.currentSongIndex += 1
				break
			case 2:
				state.currentSongIndex = Math.round(Math.random() * state.playingList.length)
				break
		}
	},
	changePlayMode(state) {
		if (state.playMode === 0) state.playMode = 1
		else if (state.playMode === 1) state.playMode = 2
		else if (state.playMode === 2) state.playMode = 0
	},
	songIndexReduceOne(state) {
		// 边界处理
		if (state.currentSongIndex === 0) state.currentSongIndex = state.playingList.length - 1
		else state.currentSongIndex -= 1
	},
	setSearchSongs(state, payload) {
		state.playingList = []
		for (let item of payload) {
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
	setMyInfo(state, payload) {
		state.myInfo = payload
	},
	setMyPlaylist(state, payload) {
		state.myPlaylist = payload
	},
	setLovedListId(state, payload) {
		state.lovedListId = payload
	},
	setSingleLoved(state, payload) {
		let index
		if (payload.isLoved) {
			index = state.lovedSongs.indexOf(payload.id)
			state.lovedSongs.splice(index, 1)
		}
		if (!payload.isLoved) {
			state.lovedSongs.unshift(payload.id)
		}
	},
	setlovedSongs(state, payload) {
		let ret = []
		for (let e of payload) {
			ret.push(e.id)
		}
		state.lovedSongs = ret
	},
	changelovedSongs(state, payload) {
		let index = state.lovedSongs.indexOf(payload)
		state.lovedSongs.splice(index, 1)
	},
	setFM(state, payload) {
		state.FM = payload
	},
	setPlayType(state, payload) {
		state.playType = payload
	},
	setComments(state, payload) {
		state.comments = payload
	},
	setCurrentCommentsId(state, id) {
		state.currentCommentsId = id
	},
	setUserProfile(state, payload) {
		state.userProfile = payload
	},
	setUserPlaylist(state, payload) {
		state.userPlaylist = payload
	},
	setCurrentListId(state, id) {
		state.currentListId = id
	},
	setDailyRecommend(state, payload) {
		state.dailyRecommend = payload
	}	
}