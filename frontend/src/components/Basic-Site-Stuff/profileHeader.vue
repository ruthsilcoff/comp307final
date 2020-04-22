+
<template>
<v-app-bar clipped-left clipped-right app dense color="primary">
  <v-app-bar-nav-icon v-if="showLeftNavGetter" @click.stop="openLeft()"></v-app-bar-nav-icon>
  <router-link to="/" style="text-shadow: black;">
    Debate Academy
  </router-link>

  <v-spacer/>

  <v-menu
      elevation="5"
      offset-y
      :close-on-content-click="false"
      :nudge-width="300"
  >
    <template v-slot:activator="{ on }">
    <v-btn
        icon
        color="white"
        v-on="on"
        style="position:relative"
    >
      <v-icon large>mdi-calendar</v-icon>
      <div v-if="numberNotifs > 0" class="iconNumberUnread">{{numberNotifs}}</div>
    </v-btn>

    </template>
    <div style="max-height: 600px;">
      <TinyCalendar/>
    </div>

  </v-menu>

  <v-menu
      v-if="chatGetter"
      offset-y
      :close-on-content-click="false"
      :nudge-width="300"
  >
    <template v-slot:activator="{ on }">
    <v-btn
        icon
        color="white"
        v-on="on"
        style="position:relative"
    >
      <v-icon large>mdi-chat</v-icon>
      <div v-if="numberUnread > 0" class="iconNumberUnread">{{numberUnread}}</div>
    </v-btn>

    </template>
    <MiniChat/>
    <v-bottom-navigation grow>
      <router-link to="/messenger">
        <v-list-item link> View All in Messenger</v-list-item>
      </router-link>
    </v-bottom-navigation>
  </v-menu>

  <div v-if="myUser">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
      <v-chip pill v-on="on">
          <v-avatar left v-if="myUser.profile.avatar" ><v-img :src="myUser.profile.avatar"></v-img></v-avatar>
          {{myUser.username}}
      </v-chip>
      </template>
      <v-list>
        <router-link v-if="myUser" :to="'/profile/' + myUser.username">
          <v-list-item link>
            <v-icon left large>mdi-account-circle</v-icon>
            Profile
          </v-list-item>
        </router-link>
        <router-link to="/">
          <v-list-item v-on:click="logOutFunction()" link>
            <v-icon left>mdi-logout</v-icon>
            Log out
          </v-list-item>
        </router-link>
      </v-list>
    </v-menu>
  </div>

</v-app-bar>

</template>

<script>
import axios from "axios"
import MiniChat from "./chatStuff/MiniChat"
import TinyCalendar from "../Calendars/TinyCalendar"
import {mapActions, mapGetters} from 'vuex'

export default {
  props: ["myLessons", "onHomePage", "debateGames", "profile", "onCalendar", "community",],

  computed: {
    ...mapGetters(['showLeftNavGetter', 'myID', 'allMessagesGetter', 'myUser', 'chatGetter', 'leftDrawerGetter', 'rightDrawerGetter', 'tempLeftGetter', 'tempRightGetter']),
    myChats() {
      let myChats = this.chatGetter.filter(chat => chat.owner === this.myID)
      let chats = []
      for (let x = 0; x < myChats.length; x++) {
        let chat = myChats[x]
        let filteredMessages = this.allMessagesGetter.filter(
          msg => ((msg.author.id === chat.owner && msg.sentTo === chat.otherUser.id)
            || (msg.author.id === chat.otherUser.id && msg.sentTo === chat.owner)),
        )
        chat.messages = filteredMessages
        chat.mostRecent = chat.messages[(filteredMessages.length) - 1]
        chats.push(chat)
      }
      return chats
    },
    numberUnread() {
      let num = 0
      for (let x = 0; x < this.myChats.length; x++) {
        for (let i = 0; i < this.myChats[x].messages.length; i++) {
          if (!this.myChats[x].messages[i].seen && (this.myChats[x].messages[i].sentTo === this.myID)) {
            num++
          }
        }
      }
      return num
    },
    numberNotifs() {
      //TODO: make this function
      return 5
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

  components: {
    TinyCalendar,
    MiniChat,
  },

  data: () => ({}),

  methods: {
    ...mapActions(['logOut', 'resetValuesOnLogOut', 'changeLeftDrawer', 'changeRightDrawer', 'changeTempLeft', 'changeTempRight']),
    logOutFunction: function () {
      this.resetValuesOnLogOut()
      this.logOut()
    },

    openRight() {
      this.changeRightDrawer(!this.rightDrawerGetter)
    },

    openLeft() {
      this.changeLeftDrawer(!this.leftDrawerGetter)
    },

    nothing() {

    },
  },


}

</script>


<style>
.header-button {
  font-size: 20px !important;
  font-weight: bold !important;
}

a {
  color: var(--v-blackToWhite-base) !important;
  font-weight: bold;
}

.iconNumberUnread {
  background-color: red;
  width: 18px;
  height: 18px;
  border-radius: 10px;
  position: absolute !important;
  color: black;
  top: -4px;
  right: 6px;
  font-family: Arial, sans serif;
  font-size: 16px;
  font-weight: bold;
}
</style>
