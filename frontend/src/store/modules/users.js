import axios from 'axios'

const state = {
  users: [],
  selfID: null,
  viewingID: null,
  tutoringSessions: [],
  availabilities: [],
  requests: [],
  subjects: [],
  teacherSubjects: [],
  noteSetSubjects: [],
  lessonSubjects: [],
  noteSets: [],
  reviews: [],
  personInputForMessage: null,
}

const getters = {
  allCourses: (state) => state.subjects,
  teachersOneSubject: (state) => (name) => state.teacherSubjects.filter(thing => thing.subject.name === name).map(thing => thing.teacher),
  noteSetsOneSubject: (state) => (name) => state.noteSetSubjects.filter(thing => thing.subject.name === name).map(thing => thing.noteSet),
  lessonsOneSubject: (state) => (name) => state.lessonSubjects.filter(thing => thing.subject.name === name).map(thing => thing.avail),

  reviewsGetter: (state) => state.reviews,
  reviewsOneTeacher: (state) => (id) => state.reviews.filter(review => review.teacherID === id),
  reviewOneTeacherOneUser: (state) => (id) => state.reviews.find(rev => rev.reviewerID === state.selfID && rev.teacherID === id),

  noteSetsGetter: (state) => state.noteSets,
  oneNoteSet: (state) => (id) => state.noteSets.find(set => set.id === id),
  noteSetsOneTeacher: (state) => (id) => state.noteSets.filter(set => set.userID === id),

  subjectsGetter: (state) => state.subjects,
  subjectsOneTeacher: (state) => (id) => state.teacherSubjects.filter(thing => thing.teacherID === id),
  subjectsOneNoteSet: (state) => (id) => state.noteSetSubjects.filter(thing => thing.noteSetID === id),

  requestsGetter: (state) => state.requests,
  confirmedRequestsGetter: (state) => state.requests.filter(req => req.isConfirmed),

  availabilitiesGetter: (state) => state.availabilities,
  availabilitiesOneTeacher: (state) => (id) => state.availabilities.filter(avail => avail.userID === id),

  tutoringSessionsGetter: (state) => state.tutoringSessions,
  sessionsOneStudent: (state) => (id) => state.tutoringSessions.filter(session => session.learnerID === id && session.isConfirmed),
  sessionsOneStudentRequest: (state) => (id) => state.tutoringSessions.filter(session => session.learnerID === id && !session.isConfirmed),

  allUsers: (state) => state.users,
  allTeachers: (state) => state.users.filter(user => user.profile.isTeacher),
  myID: (state) => state.selfID,
  viewingID: (state) => state.viewingID,
  isViewing: (state) => state.selfID !== state.viewingID,
  myUser: (state) => state.users.find(user => user.id === state.selfID),
  viewingUser: (state) => state.users.find(user => user.id === state.viewingID),
}

