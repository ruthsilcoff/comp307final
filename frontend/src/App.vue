<template>
  <v-app>
    <Header v-if="page === 'notLoggedIn' || page === 'signUpPage' || page === 'logInPage'" :onHomePage="onHomePage"
          :onSignUp="goToSignUp" :onLogIn="goToLogIn"/>
    <profileHeader v-if="page === 'loggedIn' || page === 'AddAvailability' || page ==='Calendar' || page === 'ProfilePage'" :onHomePage="onHomePage" :calendar="calendar" :profile="profile" :logOut="logOut" />

    <v-content v-if="page === 'signUpPage'">
      <SignUp :onLoginSuccess="onLoginSuccess"/>
    </v-content>

    <v-content v-if="page === 'logInPage'">
      <LogIn :onLoginSuccess="onLoginSuccess"/>
    </v-content>

    <v-content v-if="page === 'ProfilePage'">
      <ProfilePage :userData="userData"/>
    </v-content>

    <v-content v-if="page === 'Calendar'">
      <Calendar/>
    </v-content>

    <v-content v-if="page === 'notLoggedIn'" justify="center">
      <welcomePage/>
      <whyItWorks/>
    </v-content>

    <v-content v-if="page === 'loggedIn'" justify="center">
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
    page: 'notLoggedIn',
    userData: {},
  }),

  methods: {
    onHomePage: function () {
      this.checkLogIn()
    },

    profile: function () {
      this.page = 'ProfilePage'
    },

    goToSignUp: function () {
      this.page = 'signUpPage'
    },

    goToLogIn: function () {
      this.page = 'logInPage'
    },

    onLoginSuccess: function (usernameInput) {
      this.page = 'loggedIn'
      axios.get('/api/user/current/')
        .then((response) => {
					console.log(response.data)
          this.userData = response.data
          this.page = 'loggedIn'
          this.testStatus = 2
				})
				.catch((err) => {
					console.error(err.response)
				})

    },

    logOut: function () {
      localStorage.removeItem('token')
      this.page = 'notLoggedIn'
    },

    checkLogIn: function () {
      if (localStorage.getItem('token')) {
        this.onLoginSuccess()
      }
      else {
        this.page = 'notLoggedIn'
      }
    },

    calendar: function () {
      this.page = 'CalendarPage'
    },

    AddAvailability: function () {
      this.page = 'AddAvailability'
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