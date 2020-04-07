<template>
    <v-content>
        <v-card style="padding: 10px">
            <v-card-title style="font-size: 30px;">Review {{userData.first_name + " " + userData.last_name}}</v-card-title>
            <v-row>
                <v-chip style="margin-left: 20px;" outlined>
                    <v-icon style="margin-left: 5px; margin-right: 5px; padding: 0;" v-for="num in [1,2,3,4,5]" :key="num" color="starColor" v-on:click="setStar(num)">{{rating >= num ? 'mdi-star' : 'mdi-star-outline'}}</v-icon>
                </v-chip>
                <span style="margin-left: 20px;">{{rating}} {{rating > 1 ? 'stars' : 'star'}}</span>
            </v-row>
            <v-row>
                <v-textarea required :rules="value => !!value || 'Required.'" outlined style="margin: 0; padding: 10px;" type="text" label="Review" placeholder="Share some words about your experience" v-model="review"></v-textarea>
            </v-row>
            <v-row>
                <v-btn color="success" v-on:click="addReviews()">
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

export default {
    data: () => ({
    rating:1,
    review: '',
    teacherID: '',
  }),

    props: ['userData', 'submit', 'cancel'],

    methods: {
    ...mapActions(['createSnackbar', 'newReview']),

    addReviews: async function() {
        try {
            await this.newReview({rating: this.rating, review: this.review, teacherID: this.userData.id})
            this.createSnackbar({message: 'Review added', color:'success'})
            this.submit()
        }catch(error){
            this.createSnackbar({message: 'Problem adding review', color: 'error'})
        }
    },

    async setStar(num) {
        this.rating = num
    },

  }

};

</script>