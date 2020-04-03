<template>
    <v-app-bar app dense color="primary">
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
        <v-list-item link>
          <router-link to="/">
            <v-icon left>mdi-home</v-icon>Homepage
          </router-link>
        </v-list-item>
        <v-list-item link>
          <router-link to="/calendar">
            <v-icon left>mdi-timeline-text</v-icon>Calendar
          </router-link>
        </v-list-item>
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
        <v-list-item link>
          <router-link v-if="myUser" :to="'/profile/' + myUser.username">
            <v-icon left>mdi-account</v-icon>Profile
          </router-link>
        </v-list-item>
        <v-list-item link v-on:click="logOutFunction()" >
          <router-link to="/">
            <v-icon left>mdi-logout</v-icon>Log out
          </router-link>
        </v-list-item>
      </v-list>
    </v-menu>


    </v-app-bar>

</template>

<script>
import axios from "axios"
import MiniChatView from "./chatStuff/MiniChat"
import {mapActions, mapGetters} from 'vuex'

export default {
  props: ["myLessons", "onHomePage", "debateGames", "profile", "onCalendar", "community",],

  computed: {
    ...mapGetters(['myUser']),
    numberUnread() {
      let num = 0;
      for (let i = 0; i < this.myChats.length; i++) {
        if (this.myChats[i].unread) {
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
    myChats: [
      {name: 'Marie', message:'hey are you there?', unread: true},
      {name: 'Chels', message:'want to get brunch this weekend?', unread: true},
      {name: 'Alex', message:'I\'m working now', unread: true},
      {name: 'Heyzeus', message:'What\'s for dinner tonight?', unread: false},
      {name: 'Ju', message:'When are you coming home?', unread: false},
      {name: 'Mike', message:'Date this weekend?', unread: true},
      {name: 'Ruth', message:'I\'m working on the AI project', unread: false},
    ],

  }),

  methods: {
    ...mapActions(['logOut', 'resetValuesOnLogOut',]),
    logOutFunction: function () {
      this.resetValuesOnLogOut()
      this.logOut()
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
