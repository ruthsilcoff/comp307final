<template>
  <v-container max-width="200px">
    <v-data-iterator
      :items="availabilities"
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
            <v-card v-if="!item.booked">
              <v-card-title class="subheading font-weight-bold">{{ item.title }}</v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                <h3>Date:</h3>
                <h4>{{item.start}}</h4>
              </v-card-text>

              <v-btn v-if="!item.booked" color="success" text v-on:click="requestLesson(item)">
                    Request
              </v-btn>
              <v-btn disabled v-if="item.booked === 'pending'" color="grey" text>
                    Pending
              </v-btn>
              <v-btn v-if="item.booked === 'confirmed'" color="success" text>
                    Booked
              </v-btn>
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
      ...mapGetters(['availabilitiesOneTeacher']),
      availabilities() {
        return this.availabilitiesOneTeacher(this.userData.id)
      },

      numberOfPages () {
        return Math.ceil(this.availabilities.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== `Name`)
      },
    },

		methods: {
      ...mapActions(['bookLesson', 'createSnackbar']),
      async requestLesson(item) {
        try {
          await this.bookLesson({availabilityID: item.id, tutorID: this.userData.id})
          this.createSnackbar({message: 'lesson requested!', color: 'success', mode: ''})
        }catch(error) {
          this.createSnackbar({message: 'problem requesting lesson', color: 'error', mode: ''})
        }

      },
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
    },

	}
</script>