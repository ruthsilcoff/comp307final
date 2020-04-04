<template>
    <v-content>
        <h1>Add a Note Set</h1>
        <v-text-field label="Title" v-model="titleInput"></v-text-field>
        <v-text-field label="Description" v-model="descriptionInput"></v-text-field>
        <v-file-input counter multiple label="Input files" v-model="filesInput"></v-file-input>
        <v-btn class="mx-2" fab dark color="indigo" v-on:click="addNoteSets()">
            <v-icon dark>mdi-plus</v-icon>
        </v-btn>
    </v-content>
</template>



<script>
import axios from "axios"
import {mapActions, mapGetters} from 'vuex'

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
  ...mapActions(['createSnackbar']),
    getNoteSets: function() {
      axios.get('/api/noteSet/')
        .then((response) => {
          this.noteSets=response.data;
        })
      .catch((err) => {
        console.error(err);
      })
    },

    addNoteSets: async function() {
        try {
            const response = await axios.post('/api/noteSet/', {title:this.titleInput, description: this.descriptionInput})
            for (let i = 0; i < this.filesInput.length; i++) {
                //TODO: need a file input function like the one used for uploading pictures
                //await axios.post('/api/noteSetContent/',)
            }
            this.noteSets.push(response.data)
            this.createSnackbar({message: 'note set created', color: 'success', mode: ''})
        }catch(error){
            console.log(error.response.data);
        }
    }
  }

};

</script>