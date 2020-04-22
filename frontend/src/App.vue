<template>
  <v-app>
    <Header v-if="loggedIn === false"/>
    <profileHeader v-if="loggedIn === true"/>

    <NewMessage v-if="messageDialog"/>

    <v-row v-if="loading" align="center" justify="center">
      <v-progress-circular color="secondary" :size="100" :width="10" indeterminate/>
      <v-icon x-large color="red" style="margin-top: 0; margin-left: -69px;">fa-heart</v-icon>
    </v-row>

   <router-view v-if="!loading" :key="$route.fullPath"></router-view>

   <v-menu
      draggable="true"
      :value="true"
      v-for="(item, index) in openChats"
      v-bind:key="item.id"
      absolute
      :position-x="220*index"
      :position-y="clientHeight -350"
      elevation="5"
      :close-on-content-click="false"
      :close-on-click="false"
    >
      <v-card draggable="true" height="300" width="200">
        <v-toolbar v-on:click="toggleCollapse(index)" fixed dense dark color="primary">
          <v-toolbar-title v-if="item.otherUser.first_name">{{item.otherUser.first_name + " " + item.otherUser.last_name}}</v-toolbar-title>
          <v-toolbar-title v-if="!item.otherUser.first_name">{{item.otherUser.username}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon color="white" style="padding: 0; margin: 0;" v-on:click="closeChat(item.id, index)">x</v-icon>
          <v-icon color="white" style="padding: 0; margin: 0;" v-on:click="toggleCollapse(index)">^</v-icon>
        </v-toolbar>
        <BottomChatView v-if="!collapsedChatGetter[index]" :chat="item"/>
      </v-card>

    </v-menu>

    <v-snackbar
      v-model="snackbar"
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

    <!-- Book a lesson with a teacher -->
    <v-content v-if="page === 'RequestLesson'">
      <BookLesson :lessonIDinput="requestLessonID"/>
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
import BottomChatView from "./components/Basic-Site-Stuff/chatStuff/BottomChatView"
import {ws} from './websocket'

export default {
  components: {
    Header,
    profileHeader,
    LargeCalendar,
    BookLesson,
    NewMessage,
    BottomChatView,
  },

  computed: {
    ...mapGetters([
      'collapsedChatGetter',
      'openChatIDGetter',
      'chatGetter',
      'allUsers',
      'newMessageDialog',
      'loggedIn',
      'getSnackbar',
      'getSnackbarColor',
      'getSnackbarMessage',
      'getSnackbarMode',
    ]),
    openChats() {
      let openChats = []
      if (this.openChatIDGetter) {
        for (let i = 0; i < this.openChatIDGetter.length; i++) {
          let chat = this.chatGetter.find(chat => chat.id === this.openChatIDGetter[i])
          openChats.push(chat)
        }
      }
      return openChats
    },
    snackbar: {
      get() {
        return this.getSnackbar
      },
      set() {
        this.removeSnackbar()
      }
    },
    messageDialog: {
      get() {
        return this.newMessageDialog
      },
      set(value) {
        this.setMessageDialog(value)
      }
    },
    leftDrawerGetSet: {
      get() {
        return this.leftDrawerGetter
      },
      set(value) {
        return this.changeLeftDrawer(value)
      }
    }
  },
  mounted() {
    this.getTheme()
    this.setClientHeight()
    document.addEventListener("resize", function(event) {
        console.log(event)
        this.setClientHeight()
    })
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
    clientHeight: 500,
    timeout: 5000,
    loading: true,
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
      'setCollapsedChat',
      'setOpenChatID',
      'removeSnackbar',
      'setMessageDialog',
      'login',
      'logOut',
      'setMyUser',
      'yesLoggedIn',
      'notLoggedIn',
    ]),

      setClientHeight() {
        this.clientHeight = document.body.clientHeight
      },

    toggleCollapse(index) {
      let current = this.collapsedChatGetter[index]
      console.log(current)
      this.setCollapsedChat({index: index, bool: !current})
    },

    closeChat(id, index) {
      this.setOpenChatID({id: id, bool: false})
    },

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

a {
  text-decoration: none;
}

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

.primary-darken1 {
    background-color: var(--v-primary-darken1);
}

.hoverDrop {
  border: 2px solid black;
  box-shadow: 2px 2px 2px;
  background-color: transparent;
  border-radius: 20px;
  width: 400px;
  font-family: sans-serif;
  padding: 20px;
}

.noHoverDrop {
  background-color: var(--v-dropBox-base);
  border: 2px dashed black;
  border-radius: 20px;
  width: 400px;
  font-family: sans-serif;
  padding: 20px;
}
</style>