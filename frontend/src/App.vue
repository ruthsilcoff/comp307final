<template>
  <v-app>

    <v-content>
      <v-btn text icon color="pink">
              <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-text-field label="Regular" v-model="varietyInput"></v-text-field>
      <v-btn class="mx-2" fab dark color="indigo" v-on:click="addVariety()">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>

      <v-btn class="mx-2" fab dark color="teal">
        <v-icon dark>mdi-format-list-bulleted-square</v-icon>
      </v-btn>

      <v-btn class="mx-2" fab dark large color="cyan">
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>

      <v-btn class="mx-2" fab dark large color="purple">
        <v-icon dark>mdi-android</v-icon>
      </v-btn>

      <v-card
    max-width="500"
    class="mx-auto"
  >
    <v-toolbar
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Inbox</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list>
      <v-list-item
        v-for="item in varieties"
        :key="item.name"
      >
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>

      <Video/>
    </v-content>

  </v-app>
</template>

<script>
import axios from "axios"
import Video from "./components/Video"

export default {
  name: 'App',

  mounted() {
    this.getVarieties()
  },

  components: {
    Video,
  },

  data: () => ({
    varieties: [],
    varietyInput:''
  }),

  methods: {
    getVarieties: function() {
      axios.get('/api/variety/')
        .then((response) => {
          this.varieties=response.data;
        })
      .catch((err) => {
        console.error(err);
      })
    },

    addVariety: function() {
      axios.post('/api/variety/', {name:this.varietyInput})
        .then((response) => {
          this.varieties.push(response.data)
        })
      .catch((err) => {
        console.error(err);
      })
    }
  }

};

</script>
