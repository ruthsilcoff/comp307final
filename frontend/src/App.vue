<template>
  <v-app>
    <Header v-if="loggedIn === false && (page === 'homePage' || page === 'signUpPage' || page === 'logInPage' || age ==='ViewingProfilePage')" :onHomePage="onHomePage"
          :onSignUp="goToSignUp" :onLogIn="goToLogIn"/>
    <profileHeader v-if="loggedIn === true && (page === 'homePage' || page ==='Calendar' || page ==='ProfilePage' || page === 'AddAvailability' || page ==='ViewingProfilePage')" :onHomePage="onHomePage" :logOut="logOut" :profile="profile"/>

    <v-content v-if="page === 'signUpPage'">
      <SignUp :tabNumber="tabNumber" :onLoginSuccess="onLoginSuccess"/>
    </v-content>

    <v-content v-if="page === 'logInPage'">
      <LogIn :onLoginSuccess="onLoginSuccess"/>
    </v-content>

    <v-content v-if="page === 'ProfilePage'">
      <ProfilePage :isViewing="isViewing" :userData="userData"/>
    </v-content>

    <v-content v-if="page === 'ViewingProfilePage'">
      <ProfilePage :isViewing="isViewing" :userData="viewingUser"/>
    </v-content>

    <v-content v-if="page === 'Calendar'">
      <Calendar/>
    </v-content>

    <v-content v-if="loggedIn === false && page === 'homePage'" justify="center">
      <welcomePage :onLearnerSignUp="onLearnerSignUp" :onTeacherSignUp="onTeacherSignUp"/>
      <whyItWorks :onLearnerSignUp="onLearnerSignUp" :onTeacherSignUp="onTeacherSignUp"/>
    </v-content>

    <v-content v-if="loggedIn === true && page === 'homePage'">
      <v-btn text large v-on:click="AddAvailability">
            AddAvailability
      </v-btn>
    </v-content>

    <v-content v-if="page === 'AddAvailability'">
      <NewAvailability/>
    </v-content>

    <v-content v-if="page === 'CalendarPage'" justify="center">
      <Calendar/>
    </v-content>

    <v-footer>
      <v-switch
        v-model="$vuetify.theme.dark"
        hide-details
        inset
        label="Dark theme"
      ></v-switch>
    </v-footer>

  </v-app>
</template>

<script>
import axios from "axios"
import Header from "./components/Header"
import SignUp from "./components/SignUp"
import LogIn from "./components/LogIn"
import welcomePage from "./components/welcomePage"
import whyItWorks from "./components/whyItWorks"
import profileHeader from "./components/profileHeader"
import userHomePage from "./components/userHomePage"
import Calendar from "./components/Calendar"
import ProfilePage from "./components/ProfilePage"
import NewAvailability from "./components/NewAvailability"


export default {
  name: 'App',

  components: {
    Header,
    SignUp,
    LogIn,
    welcomePage,
    whyItWorks,
    profileHeader,
    Calendar,
    ProfilePage,
    NewAvailability,
  },

  mounted() {
    axios.interceptors.request.use(
        config => {
          const token = localStorage.getItem('token')
          if (token) {
            config.headers['Authorization'] = 'Token ' + token
          }
          return config
        },
        error => Promise.reject(error)
    )
    this.checkLogIn()
  },

  data: () => ({
    loggedIn: false,
    page: 'homePage',
    testStatus: 0,
    userData: {},
    viewingProfileOf: null,
    viewingUser: {},
    isViewing: false,
    tabNumber: 0,
  }),

  methods: {
    onHomePage: function () {
      this.checkLogIn()
    },

    profile: function () {
      this.isViewing = false
      this.page = 'ProfilePage'
    },

    goToSignUp: function () {
      this.page = 'signUpPage'
    },

    goToLogIn: function () {
      this.page = 'logInPage'
    },

    onLoginSuccess: function (usernameInput) {
      axios.get('/api/user/current/')
        .then((response) => {
					console.log(response.data)
          this.userData = response.data
          this.loggedIn = true
          this.page = 'homePage'
          this.testStatus = 2
				})
				.catch((err) => {
					console.error(err.response)
				})

    },

    logOut: function () {
      localStorage.removeItem('token')
      this.loggedIn = false
      this.page = 'homePage'
    },

    checkLogIn: function () {
      if (localStorage.getItem('token')) {
        this.onLoginSuccess()
      }
      else {
        this.loggedIn = false
        this.page = 'homePage'
      }
    },

    calendar: function () {
      this.page = 'CalendarPage'
    },

    AddAvailability: function () {
      this.page = 'AddAvailability'
    },

    goToProfileOf: function (userID) {
      this.isViewing = true
      this.viewingProfileOf = userID;
      axios.get('/api/user/' + userID + '/')
        .then((response) => {
					console.log(response.data)
          this.viewingUser = response.data
          this.page = 'ViewingProfilePage'
				})
				.catch((err) => {
					console.error(err.response.data)
				})
    },

    onTeacherSignUp: function() {
      this.tabNumber = 1
      this.page = 'signUpPage'
    },

    onLearnerSignUp: function() {
      this.tabNumber = 0
      this.page = 'signUpPage'
    },

  }

};

</script>


<style>
.Header {
  position: absolute;
}

.v-content {
  font-family: Futura, sans-serif !important;
}

.v-btn {
  text-transform:none !important;
  margin: 20px;
}

.headerButton {
  margin: 0;
}
</style>