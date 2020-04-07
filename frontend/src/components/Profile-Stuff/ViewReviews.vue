<template>
  <v-container max-width="200px">
    <v-data-iterator
      :items="reviews"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          color="primary"
          class="mb-1"
        >
          <template v-if="$vuetify.breakpoint.mdAndUp">
          <span>Sort by:</span>
            <v-select
              style="max-width: 300px; margin-left: 20px;"
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="['rating', 'review']"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                style="margin: 0; padding: 0;"
                small
                depressed
                color="secondary"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                style="margin: 0; padding: 0;"
                small
                depressed
                color="secondary"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

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
              <v-chip :outlined="!$vuetify.theme.dark" color="greyChip">
                  <v-icon style="margin: 0; padding: 0;" v-for="num in [1,2,3,4,5]" :key="num" color="starColor">{{item.rating >= num ? 'mdi-star' : 'mdi-star-outline'}}</v-icon>
              </v-chip>
              <span style="margin-left: 10px; font-family: Arial; font-size: 14px;">{{item.rating}} {{item.rating > 1 ? 'stars' : 'star'}}</span>
              <v-divider></v-divider>

              <v-card-text>
                <h4>{{item.review}}</h4>
                <h5>Reviewed by: {{item.author.username}}</h5>
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
      search: '',
      filter: {},
      sortDesc: false,
      sortBy: 'rating',
			itemsPerPageArray: [12, 24, 48],
			page: 1,
			itemsPerPage: 12,
			keys: [
				'Rating',
				'Review',
				'Reviewer',
        'dateAdded',
			],
		}),

    props: ['userData'],

		computed: {
      ...mapGetters(['reviewsOneTeacher']),
      reviews () {
        return this.reviewsOneTeacher(this.userData.id)
      },
      numberOfPages () {
        return Math.ceil(this.reviews.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== `Name`)
      },
    },

		methods: {
      ...mapActions(['createSnackbar']),

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