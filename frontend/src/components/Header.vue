<template>
    <v-app-bar app color="cyan" dark style="font-family: Futura, sans-serif;">
        <v-btn text v-on:click="goToHomePage()" align="left" style="font-size: 30px; font-weight: bold">Debate Academy</v-btn>
        <v-spacer/>
        <v-btn text v-on:click="goToSignUp()" align="right" style="font-size: 20px; font-weight: bold">Sign up</v-btn>
        <v-btn text v-on:click="goToSignUp()" align="right" style="font-size: 20px; font-weight: bold">Log in</v-btn>
    </v-app-bar>
</template>

<script>
import axios from "axios"

export default {
  name: 'App',

  mounted() {
    this.goToSignUp();
    this.goToHomePage();
  },

  components: {
  },

  data: () => ({
  }),

  methods: {
      goToSignUp: function () {

      },

      goToHomePage: function () {

      }
  }

}

</script>

