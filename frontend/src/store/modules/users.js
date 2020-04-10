import axios from 'axios'

const state = {
  users: [],
  selfID: null,
  viewingID: null,
  messageDialog: false,
  chats: [],
  messages: [],
  tutoringSessions: [],
  availabilities: [],
  requests: [],
  subjects: [],
  teacherSubjects: [],
  lessonSubjects: [],
  noteSetSubjects: [],
  noteSets: [],
  reviews: [],
  openChatIDs: [],
  personInputForMessage: null,
}

const getters = {
  personInputForMessageGetter: (state) => state.personInputForMessage,
  allCourses: (state) => state.subjects,
  teachersOneSubject: (state) => (name) => state.teacherSubjects.filter(thing => thing.subject.name === name).map(thing => thing.teacher),
  lessonsOneSubject: (state) => (name) => state.lessonSubjects.filter(thing => thing.subject.name === name).map(thing => thing.avail),
  noteSetsOneSubject: (state) => (name) => state.noteSetSubjects.filter(thing => thing.subject.name === name).map(thing => thing.noteSet),

  openChatIDGetter: (state) => state.openChatIDs,

  reviewsGetter: (state) => state.reviews,
  reviewsOneTeacher: (state) => (id) => state.reviews.filter(review => review.teacherID === id),
  reviewOneTeacherOneUser: (state) => (id) => state.reviews.find(rev => rev.reviewerID === state.selfID && rev.teacherID === id),

  noteSetsGetter: (state) => state.noteSets,
  oneNoteSet: (state) => (id) => state.noteSets.find(set => set.id === id),
  noteSetsOneTeacher: (state) => (id) => state.noteSets.filter(set => set.userID === id),

  subjectsGetter: (state) => state.subjects,
  subjectsOneTeacher: (state) => (id) => state.teacherSubjects.filter(thing => thing.teacherID === id),

  requestsGetter: (state) => state.requests,
  confirmedRequestsGetter: (state) => state.requests.filter(req => req.isConfirmed),

  availabilitiesGetter: (state) => state.availabilities,
  availabilitiesOneTeacher: (state) => (id) => state.availabilities.filter(avail => avail.userID === id),

  tutoringSessionsGetter: (state) => state.tutoringSessions,
  sessionsOneStudent: (state) => (id) => state.tutoringSessions.filter(session => session.learnerID === id && session.isConfirmed),
  sessionsOneStudentRequest: (state) => (id) => state.tutoringSessions.filter(session => session.learnerID === id && !session.isConfirmed),

  newMessageDialog: (state) => state.messageDialog,
  myChatsGetter: (state) => state.chats.filter(chat => chat.owner === state.selfID),
  allMessagesGetter: (state) => state.messages,

  allUsers: (state) => state.users,
  allTeachers: (state) => state.users.filter(user => user.profile.isTeacher),
  myID: (state) => state.selfID,
  viewingID: (state) => state.viewingID,
  isViewing: (state) => state.selfID !== state.viewingID,

  myUser: (state) => state.users.find(user => user.id === state.selfID),
  viewingUser: (state) => state.users.find(user => user.id === state.viewingID),
}

