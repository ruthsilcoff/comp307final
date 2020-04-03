<template>
  <v-app>
    <Header v-if="loggedIn === false"/>
    <profileHeader v-if="loggedIn === true"/>

    <NewMessage v-if="newMessageDialog"/>

    <!-- Home page when you're not logged in -->
   <router-view v-if="!loading" :key="$route.fullPath"></router-view>

    <v-snackbar
      v-model="getSnackbar"
      bottom
      :color="getSnackbarColor"
      :multi-line="getSnackbarMode === 'multi-line'"
      :timeout="timeout"
      :vertical="getSnackbarMode === 'vertical'"
    >
      {{getSnackbarMessage}}
      <v-btn
        dark
        text
        @click="removeSnackbar()"
      >
        Close
      </v-btn>
    </v-snackbar>

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

    <v-footer app dense style="margin:0; padding:0">
      <v-bottom-navigation color="secondary">
        <v-card-text>
          <v-icon >mdi-account-cowboy-hat</v-icon>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-switch style="margin: 0" v-model="$vuetify.theme.dark" v-on:change="changeTheme()" color="secondary" inset label="Dark theme"/>
      </v-bottom-navigation>
    </v-footer>

  </v-app>
</template>

<script>
import axios from "axios"
import Header from "./components/Basic-Site-Stuff/Header"
import {mapGetters, mapActions} from 'vuex'
import profileHeader from "./components/Basic-Site-Stuff/profileHeader"
import LargeCalendar from "./components/Calendars/LargeCalendar"
import ProfilePage from "./components/Profile-Stuff/ProfilePage"
import NewAvailability from "./components/Data-Iterators/NewAvailability"
import BookLesson from "./components/BookLesson"
import NewMessage from "./components/Basic-Site-Stuff/chatStuff/NewMessage"


export default {
  components: {
    Header,
    profileHeader,
    LargeCalendar,
    ProfilePage,
    NewAvailability,
    BookLesson,
    NewMessage,
  },

  computed: {
    ...mapGetters([
      'newMessageDialog',
      'loggedIn',
      'getSnackbar',
      'getSnackbarColor',
      'getSnackbarMessage',
      'getSnackbarMode',
      'newMessageDialog',
    ]),
  },
  mounted() {
    this.getTheme()
  },


  created() {
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
    timeout: 5000,
    loading: false,
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
    ...mapActions([
      'removeSnackbar',
      'setMessageDialog',
      'login',
      'logOut',
      'setMyUser',
      'viewingProfile',
      'yesLoggedIn',
      'notLoggedIn',
    ]),

    getTheme: function () {
      let result = localStorage.getItem('theme')
      if (result === "true") {
        this.$vuetify.theme.dark = true
      }
      else if (result === "false") {
        this.$vuetify.theme.dark = false
      }
      else {
        this.$vuetify.theme.dark = false
      }
    },

    changeTheme: function() {
      if (this.$vuetify.theme.dark) {
        localStorage.setItem('theme', "true")
      }
      else if (!this.$vuetify.theme.dark) {
        localStorage.setItem('theme', "false")
      }
    },


    onHomePage: function () {
      this.checkLogIn()
    },

    profile: function () {
      this.isViewing = false
      this.page = 'ProfilePage'
    },

    async checkLogIn() {
      if (localStorage.getItem('token')) {
        const response = await axios.get('api/user/current')
        await this.setMyUser(response.data.id)
        await this.yesLoggedIn()
        this.loading = false
      } else {
        this.notLoggedIn()
        this.loading = false
      }
    },

    closeLogInSnackBar: function () {
      this.setLoggedInSnackBar(false)
    },

    onCalendar: function () {
      this.page = 'CalendarPage'
    },

    AddAvailability: function () {
      this.page = 'AddAvailability'
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