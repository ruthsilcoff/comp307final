import Vuex from 'vuex'
import Vue from 'vue'
import users from './modules/users'
import status from './modules/status'
import chatmessages from './modules/chatmessages'

// load vuex
Vue.use(Vuex)

// create store
export default new Vuex.Store({
	modules: {
		users,
		status,
		chatmessages,
	}
})
