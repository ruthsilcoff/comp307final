<template>
    <v-content style="margin: 20px;">
        <h1>Add a Note Set</h1>
        <v-text-field label="Title" v-model="titleInput"></v-text-field>
        <v-text-field label="Description" v-model="descriptionInput"></v-text-field>
        <v-file-input counter multiple label="Input files" v-model="filesInput"></v-file-input>
        <v-btn color="success" v-on:click="addNoteSets()">
            <v-icon left>mdi-plus</v-icon> Submit
        </v-btn>
        <v-divider></v-divider>
        <h1>Sets:</h1>
        <ViewNoteSets/>
    </v-content>
</template>



<script>
import axios from "axios"
import {mapActions, mapGetters} from 'vuex'
import ViewNoteSets from "./ViewNoteSets"

export default {
  computed: {
      ...mapGetters(['noteSetsGetter'])
  },

    components: {
        ViewNoteSets,
    },

  data: () => ({
    titleInput:'',
    descriptionInput: '',
    filesInput: [],
  }),

  methods: {
    ...mapActions(['createSnackbar', 'newNoteSet']),

    addNoteSets: async function() {
        try {
            await this.newNoteSet({title: this.titleInput, description: this.descriptionInput, files: this.filesInput})
            this.createSnackbar({message: 'Notes uploaded', color:'success'})
        }catch(error){
            this.createSnackbar({message: 'Problem uploading notes', color: 'error'})
        }
    }
  }

};

</script>