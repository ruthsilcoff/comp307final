<template>
    <v-app-bar clipped-left clipped-right app dense color="primary">
      <v-app-bar-nav-icon @click.stop="openLeft()"></v-app-bar-nav-icon>
      <v-menu offset-y>
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
            <div v-if="numberUnread > 0" id="iconNumberUnread">{{numberUnread}}</div>
          </v-btn>

        </template>
        <MiniChatView/>
        <div style="position: absolute; bottom: 0; background-color: white; width: 100%;">
          <router-link to="/messenger" style="margin-left: 22%" color="secondary" text><v-btn text color="secondary"> View All in Messenger</v-btn></router-link>
        </div>
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
import MiniChatView from "./chatStuff/MiniChat"
import {mapActions, mapGetters} from 'vuex'

export default {
  props: ["myLessons", "onHomePage", "debateGames", "profile", "onCalendar", "community",],

  computed: {
    ...mapGetters(['myUser', 'myChatsGetter', 'leftDrawerGetter', 'rightDrawerGetter', 'tempLeftGetter', 'tempRightGetter']),
    numberUnread() {
      let num = 0;
      for (let i = 0; i < this.myChatsGetter.length; i++) {
        if (this.myChatsGetter[i].unread) {
          num++
        }
      }
      return num
    },
  },

  components: {
    MiniChatView,
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
  },


}

</script>



<style>
.header-button {
    font-size: 20px !important;
    font-weight: bold !important;
}
</style>
