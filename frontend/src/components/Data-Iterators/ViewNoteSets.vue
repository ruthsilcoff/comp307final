<template>
  <v-content>

    <v-list>
      <v-list-item link v-for="item in noteSets" v-bind:key="item.id">
        <v-list-item-title>
          {{item.title}}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{item.description}}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

  </v-content>
</template>



<script>
import axios from "axios"

export default {
  name: 'App',

  mounted() {
    this.getNoteSets()
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