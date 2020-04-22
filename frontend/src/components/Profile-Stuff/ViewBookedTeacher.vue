<template>
<v-container max-width="200px">
  <v-data-iterator
      :items="confirmedRequestsGetter"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
  >
    <template v-slot:default="props">
    <v-row>
      <v-col
          v-for="item in props.items"
          :key="item.id"
          cols="12"
          sm="6"
          md="16"
          lg="4"
      >
        <v-card>
          <v-card-title class="subheading font-weight-bold">{{ item.avail.title }}</v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <h3>Student: {{item.student.username}}</h3>
            <router-link :to="'/profile/' + item.student.username">
              <v-btn color="secondary" text style="margins:0;padding:0">View Profile
                <v-icon color="white" small>mdi-eye</v-icon>
              </v-btn>
            </router-link>
            <v-divider></v-divider>
            <h3>Date:</h3>
            <h4>{{item.avail.start}}</h4>
          </v-card-text>


        </v-card>
      </v-col>
    </v-row>
    </template>

    <template v-slot:footer>
    <v-row class="mt-2" align="center" justify="center">
      <span class="grey--text">Items per page</span>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
        <v-btn
            dark
            text
            color="primary"
            class="ml-2"
            v-on="on"
        >
          {{ itemsPerPage }}
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
        </template>
        <v-list>
          <v-list-item
              v-for="(number, index) in itemsPerPageArray"
              :key="index"
              @click="updateItemsPerPage(number)"
          >
            <v-list-item-title>{{ number }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>

      <span
          class="mr-4
            grey--text"
      >
            Page {{ page }} of {{ numberOfPages }}
          </span>
      <v-btn
          fab
          dark
          color="blue darken-3"
          class="mr-1"
          @click="formerPage"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
          fab
          dark
          color="blue darken-3"
          class="ml-1"
          @click="nextPage"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>
    </template>
  </v-data-iterator>
</v-container>
</template>

<script>
import axios from "axios"
import {mapGetters, mapActions} from 'vuex'

export default {
  data: () => ({
    requests: [],
    itemsPerPageArray: [4, 8, 12],
    search: '',
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 4,
    sortBy: 'duration',
    keys: [
      'Name',
      'Date',
      'Time',
      'Duration',
    ],
  }),

  props: ['userData'],

  computed: {
    ...mapGetters(['confirmedRequestsGetter']),
    numberOfPages() {
      return Math.ceil(this.confirmedRequestsGetter.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `Name`)
    },
  },

  methods: {
    ...mapActions(['createSnackbar']),
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },

  },

}
</script>