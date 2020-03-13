<template>
  <v-app>
    <Header v-if="loggedIn === false && (page === 'homePage' || page === 'ViewAllUsersPage' || page === 'ViewAllTeachersPage' || page === 'signUpPage' || page === 'logInPage' || age ==='ViewingProfilePage')" :onHomePage="onHomePage"
          :onSignUp="goToSignUp" :onLogIn="goToLogIn"/>
    <profileHeader v-if="loggedIn === true && (page === 'homePage' || page === 'ViewAllUsersPage' || page === 'ViewAllTeachersPage' || page ==='CalendarPage' || page ==='ProfilePage' || page === 'AddAvailability' || page ==='ViewingProfilePage')" :onCalendar="onCalendar" :onHomePage="onHomePage" :logOut="logOut" :profile="profile"/>

    <!-- This is the user home page that shows when you're logged in -->
    <v-content v-if="loggedIn === true && page === 'homePage'">
      <v-btn large v-on:click="viewAllTeachers">
          View All Teachers
      </v-btn>
      <v-btn large v-on:click="viewAllUsers">
          View All Users
      </v-btn>
      <v-content v-if="tab === 1">
        <ViewTeachers  :goToProfileOf="goToProfileOf"/>
      </v-content>
      <v-content v-if="tab === 2">
        <ViewAllUsers :goToProfileOf="goToProfileOf"/>
      </v-content>


    </v-content>

    <!-- Home page when you're not logged in -->
    <v-content v-if="loggedIn === false && page === 'homePage'" justify="center">
      <welcomePage :onLearnerSignUp="onLearnerSignUp" :onTeacherSignUp="onTeacherSignUp"/>
      <whyItWorks :onLearnerSignUp="onLearnerSignUp" :onTeacherSignUp="onTeacherSignUp"/>
    </v-content>

    <v-content v-if="page === 'signUpPage'">
      <SignUp :initialTabNumber="tabNumber" :onLoginSuccess="onLoginSuccess"/>
    </v-content>

    <v-content v-if="page === 'logInPage'">
      <LogIn :onLoginSuccess="onLoginSuccess"/>
    </v-content>

    <!-- Your own profile -->
    <v-content v-if="page === 'ProfilePage'">
      <ProfilePage :AddAvailability="AddAvailability" :onRequestLesson="onRequestLesson" :isViewing="false" :userData="userData"/>
    </v-content>

    <!-- Someone else's profile -->
    <v-content v-if="page === 'ViewingProfilePage'">
      <ProfilePage :AddAvailability="AddAvailability" :onRequestLesson="onRequestLesson" :isViewing="true" :userData="viewingUser"/>
    </v-content>

    <!-- Book a lesson with a teacher -->
    <v-content v-if="page === 'RequestLesson'">
      <BookLesson :lessonIDinput="requestLessonID"/>
    </v-content>

    <!-- This is for teachers to add new times that they are available to teach -->
    <v-content v-if="page === 'AddAvailability'">
      <NewAvailability/>
    </v-content>

    <v-content v-if="page === 'CalendarPage'" justify="center">
      <LargeCalendar/>
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
import LargeCalendar from "./components/LargeCalendar"
import ProfilePage from "./components/ProfilePage"
import NewAvailability from "./components/NewAvailability"
import BookLesson from "./components/BookLesson"
import ViewTeachers from "./components/ViewTeachers"
import ViewAllUsers from "./components/ViewAllUsers"


export default {
  name: 'App',

  components: {
    Header,
    SignUp,
    LogIn,
    welcomePage,
    whyItWorks,
    profileHeader,
    LargeCalendar,
    ProfilePage,
    NewAvailability,
    BookLesson,
    ViewTeachers,
    ViewAllUsers,
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
    requestLessonID: null,
    tab: 1,
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

    onCalendar: function () {
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

    onRequestLesson: function(item) {
      this.requestLessonID = item.id
      this.page = 'RequestLesson'
    },

    viewAllTeachers: function () {
      //this.page = 'ViewAllTeachersPage'
      this.tab = 1
    },

    viewAllUsers: function () {
      //this.page = 'ViewAllUsersPage'
      this.tab = 2
    },

  }

}

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