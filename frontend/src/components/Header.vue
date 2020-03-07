<template>
    <v-app-bar app color="cyan" dark style="font-family: Futura, sans-serif;">
        <v-btn text v-on:click="onHomePage()" align="left" style="font-size: 30px; font-weight: bold">Debate Academy</v-btn>
        <v-spacer/>
        <v-btn text v-on:click="onSignUp()" align="right" style="font-size: 20px; font-weight: bold">Sign up</v-btn>
        <v-btn text v-on:click="onLogIn()" align="right" style="font-size: 20px; font-weight: bold">Log in</v-btn>
    </v-app-bar>
</template>

<script>
import axios from "axios"

export default {
  name: 'App',
  props: ["onSignUp", "onLogIn", "onHomePage"],

  components: {
  },

  data: () => ({
  }),


}

</script>

