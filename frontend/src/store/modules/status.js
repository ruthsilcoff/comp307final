import axios from "axios"

const state = {
  loggedIn: false,
  snackbar: false,
  snackbarMessage: '',
  snackbarColor: '',
  snackbarMode: '',
  tab: 0,
  leftDrawer: false,
  rightDrawer: false,
  tempLeft: false,
  tempRight: false,
}

const getters = {
  initialTabNumber: (state) => state.tab,
  getSnackbar: (state) => (state.snackbar),
  getSnackbarMessage: (state) => (state.snackbarMessage),
  getSnackbarColor: (state) => (state.snackbarColor),
  getSnackbarMode: (state) => (state.snackbarMode),
  loggedIn: (state) => state.loggedIn,
  loggedInSnackBar: (state) => state.loggedInSnackBar,
  leftDrawerGetter: (state) => (state.leftDrawer),
  rightDrawerGetter: (state) => (state.rightDrawer),
  tempLeftGetter: (state) => (state.tempLeft),
  tempRightGetter: (state) => (state.tempRight),
}

const actions = {
  changeLeftDrawer({commit}, bool) {
    commit('setLeftDrawer', bool)
  },

  changeRightDrawer({commit}, bool) {
    commit('setRightDrawer', bool)
  },

  changeTempLeft({commit}, bool) {
    commit('setTempLeft', bool)
  },

  changeTempRight({commit}, bool) {
    commit('setTempRight', bool)
  },

  setTabNumber({commit}, num) {
    commit('setTab', num)
  },

  createSnackbar({commit}, {message, color}) {
    commit('setSnackBar', true)
    commit('setSnackBarMessage', message)
    commit('setSnackBarColor', color)
  },

  removeSnackbar({commit}) {
    commit('setSnackBar', false)
  },

  setLoggedInSnackBar({commit}, bool) {
    commit('setLogInSnackBar', bool)
  },

  async login({commit, dispatch}, {username, password}) {
    try {
      const response = await axios.post('/api-token-auth/', {username, password})
      localStorage.setItem('token', response.data.token)
    }catch(error) {
      console.log(error.response.data)
      throw error
    }

  },

  logOut({commit}) {
    localStorage.removeItem('token')
    localStorage.removeItem('theme')
    localStorage.removeItem('viewMode')
    commit('setLoggedIn', false)
  },

  async yesLoggedIn({commit, dispatch}) {
    commit('setLoggedIn', true)
    await dispatch('getAllUsers') // before messages and chats and avails
    await dispatch('getMyChatsAndAllMessages')
    await dispatch('getAllTutoringSessions') // before avails
    await dispatch('getAllAvailabilities')
    await dispatch('getAllSubjects')
    await dispatch('getAllTeacherSubjects') // after getAllSubjects
    await dispatch('getAllNoteSets')
    await dispatch('getAllReviews')
  },

  notLoggedIn({commit}) {
    commit('setLoggedIn', false)
  },
}

const mutations = {
  setLeftDrawer: (state, bool) => (state.leftDrawer = bool),
  setRightDrawer: (state, bool) => (state.rightDrawer = bool),
  setTempLeft: (state, bool) => (state.tempLeft = bool),
  setTempRight: (state, bool) => (state.tempRight = bool),
  setTab: (state, tab) => state.tab = tab,
  setLoggedIn: (state, loggedIn) => { state.loggedIn = loggedIn },
  setLogInSnackBar: (state, bool) => (state.loggedInSnackBar = bool),
  setSnackBar: (state, bool) => state.snackbar = bool,
  setSnackBarMessage: (state, message) => state.snackbarMessage = message,
  setSnackBarColor: (state, color) => state.snackbarColor = color,
  setSnackBarMode: (state, mode) => state.snackbarMode = mode,
}

export default {
  state,
  getters,
  actions,
  mutations,
  methods: {},
}