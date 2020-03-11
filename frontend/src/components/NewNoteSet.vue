<template>
    <v-app>

        <v-content>
            <Header/>
            <h1>Add a Note Set</h1>
            <v-text-field label="Title" v-model="titleInput"></v-text-field>
            <v-text-field label="Description" v-model="descriptionInput"></v-text-field>
            <v-file-input counter multiple label="Input files" v-model="filesInput"></v-file-input>
            <v-btn class="mx-2" fab dark color="indigo" v-on:click="addNoteSets()">
                <v-icon dark>mdi-plus</v-icon>
            </v-btn>
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

    addNoteSets: function() {
      axios.post('/api/noteSet/', {title:this.titleInput})
        .then((response) => {
          this.noteSets.push(response.data)
        })
      .catch((err) => {
        console.error(err);
      })
    }
  }

};

</script>