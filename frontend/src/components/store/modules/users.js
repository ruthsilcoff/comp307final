import axios from 'axios'

const state = {
	users: [],
	specificUser: {},
	usersWithProfiles: [],
}

const getters = {
	allUsers: (state) => state.users,
	allUsersWithProfiles: (state) => state.usersWithProfiles,
}

const actions = {
	async getAllUsers({ commit }) {
		try {
			const response = await axios.get('/api/user/')
			commit('setUsers', response.data)
		} catch(error) {
			console.log("error", error)
		}
	},

	async getSpecificUser({ commit }, userID) {
		try {
			const response = await axios.get('/api/user/' + userID + '/')
			commit('setSpecificUser', response.data)
		} catch(error) {
			console.log("error", error)
		}
	},

	async getUserProfiles({ commit }) {
		const userProfileList = []
		for (let i= 0; i < this.users; i++) {
			try {
				const response = await axios.get('/api/profile/?user=' + this.users[i].id + "/")
				userProfileList[i] = this.users[i]
				userProfileList[i].isTeacher = response.data.isTeacher
				userProfileList[i].bio = response.data.bio
        userProfileList[i].country = response.data.country
        userProfileList[i].avatar = response.data.avatar

			} catch(error) {
				console.log("error", error)
			}
		}
		commit('setUsersWithProfiles', userProfileList)
	}
}

const mutations = {
	setUsers: (state, users) => (state.users = users),
	setSpecificUser: (state, user) => (state.specificUser = user),
	setUsersWithProfiles: (state, users) => (state.usersWithProfiles = users),
}

export default {
	state,
	getters,
	actions,
	mutations,

	methods: {

	},
}