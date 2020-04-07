<template>
    <v-content>
        <v-card style="padding: 20px;">
            <v-card-title>Add a Note Set</v-card-title>
             <v-text-field label="Title" v-model="titleInput"></v-text-field>
            <v-text-field label="Description" v-model="descriptionInput"></v-text-field>
            <v-file-input counter multiple label="Input files" v-model="filesInput"></v-file-input>
            <v-row>
                <v-btn color="success" v-on:click="addNoteSets()">
                    Submit
                </v-btn>
                <v-btn color="error" v-on:click="cancel()">
                    Cancel
                </v-btn>
            </v-row>
        </v-card>
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
    props: ['cancel', 'submit'],

  data: () => ({
    titleInput:'',
    descriptionInput: '',
    filesInput: [],
  }),

  methods: {
    ...mapActions(['createSnackbar', 'newNoteSet']),

    addNoteSets: async function() {
        if (this.titleInput === '') {
            this.createSnackbar({message: 'Title is required', color: 'error'})
        }
        else if (this.descriptionInput === '') {
            this.createSnackbar({message: 'Description is required', color: 'error'})
        }
        else {
            try {
                await this.newNoteSet({title: this.titleInput, description: this.descriptionInput, files: this.filesInput})
                this.createSnackbar({message: 'Notes uploaded', color:'success'})
                this.submit()
            }catch(error){
                this.createSnackbar({message: 'Problem uploading notes', color: 'error'})
            }
        }
    }
  }

};

</script>