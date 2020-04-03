import axios from 'axios'

const state = {
	users: [],
  selfID: null,
  viewingID: null,
  messageDialog: false,
  chats: [],
  messages: [],
}

const getters = {
	newMessageDialog: (state) => state.messageDialog,
  allChats: (state) => state.chats,
  allMessages: (state) => state.messages,

  allUsers: (state) => state.users,
  myID: (state) => state.selfID,
  viewingID: (state) => state.viewingID,
  isViewing: (state) => state.selfID !== state.viewingID,

  myUser: (state) => state.users.find(user => user.id === state.selfID),
  viewingUser: (state) => state.users.find(user => user.id === state.viewingID),
}

const actions = {
	async getAllChats({commit}) {
    try {
      const response = await axios.get('/api/chat/')
      commit('setChats', response.data)
    }catch(error) {
      console.log(error.response.data)
    }
  },
  async getAllMessages({commit}) {
    try {
      const response = await axios.get('/api/dm/')
      commit('setMessages', response.data)
    }catch(error) {
      console.log(error.response.data)
    }
  },

  async sendNewMessage({commit}, {to, content}) {
    try {
      const chats = await axios.get('/api/chat/').data
      const response = await axios.post('/api/dm/', {sentTo: to, content})
      commit('newMessage', response.data)

      // check if there's a chat for it, otherwise create two of them
      let chat = chats.find(chat =>
        (chat.owner === response.data.author && chat.otherUser === response.data.sentTo))
      if (!chat) {
        const chat1 = await axios.post('/api/chat/', {owner: state.selfID, otherUser: to})
        commit('newChat', chat1.data)
        const chat2 = await axios.post('/api/chat/', {owner: to, otherUser: state.selfID})
        commit('newChat', chat2.data)
      }
    }catch(error) {
      console.log(error.response.data)
    }
  },


  //opens new message forum box when send new message
  setMessageDialog({commit}, bool) {
    try {
      commit('changeMessageDialog', bool)
    }catch(error) {
      console.log(error.response.data)
    }
  },

	async getAllUsers({commit}) {
    const userResponse = await axios.get('/api/user/')
    const users = userResponse.data
    const profileResposne = await axios.get('/api/profile/')
    const profiles = profileResposne.data
    users.forEach(user => {
      const profile = profiles.find(profile => profile.user === user.id)
      if (!profile) {
        throw `error: profile not found for user ${user.id}`
      }
      user.profile = profile
    })
    commit('setUsers', users)
  },

  setViewingUser({commit}, userID) {
    commit('setViewingUser', userID)
  },

  setMyUser({commit}, id) {
    commit('setSelfUser', id)
  },

	async addUser({commit, dispatch}, {first_name, last_name, username, password, email, isTeacher}) {
    try {
      const response = await axios.post('/api/user/', {first_name, last_name, username, password, email, isTeacher})
      console.log('created account!')
      console.log(response.data)
      commit('setSelfUser', response.data.id)
      await axios.post('/api/profile/', {user: response.data.id})
      console.log("created profile!")
      //await dispatch('login({username: this.usernameInput, password: this.passwordInput})')
    } catch(error) {
      console.log(error.response.data)
    }
  },

	async updateProfile({commit}, {bio, country, avatar}) {
    try {
      const response = await axios.patch('/api/profile/' + state.selfID + "/", {bio: bio, country: country, avatar:avatar})
      console.log(response.data)
      commit('updateUserProfile', response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  },

	async updateAvatar({commit}, {avatar}) {
    try {
      const data = new FormData()
      data.append('avatar', avatar)
      const response = await axios.patch('/api/profile/' + state.selfID + "/", data, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
      console.log(response.data)
      commit('updateUserProfile', response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  },

  async resetValuesOnLogOut({commit}) {
    commit('setSelfUser', null)
    commit('setViewingUser', null)
  },
}

const mutations = {
	changeMessageDialog: (state, bool) => state.messageDialog = bool,
  setUsers: (state, users) => { state.users = users },
  setViewingUser: (state, userID) => { state.viewingID = userID },
	setSelfUser: (state, userID) => { state.selfID = userID },
	updateUserProfile: (state, newProfile) => {
    const user = state.users.find(user => user.id = newProfile.user)
    user.profile = newProfile
  },
  setChats: (state, chats) => state.chats = chats,
  setMessages: (state, messages) => state.chats = messages,
  newChat: (state, chat) => state.chats.push(chat),
  newMessage: (state, message) => state.messages.push(message),
}

export default {
	state,
	getters,
	actions,
	mutations,

	methods: {

	},
}