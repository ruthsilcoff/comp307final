import Vuex from 'vuex'
import Vue from 'vue'
import users from './modules/users'

// load vuex
Vue.use(Vuex)

// create store
export default new Vuex.Store({
	modules: {
		users,
	}
})
