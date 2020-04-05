<template>
<v-content v-if="this.theSet" style="margin: 50px;">
  <h1>{{this.theSet.title}}</h1>
  <h2>{{this.theSet.description}}</h2>

  <v-img v-for="item in theSet.content" v-bind:key="item.id" :src="item.content" max-height="200px" max-width="200px"></v-img>

</v-content>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import axios from "axios"

export default {

	data: () => ({

  }),

	props: ['id'],

  components: {
  },

  computed: {
		...mapGetters(['oneNoteSet'
    ]),

    theSet: function () {
			console.log(this.id)
      return this.oneNoteSet(parseInt(this.id))
    },
  },

  mounted(){

  },

  methods: {
    ...mapActions([''])

  },

}

</script>

<style scoped>



</style>