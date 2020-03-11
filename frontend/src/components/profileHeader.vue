<template>
    <v-app-bar app color="primary">
        <v-btn text v-on:click="onHomePage()" align="left" style="font-size: 30px; font-weight: bold">Debate Academy</v-btn>
        <v-spacer/>
				<v-btn class="header-button" text v-on:click="debateGames()" align="right">Tournaments</v-btn>
				<v-btn class="header-button" text v-on:click="calendar()" align="right">My Calendar</v-btn>
				<v-btn class="header-button" text v-on:click="profile()" align="right">Profile</v-btn>
        <v-btn class="header-button" text v-on:click="logOut()" align="right">Log out</v-btn>
    </v-app-bar>
</template>

<script>
import axios from "axios"

export default {
  name: 'App',
  props: ["myLessons", "onHomePage", "debateGames", "profile", "calendar", "community", "logOut"],


  components: {
  },

  data: () => ({
  }),


}

</script>



<style>
.header-button {
    font-size: 20px !important;
    font-weight: bold !important;
}
</style>