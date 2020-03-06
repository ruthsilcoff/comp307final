<template>
  <v-app>


    <v-content>
      <Header/>
      <div class="addSubjectSection">
        <h1>Type here to add a subject</h1>

        <v-text-field label="Subject" v-model="subjectInput"></v-text-field>
        <v-btn class="mx-2" fab dark color="indigo" v-on:click="addSubjects()">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </div>

      <v-card max-width="500" class="mx-auto">
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>Subjects</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list>
          <v-list-item
            v-for="item in subjects"
            :key="item.name"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>

    </v-content>


  </v-app>
</template>

<script>
import axios from "axios"
import Header from "./Header"

export default {
  name: 'App',

  mounted() {
    this.getSubjects()
  },

  components: {
    Header,
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
