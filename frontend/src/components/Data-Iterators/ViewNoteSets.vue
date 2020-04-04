<template>
  <v-content>

    <v-list>
      <v-list-item :v-for="item in noteSets" v-bind:key="item.id">
        {{item.title}}
      </v-list-item>
    </v-list>

  </v-content>
</template>



<script>
import axios from "axios"

export default {
  name: 'App',

  mounted() {
  },

  components: {
  },

  data: () => ({
    noteSets: [],
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

  }

};

</script>