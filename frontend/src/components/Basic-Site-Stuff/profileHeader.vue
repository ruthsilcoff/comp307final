<template>
    <v-app-bar clipped-left clipped-right app dense color="primary">
      <v-app-bar-nav-icon @click.stop="openLeft()"></v-app-bar-nav-icon>
      <v-menu offset-y >
        <template v-slot:activator="{ on }">
          <v-btn
            color="white"
            v-on="on"
            large
            text
          >
            Debate Academy
          </v-btn>
        </template>
        <v-list>
          <router-link to="/">
            <v-list-item link>
              <v-icon left>mdi-home</v-icon>Homepage
            </v-list-item>
          </router-link>
          <router-link to="/calendar">
            <v-list-item link>
              <v-icon left>mdi-timeline-text</v-icon>Calendar
            </v-list-item>
          </router-link>
        </v-list>
      </v-menu>

      <v-row style="margin-left: 30px; " align="center" justify="center">
        <v-text-field
            dense
            class="d-none d-md-flex"
            solo-inverted
            flat
            hide-details
            label="Search"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px !important;"
        ></v-text-field>
      </v-row>

      <v-spacer/>

      <v-menu
        style="height: 500px;"
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
        <v-card max-height="300" style="position: relative !important">
          <TinyCalendar/>
          <v-bottom-navigation style="position: absolute; bottom: 0;" grow>
            <router-link to="/calendar">
              <v-btn text color="secondary" v-on:click="nothing">View Full Calendar</v-btn>
            </router-link>
          </v-bottom-navigation>
        </v-card>

      </v-menu>

      <v-menu
        v-if="myChatsGetter"
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
          <router-link to="/messenger" >
            <v-btn text color="secondary"> View All in Messenger</v-btn>
          </router-link>
        </v-bottom-navigation>
      </v-menu>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            color="white"
            v-on="on"
          >
            <v-icon large>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <router-link v-if="myUser" :to="'/profile/' + myUser.username">
            <v-list-item link>
              <v-icon left>mdi-account</v-icon>Profile
            </v-list-item>
          </router-link>
          <router-link to="/">
            <v-list-item v-on:click="logOutFunction()" link>
              <v-icon left>mdi-logout</v-icon>Log out
            </v-list-item>
          </router-link>
        </v-list>
      </v-menu>

      <v-app-bar-nav-icon @click.stop="openRight()"></v-app-bar-nav-icon>
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
    ...mapGetters(['myID', 'allMessagesGetter', 'myUser', 'myChatsGetter', 'leftDrawerGetter', 'rightDrawerGetter', 'tempLeftGetter', 'tempRightGetter']),
    myChats() {
      let chats = []
      for (let x = 0; x < this.myChatsGetter.length; x++) {
        let chat = this.myChatsGetter[x]
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
      let num = 0;
      console.log(this.myChats)
      for (let x= 0; x< this.myChats.length; x++) {
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
    }
  },

  components: {
    TinyCalendar,
    MiniChat,
  },

  data: () => ({

  }),

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
