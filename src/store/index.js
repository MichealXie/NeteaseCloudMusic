import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createLogger from 'vuex/dist/logger'
import router from "../router/index.js"

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

axios.defaults.timeout = 30000
axios.defaults.baseURL = 'http://47.91.156.35:5500/'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	// plugins: [createLogger()]
})