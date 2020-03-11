<template>
  <v-app>
    <v-content>
      <v-container height="400px">
        <div class="addAvailabilitySection">
          <h1>Add an availability</h1>

          <v-text-field label="Name" v-model="nameInput">Debate Lesson</v-text-field>

          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="startDate"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="startDate"
                  label="Start date"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="startDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>

          <v-btn class="mx-2" fab dark color="primary" v-on:click="addAvailability()">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </div>

        <v-card max-width="500" class="mx-auto">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Availabilities</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-list>
            <v-list-item
              v-for="item in availabilities"
              :key="item.title"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
              <v-list-item-title v-text="item.start"></v-list-item-title>
            </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios"
import Header from "./Header"

export default {
  name: 'App',

  mounted() {
    this.getAvailabilities()
  },

  components: {
  },

  data: () => ({
    availabilities: [],
    nameInput:'',
    startDate: null,
    menu: false,
    modal: false,
    menu2: false,
  }),

  methods: {
    getAvailabilities: function() {
      axios.get('/api/availability/')
        .then((response) => {
          this.availabilities=response.data;
        })
      .catch((err) => {
        console.error(err);
      })
    },

    addAvailability: function() {
      axios.post('/api/availability/', {name:this.nameInput})
        .then((response) => {
          this.availabilities.push(response.data)
        })
      .catch((err) => {
        console.error(err);
      })
    }
  }

};

</script>
