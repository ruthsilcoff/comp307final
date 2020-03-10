<template>
  <v-container fluid >
    <v-data-iterator
      :items="subjects"
      :items-per-page.sync="itemsPerPage"
      :page="pageNumber"
      :search="subjectInput"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          dark
          color='#008989'
          class="mb-1"
        >
          <v-text-field
            v-model="subjectInput"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-search"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="cyan"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="cyan"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template>
        <v-row>
          <v-col
            v-for="item in subjects"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{ item.name }}</v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item
                  v-for="(key, index) in filteredKeys"
                  :key="index"
                >
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }">{{ key }}:</v-list-item-content>
                  <v-list-item-content class="align-end" :class="{ 'blue--text': sortBy === key }">{{ item[key.toLowerCase()] }}</v-list-item-content>
                </v-list-item>
              </v-list>
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
                color="cyan"
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
            Page {{ pageNumber }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color='#003f3f'
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color='#003f3f'
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
import Header from "./Header"

export default {
  name: 'App',

  mounted() {
    this.getSubjects()
  },

  components: {
  },

  data: () => ({
    subjects: [],
    subjectInput:'',
    itemsPerPageArray: [4, 8, 12],
    sortDesc: false,
    pageNumber: 1,
    itemsPerPage: 4,
    sortBy: 'name',
    keys: ['Name',]
  }),

	computed: {
      numberOfPages () {
        return Math.ceil(this.subjects.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== `Name`)
      },
    },

  methods: {
    getSubjects: function() {
      axios.get('/api/subject/')
        .then((response) => {
          this.subjects=response.data;
        })
      .catch((err) => {
        console.error(err);
      })
    },

    nextPage () {
        if (this.pageNumber + 1 <= this.numberOfPages) this.pageNumber += 1
      },
      formerPage () {
        if (this.pageNumber - 1 >= 1) this.pageNumber -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },

    addSubjects: function() {
      axios.post('/api/subject/', {name:this.subjectInput})
        .then((response) => {
          this.subjects.push(response.data)
        })
      .catch((err) => {
        console.error(err);
      })
    }
  }

};

</script>
<style>
* i{ font-family: 'Material Icons'; }
</style>