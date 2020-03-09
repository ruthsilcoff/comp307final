<template>
    <v-app-bar app color="cyan">
        <v-btn class="headerButton" text v-on:click="onHomePage()" align="left" style="font-size: 30px; font-weight: bold">Debate Academy</v-btn>
        <v-spacer/>
        <v-btn class="headerButton" text v-on:click="community()" align="right" style="font-size: 20px; font-weight: bold">Debate Community</v-btn>
        <v-btn class="headerButton" text v-on:click="myLessons()" align="right" style="font-size: 20px; font-weight: bold">Upcoming Lessons</v-btn>
				<v-btn class="headerButton" text v-on:click="debateGames()" align="right" style="font-size: 20px; font-weight: bold">Tournaments</v-btn>
				<v-btn class="headerButton" text v-on:click="calendar()" align="right" style="font-size: 20px; font-weight: bold">My Calendar</v-btn>
				<v-btn class="headerButton" text v-on:click="profile()" align="right" style="font-size: 20px; font-weight: bold">Profile</v-btn>

    </v-app-bar>
</template>

<script>
import axios from "axios"

export default {
  name: 'App',
  props: ["myLessons", "onHomePage", "debateGames", "profile", "calendar", "community", ],


  components: {
  },

  data: () => ({
  }),


}

</script>
