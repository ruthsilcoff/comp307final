<template>
  <v-app>
    <Header v-if="page === 'notLoggedIn' || page === 'signUpPage' || page === 'logInPage'" :onHomePage="onHomePage"
          :onSignUp="goToSignUp" :onLogIn="goToLogIn"/>
    <profileHeader v-if="page === 'loggedIn' || page ==='Calendar'" :onHomePage="onHomePage" :calendar="calendar" :profile="profile" />

    <v-content v-if="page === 'signUpPage'">
      <SignUp :onSuccessfulSignUp="onSuccessfulSignUp"/>
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
      <userHomePage/>
    </v-content>

    <v-content v-if="page === 'CalendarPage'" justify="center">
      <Calendar/>
    </v-content>

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


export default {
  name: 'App',

  components: {
    Header,
    SignUp,
    LogIn,
    welcomePage,
    whyItWorks,
    profileHeader,
    userHomePage,
    Calendar,
    ProfilePage,
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
  },

  data: () => ({
    page: 'notLoggedIn',
    userData: {},
  }),

  methods: {
    onHomePage: function () {
      // if the user is logged in
      if (this.page === 'notLoggedIn') {
        this.page = 'loggedIn';
      } else {
        this.page = 'notLoggedIn'
      }
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
      axios.get('/api/user/', {
        'params': {
          'username': usernameInput
        }
      })
        .then((response) => {
					console.log(response.data)
          this.userData = response.data
          this.page = 'loggedIn'
				})
				.catch((err) => {
					console.error(err.response.data)
				})

    },

    onSuccessfulSignUp: function () {
      this.page = 'logInPage'
    },

    calendar: function () {
      this.page = 'CalendarPage'
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