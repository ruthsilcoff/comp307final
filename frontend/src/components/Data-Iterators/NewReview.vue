<template>
    <v-content style="margin: 20px;">
        <h1>Add a Review</h1>
        <v-text-field label="Rating" v-model="titleInput"></v-text-field>
        <v-text-field label="Review" v-model="descriptionInput"></v-text-field>
        <v-btn color="success" v-on:click="addReviews()">
            <v-icon left>mdi-plus</v-icon> Submit
        </v-btn>
    </v-content>
</template>


<script>
import axios from "axios"
import {mapActions, mapGetters} from 'vuex'

export default {
    data: () => ({
    titleInput:'',
    descriptionInput: '',
    filesInput: [],
  }),

    methods: {
    ...mapActions(['createSnackbar', 'newReview']),

        addReviews: async function() {
        try {
            await this.newReview({title: this.titleInput, description: this.descriptionInput})
            this.createSnackbar({message: 'Review added', color:'success'})
        }catch(error){
            this.createSnackbar({message: 'Problem adding review', color: 'error'})
        }
    }
  }

};




</script>