const actions = {
  setPersonToMessage({commit}, {user}) {
    this.commit('setMessagingPerson', user)
  },

  setOpenChatID({commit}, {id, bool}) {
    this.commit('setOpenChat', {id, bool})
  },

  async getAllReviews({commit}) {
    try {
      const response = await axios.get('/api/review/')
      let revs = response.data

      for (let i = 0; i < revs.length; i++) {
        revs[i].author = state.users.find(user => user.id === revs[i].reviewerID)
      }

      commit('setReviews', revs)
    }catch(error) {
      console.log(error)
      throw error
    }
  },

  async newReview({commit}, {rating, review, teacherID}) {
    try {
      const response = await axios.post('/api/review/', {rating, review, teacherID})
      let rev = response.data
      rev.author = state.users.find(user => user.id === rev.reviewerID)
      commit('addReview', rev)

    }catch(error) {
      console.log(error)
      throw error
    }
  },

  async getAllNoteSets({commit}) {
    try {
      const response = await axios.get('/api/noteSet/')
      let noteSets = response.data
      const response2 = await axios.get('/api/noteSetContent/')
      let noteSetContentFiles = response2.data

      for (let i = 0; i < noteSets.length; i++) {
        noteSets[i].author = state.users.find(user => user.id === noteSets[i].userID)
        noteSets[i].content = noteSetContentFiles.filter(file => file.noteSetID === noteSets[i].id)
      }
      commit('setAllNoteSets', noteSets)
    }catch(error) {
      console.log(error.response.data)
      throw error
    }
  },

  async newNoteSet({commit}, {title, description, files}) {
    try {
      const response = await axios.post('/api/noteSet/', {title, description})
      let newNoteSet = response.data
      let contentFiles = []
      for (let i = 0; i < files.length; i++) {
        console.log(files[i])
        let fileData = new FormData()
        fileData.append('content', files[i])
        fileData.append('noteSetID', newNoteSet.id)
        const response2 = await axios.post('/api/noteSetContent/', fileData, {
        headers: {'Content-Type': 'multipart/form-data'}
        })
        contentFiles.push(response2.data)
      }
      newNoteSet.content = contentFiles
      commit('addNoteSet', newNoteSet)
    }catch(error){
        console.log(error.response.data);
        throw error
    }
  },

  async getAllSubjects({commit}) {
    try {
      const response = await axios.get('/api/subject/')
      commit('setAllSubjects', response.data)
    }catch(error) {
      console.log(error)
      throw error
    }
  },

  async addNewSubject({commit}, {name}) {
    try {
      const response = await axios.post('/api/subject/', {name})
      commit('newSubject', response.data)
    }catch(error) {
      console.log(error)
      throw error
    }
  },

  async addTeacherSubject({commit}, {name}) {
    try {
      const response = await axios.post('/api/teachesSubjects/', {subject: name, teacherID: state.selfID})
      let teacherSubject = response.data
      teacherSubject.subject = state.subjects.find(subject => subject.name === teacherSubject.subject)
      teacherSubject.teacher = state.users.find(user => user.id === teacherSubject.teacherID)
      commit('newTeacherSubject', teacherSubject)
    }catch(error) {
      console.log(error.response.data)
      throw error
    }
  },

  async removeTeacherSubject({commit}, {name}) {
    try {
      let id = state.teacherSubjects.find(thing => (thing.subject === name) && (thing.teacherID === state.selfID))
      const response = await axios.delete(`/api/teachesSubjects/${id}/`)
      commit('removeTeachesSubject', response.data)
    }catch(error) {
      console.log(error.response.data)
      throw error
    }
  },

  async getAllTeacherSubjects({commit}) {
    try {
      const response = await axios.get('/api/teachesSubjects/')
      let things = response.data
      if (things.length > 0) {
        for (let i = 0; i < things.length; i++) {
          things[i].subject = state.subjects.find(subject => subject.name === things[i].subject)
          things[i].teacher = state.users.find(user => user.id === things[i].teacherID)
        }
      }
      commit('setAllTeachesSubjects', things)
    }catch(error) {
      console.log(error.response.data)
      throw error
    }
  },

  async addLessonSubject({commit}, {name, availID}) {
    try {
      const response = await axios.post('/api/lessonSubjects/', {subject: name, availID: availID})
      let lessonSubject = response.data
      lessonSubject.subject = state.subjects.find(subject => subject.name === lessonSubject.subject.name)
      lessonSubject.lesson = state.availabilities.find(user => user.id === lessonSubject.availID)
      commit('newLessonSubject', lessonSubject)
    }catch(error) {
      console.log(error.response.data)
      throw error
    }
  },

  async getAllLessonSubjects({commit}) {
    try {
      const response = await axios.get('/api/lessonSubjects/')
      let things = response.data
      if (things.length > 0) {
        for (let i = 0; i < things.length; i++) {
          things[i].subject = state.subjects.find(subject => subject.name === things[i].subject)
          things[i].lesson = state.availabilities.find(avail => avail.id === things[i].availID)
        }
      }
      commit('setAllLessonSubjects', things)
    }catch(error) {
      console.log(error.response.data)
      throw error
    }
  },

  async bookLesson({commit}, {availabilityID, tutorID}) {
    try {
      const response = await axios.post('/api/tutoringSession/', {availabilityID: availabilityID, tutorID: tutorID})
      commit('addTutoringSession', response.data)
      commit('setPending', availabilityID)
    }catch(error) {
      console.log(error)
      throw error
    }
  },

  async addStudent({commit}, {id}) {
    try {
      const response = await axios.get(`/api/availability/${id}/`)
      let avail = response.data
      let students = avail.studentsTaking
      students = students + 1
      let full = (students >= avail.classSize)
      const response2 = await axios.patch(`/api/availability/${id}/`, {studentsTaking:students, isFull: full})
      avail = response2.data
      commit('setAvails', avail)
    }catch(error) {
      console.log(error)
      throw error
    }
  },

  async closeLesson({commit}, {id}) {
    try {
      const response = await axios.get(`/api/availability/${id}/`)
      let avail = response.data
      let classCap = avail.classSize
      let students = avail.studentsTaking
      classCap = students
      const response2 = await axios.patch(`/api/availability/${id}/`, {classSize: classCap, isFull: true})
      avail = response2.data
      commit('setAvails', avail)
    }catch(error) {
      console.log(error)
      throw error
    }
  },

  async confirmLesson({commit}, {tutoringSessionID, bool}) {
    try {
      if (!bool) {
        const response = await axios.delete(`/api/tutoringSession/${tutoringSessionID}/`)
        commit('removeTutoringSession', response.data)
      }
      if (bool) {
        const response = await axios.patch(`/api/tutoringSession/${tutoringSessionID}/`, {isConfirmed: true})
        commit('confirmLessonTrue', response.data)
      }
    }catch(error) {
      console.log(error)
      throw error
    }
  },

  async newAvail({commit}, {titleInput, inputStart, inputEnd, classSize}) {
    try {
        const response = await axios.post('/api/availability/', {title:titleInput, start:inputStart, end:inputEnd, classSize})

        let newEvent = response.data

        commit('addNewAvail', newEvent)
      }catch(error) {
        console.error(error.response.data);
        throw error
      }
  },

  async getAllAvailabilities({commit}) {
    try {
      const response = await axios.get('/api/availability/')
      let avails = response.data

      let currentUser = await state.users.find(user => user.id === state.selfID)
      if ((avails.length > 0) && (!currentUser.profile.isTeacher)) {
        for (let i= 0; i < avails.length; i++) {
          avails[i].teacher = await state.users.find(user => user.id === avails[i].userID)
          let session = state.tutoringSessions.find(session =>
            (session.availabilityID === avails[i].id) &&
            (session.learnerID === state.selfID)
          )
          if (session) {
            if (!session.isConfirmed) {
              avails[i].booked = 'pending'
            }
            else {
              avails[i].booked = 'confirmed'
            }
          }
          else {
          avails[i].booked = 'none'
          }
        }
      }
      commit('setAvails', avails)
    }catch(error) {
      console.log(error)
      throw error
    }
  },

  async getAllTutoringSessions({commit}) {
    try {
      const response = await axios.get('/api/tutoringSession/')
      let currentUser = await state.users.find(user => user.id === state.selfID)

      const response2 = await axios.get('/api/availability/')
      let avails = response2.data

      if (currentUser.profile.isTeacher) {
          let requests = response.data.filter(session => session.tutorID === state.selfID)
          if (requests) {
            for (let i = 0; i < requests.length; i++) {
              requests[i].student = state.users.find(student => student.id === requests[i].learnerID)
              requests[i].avail = avails.find(avail => avail.id === requests[i].availabilityID)
              requests[i].tutor = state.users.find(tutor => tutor.id === requests[i].tutorID)
            }
            commit('setRequests', requests)
            commit('setTutoringSessions', requests)
          }
      }
      else {
          let requests = response.data.filter(session => session.learnerID === state.selfID)
          if (requests) {
            for (let i = 0; i < requests.length; i++) {
              requests[i].student = state.users.find(student => student.id === requests[i].learnerID)
              requests[i].avail = avails.find(avail => avail.id === requests[i].availabilityID)
              requests[i].tutor = state.users.find(tutor => tutor.id === requests[i].tutorID)
            }
            commit('setTutoringSessions', requests)
          }
      }
    }catch(error) {
      console.log(error)
      throw error
    }
  },

   async getMyChatsAndAllMessages({commit}) {
    try {
      const response = await axios.get('/api/dm/')
      let messages = response.data


      for (let m = 0; m < messages.length; m++) {
        let convertedDate = new Date(messages[m].dateSent)
        messages[m].dateSent = convertedDate

        messages[m].author = state.users.find(user => user.id === messages[m].author)
      }

      const response2 = await axios.get('/api/chat/')
      let chats = response2.data
      for (let i = 0; i < chats.length; i++) {
        chats[i].otherUser = state.users.find(user => user.id === chats[i].otherUser)
      }

      commit('setMessages', response.data)
      commit('setChats', chats)

    } catch (error) {
      console.log(error)
    }
  },

  async sendNewMessage({commit}, {to, content}) {
    try {
      const chats = await axios.get('/api/chat/')
      const response = await axios.post('/api/dm/', {sentTo: to, content})

      let message = response.data
      message.author = state.users.find(user => user.id === message.author)
      message.dateSent = new Date(message.dateSent)
      // check if there's a chat for it, otherwise create two of them
      if (chats.data.length > 0) {
        let chat1 = chats.data.find(chat => chat.owner === state.selfID && chat.otherUser === to)
        let chat2 = chats.data.find(chat => chat.otherUser === state.selfID && chat.owner === to)
        if (!chat1) {
          const newChat1 = await axios.post('/api/chat/', {owner: state.selfID, otherUser: to})
          newChat1.otherUser = state.users.find(user => user.id === newChat1.otherUser)
          commit('newChat', newChat1.data)
          const newChat2 = await axios.post('/api/chat/', {owner: to, otherUser: state.selfID})
          newChat2.otherUser = state.users.find(user => user.id === newChat2.otherUser)
          commit('newChat', newChat2.data)
        }
      }
      else {
        const otherNewChat1 = await axios.post('/api/chat/', {owner: state.selfID, otherUser: to})
        otherNewChat1.otherUser = state.users.find(user => user.id === otherNewChat1.otherUser)
        commit('newChat', otherNewChat1)
        const otherNewChat2 = await axios.post('/api/chat/', {owner: to, otherUser: state.selfID})
        otherNewChat2.otherUser = state.users.find(user => user.id === otherNewChat2.otherUser)
        commit('newChat', otherNewChat2)
      }
      commit('newMessage', message)
    } catch (error) {
      console.log(error)
      throw error
    }
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

	async getAllUsers({commit}) {
    const userResponse = await axios.get('/api/user/')
    let users = userResponse.data
    const profileResponse = await axios.get('/api/profile/')
    let profiles = profileResponse.data
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
      const response = await axios.post('/api/user/', {first_name, last_name, username, password, email})
      console.log('created account!')
      console.log(response.data)
      commit('setSelfUser', response.data.id)
      await axios.post('/api/profile/', {user: response.data.id, isTeacher: isTeacher})
      console.log("created profile!")
      //await dispatch('login({username: this.usernameInput, password: this.passwordInput})')
    } catch(error) {
      console.log(error.response.data)
      throw error
    }
  },

	async updateProfile({commit}, {bio, country, rate}) {
    try {
      const response = await axios.patch('/api/profile/' + state.selfID + "/", {bio: bio, country: country, rate: rate})
      commit('updateUserProfile', response.data)
    } catch (error) {
      console.log(error.response.data)
      throw error
    }
  },

  async updateAvail({commit}, {id, title, classSize, start, end}) {
    try {
      const response = await axios.patch(`/api/availability/${id}/`, {title: title, classSize: classSize, start: start, end: end})
      commit('setAvails', response.data)
    } catch (error) {
      console.log(error.response.data)
      throw error
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
    commit('resetOpenChats')
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

  removeTeachesSubject: (state, thing) => {
    let index = state.teacherSubjects.indexOf(state.teacherSubjects.find(t => t.id === thing.id))
    state.teacherSubjects.splice(index, 1)
  },

  addNewAvail: (state, newEvent) => state.availabilities.unshift(newEvent),

  setReviews: (state, revs) => state.reviews = revs,
  addReview: (state, newRev) => state.reviews.push(newRev),

  setAllNoteSets: (state, sets) => state.noteSets = sets,
  addNoteSet: (state, newSet) => state.noteSets.push(newSet),

  setAllSubjects: (state, subjects) => state.subjects = subjects,
  newSubject: (state, newSubject) => state.subjects.push(newSubject),
  setAllTeachesSubjects: (state, subjects) => state.teacherSubjects = subjects,
  setAllLessonSubjects: (state, subjects) => state.lessonSubjects = subjects,
  newTeacherSubject: (state, newSubject) => state.teacherSubjects.push(newSubject),
  newLessonSubject: (state, newSubject) => state.lessonSubjects.push(newSubject),

  setPending: (state, id) => {
    let index = state.availabilities.indexOf(state.availabilities.find(avail => avail.id === id))
    state.availabilities[index].booked = 'pending'
  },

  removeTutoringSession: (state, session) => {
    let index = state.tutoringSessions.indexOf(state.tutoringSessions.find(sesh => sesh.id === session.id))
    state.tutoringSessions.splice(index, 1)
  },
  confirmLessonTrue: (state, session) => {
    let index = state.tutoringSessions.indexOf(state.tutoringSessions.find(sesh => sesh.id === session.id))
    state.tutoringSessions[index].isConfirmed = true

    let index2 = state.availabilities.indexOf(state.availabilities.find(avail => avail.id === session.availabilityID))
    state.availabilities[index2].booked = 'confirmed'
  },

  addTutoringSession: (state, session) => state.tutoringSessions.push(session),
  setTutoringSessions: (state, sessions) => state.tutoringSessions = sessions,
  setAvails: (state, avails) => state.availabilities = avails,
  setRequests: (state, requests) => state.requests = requests,

	changeMessageDialog: (state, bool) => state.messageDialog = bool,
  setUsers: (state, users) => { state.users = users },
  setViewingUser: (state, userID) => { state.viewingID = userID },
	setSelfUser: (state, userID) => { state.selfID = userID },
	updateUserProfile: (state, newProfile) => {
    let user = state.users.find(user => user.id === newProfile.user)
    user.profile = newProfile
  },
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
