<template>
  <v-container max-width="200px">
    <h1>View All Users:</h1>
    <v-data-iterator
      :items="userProfileList"
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
            sm="4"
            md="4"
            lg="4"
          >
            <v-card>
              <v-card-subtitle>{{ item.first_name }} {{ item.last_name }}</v-card-subtitle>


              <v-card-text>
                <h1 v-if="item.isTeacher === true">Teacher</h1>
                <h1 v-if="item.isTeacher === false">Student</h1>
                <h3>{{ item.bio}}</h3>
                <h3>{{ item.country}}</h3>

                <h3>Subjects:</h3>
                <h4>(subject list)</h4>
								<h3>Rating:</h3>
                <h4>(rating)</h4>
								<h3>Price:</h3>
                <h4>(price)</h4>
              </v-card-text>

              <v-btn color="success" text v-on:click="goToProfileOf(item.id)">
                    See lessons
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

  export default {
    data: () => ({
			users: [],
      userProfileList: [],
			itemsPerPageArray: [4, 8, 12],
			search: '',
			filter: {},
			sortDesc: false,
			page: 1,
			itemsPerPage: 4,
		}),

    props: ['goToProfileOf'],

		mounted() {
			this.getUsers()
		},

		computed: {
      numberOfPages () {
        return Math.ceil(this.userProfileList.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== `Name`)
      },
    },

		methods: {
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },

			getUsers() {
				axios.get('/api/user/')
        .then((response) => {
          this.users=response.data;
          this.userProfileList=response.data;
          this.getProfileData(response.data)
        })
        .catch((err) => {
          console.error(err.response.data);
        })
			},

      getProfileData: function (users) {
        for (let i=0; i<users.length; i++) {
          axios.get('/api/profile/' + users[i].id + "/")
            .then((response) => {
              this.userProfileList[i].isTeacher = response.data.isTeacher
              this.userProfileList[i].bio = response.data.bio
              this.userProfileList[i].country = response.data.country
              this.userProfileList[i].avatar = response.data.avatar
            })
            .catch((err) => {
              console.error(err.response.data)
            })
        }

		},

    },

	}
</script>