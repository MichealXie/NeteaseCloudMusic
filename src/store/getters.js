export default {
	partlyPrivate(state) {
		if (state.privateContent) return state.privateContent.slice(1, 3)
	},
	myId(state) {
		if (state.myInfo.account) return state.myInfo.account.id
	},
	newTop3(state) {
		if (state.newSongRank.tracks) {
			return state.newSongRank.tracks.slice(0, 3)
		}
	},
	hotTop3(state) {
		if (state.hotSongRank.tracks) {
			return state.hotSongRank.tracks.slice(0, 3)
		}
	},
	originalTop3(state) {
		if (state.originalSongRank.tracks) {
			return state.originalSongRank.tracks.slice(0, 3)
		}
	},
	rapidTop3(state) {
		if (state.rapidSongRank.tracks) {
			return state.rapidSongRank.tracks.slice(0, 3)
		}
	}
}