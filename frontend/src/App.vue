<template>
  <v-app id="notLoggedIn">

    <v-content justify="center">
      <Header/>

      <v-row align="left" justify="center">
        <v-img
          src="./assets/peopleLearning.png"
          lazy-src="./assets/peopleLearning.png"
          aspect-ratio="1"
          class="grey lighten-2"
          max-width="500"
          max-height="500"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-col class="text-center" style="margin-top:150px">
          <h1>Welcome to debate academy.</h1>
          <h2> Whether you're a student or a teacher... this is the place for you!</h2>
            <v-btn x-large color="cyan" dark style="font-weight: bold">Teachers</v-btn>
            <v-btn x-large color="cyan" dark style="font-weight: bold">Learners</v-btn>
        </v-col>
      </v-row>

    </v-content>

  </v-app>
</template>

<script>
import axios from "axios"
import Header from "./components/Header"
import SignUp from "./components/SignUp"

export default {
  name: 'App',

  components: {
    Header,
  },

  data: () => ({
  }),

  methods: {
  }

};

</script>


<style>
    .v-content {
      font-family: Futura, sans-serif !important;
    }

    .v-btn {
      text-transform:none !important;
    }
</style>