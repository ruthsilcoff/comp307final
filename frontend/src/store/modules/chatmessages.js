import axios from 'axios'

const state = {
  messageDialog: false,
  chats: [],
  messages: [],
  openChatIDs: [],
  personInputForMessage: null,
}

const getters = {
  personInputForMessageGetter: (state) => state.personInputForMessage,
  openChatIDGetter: (state) => state.openChatIDs,
  newMessageDialog: (state) => state.messageDialog,
  chatGetter: (state) => state.chats,
  allMessagesGetter: (state) => state.messages,
}

const actions = {
  setPersonToMessage({commit}, {user}) {
    this.commit('setMessagingPerson', user)
  },

  setOpenChatID({commit}, {id, bool}) {
    this.commit('setOpenChat', {id, bool})
  },

   async getMyChatsAndAllMessages({commit, rootState}) {
    try {
      const response = await axios.get('/api/dm/')
      let messages = response.data


      for (let m = 0; m < messages.length; m++) {
        let convertedDate = new Date(messages[m].dateSent)
        messages[m].dateSent = convertedDate

        messages[m].author = rootState.users.users.find(user => user.id === messages[m].author)
      }

      const response2 = await axios.get('/api/chat/')
      let chats = response2.data
      for (let i = 0; i < chats.length; i++) {
        chats[i].otherUser = rootState.users.users.find(user => user.id === chats[i].otherUser)
      }
      console.log(messages)
      console.log(chats)
      commit('setMessages', messages)
      commit('setChats', chats)

    } catch (error) {
      console.log(error)
    }
  },

  async sendNewMessage({commit, rootState}, {to, content}) {
    try {
      const chats = await axios.get('/api/chat/')
      const response = await axios.post('/api/dm/', {sentTo: to, content})

      let message = response.data
      message.author = rootState.users.users.find(user => user.id === message.author)
      message.dateSent = new Date(message.dateSent)
      // check if there's a chat for it, otherwise create two of them
      if (chats.data.length > 0) {
        let chat1 = chats.data.find(chat => chat.owner === rootState.users.selfID && chat.otherUser === to)
        let chat2 = chats.data.find(chat => chat.otherUser === rootState.users.selfID && chat.owner === to)
        if (!chat1) {
          const newChat1 = await axios.post('/api/chat/', {owner: rootState.users.selfID, otherUser: to})
          newChat1.otherUser = rootState.users.users.find(user => user.id === newChat1.otherUser)
          commit('newChat', newChat1.data)
          const newChat2 = await axios.post('/api/chat/', {owner: to, otherUser: rootState.users.selfID})
          newChat2.otherUser = rootState.users.users.find(user => user.id === newChat2.otherUser)
          commit('newChat', newChat2.data)
        }
      }
      else {
        const otherNewChat1 = await axios.post('/api/chat/', {owner: rootState.users.selfID, otherUser: to})
        otherNewChat1.otherUser = rootState.users.users.find(user => user.id === otherNewChat1.otherUser)
        commit('newChat', otherNewChat1)
        const otherNewChat2 = await axios.post('/api/chat/', {owner: to, otherUser: rootState.users.selfID})
        otherNewChat2.otherUser = rootState.users.users.find(user => user.id === otherNewChat2.otherUser)
        commit('newChat', otherNewChat2)
      }
      commit('newMessage', message)
    } catch (error) {
      console.log(error)
      throw error
    }
  },

   async pushNewMessage({commit, rootState}, message) {
    message.author = rootState.users.users.find(user => user.id === message.author)
    message.dateSent = new Date(message.dateSent)
    commit('newMessage', message)
  },

  async updateMessageSeen({commit}, {id}) {
    try {
      await axios.patch(`/api/dm/${id}/`, {seen: true})
      this.commit('updateMessageToSeen', id)
    }catch(error) {
      this.console.log(error.response.data)
      throw error
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
}

const mutations = {
  resetOpenChats: (state) => state.openChatIDs = [],
  setMessagingPerson: (state, person) => state.personInputForMessage = person,
  updateMessageToSeen: (state, id) => {
    let index= state.messages.indexOf(state.messages.find(msg => msg.id === id))
    state.messages[index].seen = true
  },
  setOpenChat:(state, {id, bool}) => {
    if (bool) {
      state.openChatIDs.push(id)
    }
    else {
      let index = state.openChatIDs.indexOf(state.openChatIDs.find(thing => thing === id))
      state.openChatIDs.splice(index, 1)
    }
  },
  changeMessageDialog: (state, bool) => state.messageDialog = bool,
  setChats: (state, chats) => state.chats = chats,
  setMessages: (state, messages) => state.messages = messages,
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