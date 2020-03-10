<template>
    <v-app>

        <v-content>
            <Header/>
            <h1>Add a Note Set</h1>
            <v-text-field label="Title" v-model="titleInput"></v-text-field>
            <v-text-field label="Description" v-model="descriptionInput"></v-text-field>
            <v-file-input counter multiple label="Input files" v-model="filesInput"></v-file-input>

        </v-content>

    </v-app>
</template>



<script>
import axios from "axios"
import Header from "./Header"

export default {
  name: 'App',

  mounted() {
  },

  components: {
  },

  data: () => ({
    noteSets: [],
    titleInput:'',
    descriptionInput: '',
    filesInput: [],
  }),

  methods: {
    getNoteSets: function() {
      axios.get('/api/noteSet/')
        .then((response) => {
          this.noteSets=response.data;
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