<template>
  <v-content>

    <v-list two-line>
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
          console.log(response.data)
          this.noteSets=response.data;
        })
      .catch((err) => {
        console.error(err);
      })
    },

  }

};

</script>