const actions = {
  async getAllReviews({commit}) {
    try {
      const response = await axios.get('/api/review/')
      let revs = response.data

      for (let i = 0; i < revs.length; i++) {
        revs[i].author = state.users.find(user => user.id === revs[i].reviewerID)
      }

      commit('setReviews', revs)
    } catch (error) {
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

    } catch (error) {
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
    } catch (error) {
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
      return newNoteSet
    } catch (error) {
      console.log(error.response.data)
      throw error
    }
  },

  async addNoteSetContent({commit}, {id, files}) {
    try {
      let editedNoteSet = state.noteSets.find(set => set.id === id)
      let contentFiles = editedNoteSet.content
      for (let i = 0; i < files.length; i++) {
        console.log(files[i])
        let fileData = new FormData()
        fileData.append('content', files[i])
        fileData.append('noteSetID', editedNoteSet.id)
        const response2 = await axios.post('/api/noteSetContent/', fileData, {
          headers: {'Content-Type': 'multipart/form-data'}
        })
        contentFiles.push(response2.data)
      }
      editedNoteSet.content = contentFiles
      commit('editNoteSet', editedNoteSet)
    } catch (error) {
      console.log(error.response.data)
      throw error
    }
  },

  async deleteNote({commit}, {id}) {
    try {
      const response = await axios.delete(`/api/noteSet/${id}/`)
      console.log(response)
      commit('removeNote', response.data)
    } catch (error) {
      console.log(error.response.data)
      throw error
    }
  },

  async getAllSubjects({commit}) {
    try {
      const response = await axios.get('/api/subject/')
      commit('setAllSubjects', response.data)
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  async addNewSubject({commit}, {name}) {
    try {
      const response = await axios.post('/api/subject/', {name})
      commit('newSubject', response.data)
    } catch (error) {
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
    } catch (error) {
      console.log(error.response.data)
      throw error
    }
  },

  async removeTeacherSubject({commit}, {name}) {
    try {
      const toDelete = state.teacherSubjects.find(thing => (thing.subject.name === name) && (thing.teacherID === state.selfID))
      const response = await axios.delete(`/api/teachesSubjects/${toDelete.id}/`)
      commit('removeTeachesSubject', response.data)
    } catch (error) {
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
    } catch (error) {
      console.log(error.response.data)
      throw error
    }
  },

  async addNoteSetSubject({commit}, {name, id}) {
    try {
      const response = await axios.post('/api/noteSetSubjects/', {subject: name, noteSetID: id})
      let thing = response.data
      thing.subject = state.subjects.find(subject => subject.name === thing.subject)
      thing.noteSet = state.noteSets.find(set => set.id === thing.noteSetID)
      commit('newNoteSetSubject', thing)
    } catch (error) {
      console.log(error.response.data)
      throw error
    }
  },

  async removeNoteSetSubject({commit}, {name, id}) {
    try {
      const toDelete = state.noteSetSubjects.find(thing => (thing.subject.name === name) && (thing.noteSetID === id))
      const response = await axios.delete(`/api/noteSetSubjects/${toDelete.id}/`)
      commit('removeNoteSetSubject', response.data)
    } catch (error) {
      console.log(error.response.data)
      throw error
    }
  },

  async getAllNoteSetSubjects({commit}) {
    try {
      const response = await axios.get('/api/noteSetSubjects/')
      let things = response.data
      if (things.length > 0) {
        for (let i = 0; i < things.length; i++) {
          things[i].subject = state.subjects.find(subject => subject.name === things[i].subject)
          things[i].noteSet = state.noteSets.find(set => set.id === things[i].noteSetID)
        }
      }
      commit('setAllNoteSetSubjects', things)
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      console.log(error.response.data)
      throw error
    }
  },

  async bookLesson({commit}, {availabilityID, tutorID}) {
    try {
      const response = await axios.post('/api/tutoringSession/', {
        availabilityID: availabilityID,
        tutorID: tutorID
      })
      commit('addTutoringSession', response.data)
      commit('setPending', availabilityID)
    } catch (error) {
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
      const response2 = await axios.patch(`/api/availability/${id}/`, {studentsTaking: students, isFull: full})
      avail = response2.data
      commit('setAvails', avail)
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  async newAvail({commit}, {titleInput, inputStart, inputEnd, classSize}) {
    try {
      const response = await axios.post('/api/availability/', {
        title: titleInput,
        start: inputStart,
        end: inputEnd,
        classSize
      })

      let newEvent = response.data

      commit('addNewAvail', newEvent)
    } catch (error) {
      console.error(error.response.data)
      throw error
    }
  },

  async getAllAvailabilities({commit}) {
    try {
      const response = await axios.get('/api/availability/')
      let avails = response.data

      let currentUser = await state.users.find(user => user.id === state.selfID)
      if ((avails.length > 0) && (!currentUser.profile.isTeacher)) {
        for (let i = 0; i < avails.length; i++) {
          avails[i].teacher = await state.users.find(user => user.id === avails[i].userID)
          let session = state.tutoringSessions.find(session =>
            (session.availabilityID === avails[i].id) &&
            (session.learnerID === state.selfID)
          )
          if (session) {
            if (!session.isConfirmed) {
              avails[i].booked = 'pending'
            } else {
              avails[i].booked = 'confirmed'
            }
          } else {
            avails[i].booked = 'none'
          }
        }
      }
      commit('setAvails', avails)
    } catch (error) {
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
      } else {
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
    } catch (error) {
      console.log(error)
      throw error
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
    } catch (error) {
      console.log(error.response.data)
      throw error
    }
  },

  async updateProfile({commit}, {bio, country, rate}) {
    try {
      const response = await axios.patch('/api/profile/' + state.selfID + "/", {
        bio: bio,
        country: country,
        rate: rate
      })
      commit('updateUserProfile', response.data)
    } catch (error) {
      console.log(error.response.data)
      throw error
    }
  },

  async updateAvail({commit}, {id, title, classSize, start, end}) {
    try {
      const response = await axios.patch(`/api/availability/${id}/`, {
        title: title,
        classSize: classSize,
        start: start,
        end: end
      })
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
  removeTeachesSubject: (state, thing) => {
    let index = state.teacherSubjects.indexOf(state.teacherSubjects.find(t => t.id === thing.id))
    state.teacherSubjects.splice(index, 1)
  },
  removeNoteSetSubject: (state, thing) => {
    let index = state.noteSetSubjects.indexOf(state.noteSetSubjects.find(t => t.id === thing.id))
    state.noteSetSubjects.splice(index, 1)
  },

  removeNote: (state, note) => {
    let index = state.noteSets.indexOf(state.noteSets.find(n => n.id === note.id))
    state.noteSets.splice(index, 1)
  },

  addNewAvail: (state, newEvent) => state.availabilities.unshift(newEvent),

  setReviews: (state, revs) => state.reviews = revs,
  addReview: (state, newRev) => state.reviews.push(newRev),

  setAllNoteSets: (state, sets) => state.noteSets = sets,
  addNoteSet: (state, newSet) => state.noteSets.push(newSet),

  setAllSubjects: (state, subjects) => state.subjects = subjects,
  newSubject: (state, newSubject) => state.subjects.push(newSubject),
  setAllTeachesSubjects: (state, subjects) => state.teacherSubjects = subjects,
  setAllNoteSetSubjects: (state, subjects) => state.noteSetSubjects = subjects,
  setAllLessonSubjects: (state, subjects) => state.lessonSubjects = subjects,
  newTeacherSubject: (state, newSubject) => state.teacherSubjects.push(newSubject),
  newNoteSetSubject: (state, newSubject) => state.noteSetSubjects.push(newSubject),
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
  editNoteSet: (state, noteSet) => {
    let index = state.noteSets.indexOf(state.noteSets.find(set => set.id === noteSet.id))
    state.noteSets[index] = noteSet
  },

  addTutoringSession: (state, session) => state.tutoringSessions.push(session),
  setTutoringSessions: (state, sessions) => state.tutoringSessions = sessions,
  setAvails: (state, avails) => state.availabilities = avails,
  setRequests: (state, requests) => state.requests = requests,

  setUsers: (state, users) => {
    state.users = users
  },
  setViewingUser: (state, userID) => {
    state.viewingID = userID
  },
  setSelfUser: (state, userID) => {
    state.selfID = userID
  },
  updateUserProfile: (state, newProfile) => {
    let user = state.users.find(user => user.id === newProfile.user)
    user.profile = newProfile
  },
}

export default {
  state,
  getters,
  actions,
  mutations,

  methods: {},
}
