<template>
  <v-container max-width="200px">
    <v-data-iterator
      :items="tutoringSessions"
      :items-per-page.sync="itemsPerPage"
      :pagelength="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row>


            <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Session ID</th>
            <th class="text-left">Class</th>
            <th class="text-left">Date</th>
            <th class="text-left">Hours</th>
            <th class="text-left">Cost per hour</th>
            <th class="text-left">Total</th>
            <th class="text-left">Email to Pay</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in props.items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.avail.title}}</td>
            <td>{{ item.avail.start.toString()}}</td>
            <td>Duration</td>
            <td>{{ item.tutor.profile.rate}}</td>
            <td>Total</td>
            <td>{{item.tutor.email}}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
      ...mapGetters(['sessionsOneStudent']),

          tutoringSessions () {
              return this.sessionsOneStudent(this.userData.id)
          },

      numberOfPages () {
        return Math.ceil(this.tutoringSessions.length / this.itemsPerPage)
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