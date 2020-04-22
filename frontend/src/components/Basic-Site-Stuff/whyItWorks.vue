<template>
<v-app>
  <v-col class="text-center" style="padding:0; margin:0;">
    <h1>Why Debate Academy works</h1>
  </v-col>
  <v-row align="center" justify="space-between" style="margin-left: 12%; margin-right: 12%;">
    <v-card max-width="300">
      <v-card-text align="center">
        <v-col cols="10" md="10">
          <v-img
              src="../../assets/interactiveLearning.png"
              lazy-src="../../assets/interactiveLearning.png"
              aspect-ratio="1"
              class="grey lighten-2"
              max-width="100"
              max-height="100"
          >
            <template v-slot:placeholder>
            <v-row class="fill-height ma-0" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
            </template>
          </v-img>

          <h2>Interactive Learning</h2>
          <p>Through direct messaging, video chat with real teachers, online debate games, and more,
            learning has never been so involved with the community.</p>
        </v-col>
      </v-card-text>
    </v-card>
    <v-card max-width="300">
      <v-card-text align="center">
        <v-col cols="10" md="10">
          <v-img
              src="../../assets/trustedContent.jpg"
              lazy-src="../../assets/trustedContent.jpg"
              aspect-ratio="1"
              class="grey lighten-2"
              max-width="100"
              max-height="100"
          >
            <template v-slot:placeholder>
            <v-row class="fill-height ma-0" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
            </template>
          </v-img>

          <h2>Trusted Content</h2>
          <p>Anyone can upload content, but to get verified is not easy. A rating system allows teachers
            to gain reputation on the site, and only the expert-verified and highly rated content will
            make it to the top.</p>
        </v-col>
      </v-card-text>
    </v-card>
    <v-card max-width="300">
      <v-card-text align="center">
        <v-col cols="10" md="10">
          <v-img
              src="../../assets/inclusive.jpg"
              lazy-src="../../assets/inclusive.jpg"
              aspect-ratio="1"
              class="grey lighten-2"
              max-width="100"
              max-height="100"
          >
            <template v-slot:placeholder>
            <v-row class="fill-height ma-0" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
            </template>
          </v-img>

          <h2>Available to everyone</h2>
          <p>Zero sign up fees! Anyone can start learning or teaching today!</p>
        </v-col>
      </v-card-text>
    </v-card>
  </v-row>
  <v-col class="text-center">
    <h1>Sign Up Today</h1>
    <router-link to="/signup">
      <v-btn class="header-button" v-on:click="onLearnerSignUp()">Learners</v-btn>
    </router-link>
    <router-link to="/signup">
      <v-btn class="header-button" v-on:click="onTeacherSignUp()">Teachers</v-btn>
    </router-link>
  </v-col>
</v-app>
</template>


<script>
import axios from "axios"
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'App',
  props: [],

  components: {},

  data: () => ({}),

  methods: {
    ...mapActions(['setTabNumber']),
    onTeacherSignUp: function () {
      this.setTabNumber(1)
    },

    onLearnerSignUp: function () {
      this.setTabNumber(0)
    },
  }
}

</script>
