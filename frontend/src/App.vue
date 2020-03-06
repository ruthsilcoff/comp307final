<template>
  <v-app>

    <v-content>
      <Header/>

      <v-row align="left">
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
        <v-col align="right">
          <p>Welcome to debate academy. Whether you're a student or a teacher... this is the place for you!</p>
          <SignUp/>
        </v-col>
      </v-row>

      <Video/>
      <NewSubject/>

    </v-content>

  </v-app>
</template>

<script>
import axios from "axios"
import Video from "./components/Video"
import Header from "./components/Header"
import NewSubject from "./components/NewSubject"
import SignUp from "./components/SignUp"

export default {
  name: 'App',

  mounted() {
    this.getSubjects()
  },

  components: {
    Video,
    Header,
    NewSubject,
    SignUp,
  },

  data: () => ({
    subjects: [],
    subjectInput:''
  }),

  methods: {
    getSubjects: function() {
      axios.get('/api/subject/')
        .then((response) => {
          this.subjects=response.data;
        })
      .catch((err) => {
        console.error(err);
      })
    },

    addSubjects: function() {
      axios.post('/api/subject/', {name:this.subjectInput})
        .then((response) => {
          this.subjects.push(response.data)
        })
      .catch((err) => {
        console.error(err);
      })
    }
  }

};

</script>
