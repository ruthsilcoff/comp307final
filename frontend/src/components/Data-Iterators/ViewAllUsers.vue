<template>
<v-content style="margin-right: 50px" >
  <h1>View All Users:</h1>
  <v-data-iterator
      :items="allUsers"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-desc="sortDesc"
      hide-default-footer
  >
    <template v-slot:default="props">
    <v-row>
      <v-col
          v-for="item in props.items"
          :key="item.id"
          cols="12"
          sm="12"
          md="4"
          lg="2"
      >
        <v-card>
          <v-card-subtitle>{{ item.first_name }} {{ item.last_name }}</v-card-subtitle>


          <v-card-text>
            <h1 v-if="item.profile.isTeacher">Teacher</h1>
            <h1 v-if="!item.profile.isTeacher">Student</h1>
            <h3>Bio: {{ item.profile.bio}}</h3>
            <h3>Country: {{ item.country}}</h3>

            <h3 v-if="item.profile.isTeacher">Subjects:</h3>
            <h4 v-if="item.profile.isTeacher">(subject list)</h4>
            <h3 v-if="item.profile.isTeacher">Rating:</h3>
            <h4 v-if="item.profile.isTeacher">(rating)</h4>
            <h3 v-if="item.profile.isTeacher">Price:</h3>
            <h4 v-if="item.profile.isTeacher">(price)</h4>
          </v-card-text>
          <router-link :to="'/profile/' + item.username">
            <v-btn color="secondary" text >View Profile
              <v-icon color="white" small>mdi-eye</v-icon>
            </v-btn>
          </router-link>

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

      <span class="mr-4 grey--text">
        Page {{ page }} of {{ numberOfPages }}
      </span>
      <v-btn fab dark color="secondary" class="mr-1" @click="formerPage">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn fab dark color="secondary" class="ml-1" @click="nextPage">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>
    </template>
  </v-data-iterator>
</v-content>
</template>

<script>
  import axios from "axios"
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data: () => ({
			itemsPerPageArray: [4, 8, 12],
			search: '',
			filter: {},
			sortDesc: false,
			page: 1,
			itemsPerPage: 4,
		}),

    props: [],

		computed: {
      ...mapGetters(['allUsers']),
      numberOfPages () {
        return Math.ceil(this.allUsers.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== `Name`)
      },
    },

		methods: {
      ...mapActions(['getAllUsers']),
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
      routeToProfile: function (username) {
        let path = '/profile/' + username
        this.$router.push(path)
      },


    },

    created() {
      this.getAllUsers()
    },

	}
</script>