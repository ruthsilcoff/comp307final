<template>
<v-app style="margin-top:100px; height:600px;">
  <v-row>
    <v-img
        src="../../assets/peopleStudying.png"
        lazy-src="../../assets/peopleStudying.png"
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
    <v-col class="text-center" style="margin-top:150px; margin-bottom:0; padding:0; height:300px;">
      <h1>Welcome to Debate Academy.</h1>
      <h2> Whether you're a student or a teacher... this is the place for you!</h2>
      <router-link to="/signup">
        <v-btn class="header-button" v-on:click="onLearnerSignUp()">Learners</v-btn>
      </router-link>
      <router-link to="/signup">
        <v-btn class="header-button" v-on:click="onTeacherSignUp()">Teachers</v-btn>
      </router-link>
    </v-col>
  </v-row>
</v-app>
</template>

<script>
import axios from "axios"
import {mapGetters, mapActions} from 'vuex'

export default {
  props: [],

  components: {},

  data: () => ({
    testStatus: 0,
  }),

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

