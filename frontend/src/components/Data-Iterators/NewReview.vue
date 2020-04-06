<template>
    <v-content style="margin: 20px;">
        <h1>Add a Review</h1>
        <v-text-field type="number" label="Rating" v-model="rating"></v-text-field>
        <v-text-field type="text" label="Review" v-model="review"></v-text-field>
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
    rating:'',
    review: '',
        teacherID: '',
  }),

    props: ['id'],

    methods: {
    ...mapActions(['createSnackbar', 'newReview']),

        addReviews: async function() {
        try {
            await this.newReview({rating: this.rating, review: this.review, teacherID: parseInt(this.id)})
            this.createSnackbar({message: 'Review added', color:'success'})
        }catch(error){
            this.createSnackbar({message: 'Problem adding review', color: 'error'})
        }
    }
  }

};

</script>