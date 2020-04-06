<template>
    <v-content style="margin: 20px;">
        <h1>Add a Review</h1>
        <v-btn v-if="star1yellow" color="yellow" v-on:click="set1star()" rating="1">
            <v-icon>mdi-star-outline</v-icon>
        </v-btn>
        <v-btn v-if="!star1yellow" color="white" v-on:click="set1star()" >
            <v-icon>mdi-star-outline</v-icon>
        </v-btn>

        <v-btn v-if="star2yellow" color="yellow" v-on:click="set2star()" >
            <v-icon>mdi-star-outline</v-icon>
        </v-btn>
        <v-btn v-if="!star2yellow" color="white" v-on:click="set2star()" >
            <v-icon>mdi-star-outline</v-icon>
        </v-btn>

        <v-btn v-if="star3yellow" color="yellow" v-on:click="set3star()" >
            <v-icon>mdi-star-outline</v-icon>
        </v-btn>
        <v-btn v-if="!star3yellow" color="white" v-on:click="set3star()" >
            <v-icon>mdi-star-outline</v-icon>
        </v-btn>

        <v-btn v-if="star4yellow" color="yellow" v-on:click="set4star()" >
            <v-icon>mdi-star-outline</v-icon>
        </v-btn>
        <v-btn v-if="!star4yellow" color="white" v-on:click="set4star()" >
            <v-icon>mdi-star-outline</v-icon>
        </v-btn>

        <v-btn v-if="star5yellow" color="yellow" v-on:click="set5star()" >
            <v-icon>mdi-star-outline</v-icon>
        </v-btn>
        <v-btn v-if="!star5yellow" color="white" v-on:click="set5star()" >
            <v-icon>mdi-star-outline</v-icon>
        </v-btn>

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
        star1yellow: false,
      star2yellow: false,
      star3yellow: false,
      star4yellow: false,
      star5yellow: false,
  }),

    props: ['id'],

    methods: {
    ...mapActions(['createSnackbar', 'newReview']),

        addReviews: async function() {
        try {
            if(this.star5yellow) {
                this.rating = 5
            }
            else if(this.star4yellow) {
                this.rating = 4
            }
            else if(this.star3yellow) {
                this.rating = 3
            }
            else if(this.star2yellow) {
                this.rating = 2
            }
            else {
                this.rating = 1
            }
            await this.newReview({rating: this.rating, review: this.review, teacherID: parseInt(this.id)})
            this.createSnackbar({message: 'Review added', color:'success'})
        }catch(error){
            this.createSnackbar({message: 'Problem adding review', color: 'error'})
        }
    },
        async set1star() {
            this.star1yellow= true
      this.star2yellow= false
      this.star3yellow= false
      this.star4yellow= false
      this.star5yellow= false
        },

        async set2star() {
            this.star1yellow= true
      this.star2yellow= true
      this.star3yellow= false
      this.star4yellow= false
      this.star5yellow= false
        },

        async set3star() {
            this.star1yellow= true
      this.star2yellow= true
      this.star3yellow= true
      this.star4yellow= false
      this.star5yellow= false
        },

        async set4star() {
            this.star1yellow= true
      this.star2yellow= true
      this.star3yellow= true
      this.star4yellow= true
      this.star5yellow= false
        },

        async set5star() {
            this.star1yellow= true
      this.star2yellow= true
      this.star3yellow= true
      this.star4yellow= true
      this.star5yellow= true
        },
  }

};

</script>