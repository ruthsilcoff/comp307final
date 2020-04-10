<template>
  <v-container max-width="200px">
    <v-navigation-drawer v-if="this.editingAvail"

    v-model="tempLeftGetSet"
      app
      clipped
      left
      width="250px"
      mobile-break-point="500px"
      overlay-color="secondary"
      disable-resize-watcher
    >
       <EditAvailability :avail="availabilities" :id="toEdit" :cancelEdit="cancelEdit"
                         :onSuccessfulEdit="onSuccessfulEdit"/>
  </v-navigation-drawer>

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
            <v-card v-if="!item.isFull">
              <v-card-title class="subheading font-weight-bold">{{ item.title }}</v-card-title>

              <v-divider></v-divider>

              <v-card-text>
                <h3>Date:</h3>
                <h4>{{item.start}}</h4>
                <v-divider></v-divider>
                <h3>Class Size: {{item.classSize}}</h3>
                <h4 v-if="item.studentsTaking">Enrollment: {{item.studentsTaking}}</h4>

              </v-card-text>

                <v-row v-if="!isViewing">
                  <v-btn color="secondary" style="font-size: 10px;" v-on:click="editAvail(item.id)">
                    <v-icon>mdi-pencil</v-icon>Edit
                  </v-btn>
                  <v-btn color="error" style="font-size: 10px;" v-on:click="cancelAvail(item)">Close Enrollment</v-btn>
                </v-row>


              <v-btn v-if="item.booked === 'none'" color="success" text v-on:click="requestLesson(item)">
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
  import EditAvailability from "./EditAvailability";

  export default {

    mounted() {
      this.changeTempLeft(true)
    },

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
            editingAvail: false,
            toEdit: '',
		}),

    props: ['userData'],

    components: {
    EditAvailability,
   },

		computed: {
      ...mapGetters(['availabilitiesOneTeacher', 'isViewing']),
      availabilities() {
        return this.availabilitiesOneTeacher(this.userData.id).filter(avail => !avail.isFull)
      },
      numberOfPages () {
        return Math.ceil(this.availabilities.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== `Name`)
      },
      tempLeftGetSet: {
        get() {
          return this.tempLeftGetter
        },
        set(value) {
          return this.changeTempLeft(value)
        }
      },
    },

		methods: {
      ...mapActions(['bookLesson', 'createSnackbar', 'closeLesson', 'changeTempLeft']),
      async requestLesson(item) {
        try {
          await this.bookLesson({availabilityID: item.id, tutorID: this.userData.id})
          this.createSnackbar({message: 'lesson requested!', color: 'success'})
        }catch(error) {
          console.log(error)
          this.createSnackbar({message: 'problem requesting lesson', color: 'error'})
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
    onSuccessfulEdit: async function () {
      this.editingAvail = false
    },
    cancelEdit: function () {
      this.editingAvail = false
    },
      editAvail(id) {
        this.editingAvail = !this.editingAvail;
        this.toEdit = id
      },
      async cancelAvail(item) {
        try {
          await this.closeLesson({id: item.id})
          this.createSnackbar({message: 'Lesson Closed', color: 'success'})
        }catch(error) {
           console.log(error)
          this.createSnackbar({message: 'problem closing lesson', color: 'error'})
        }
      },
    },

	}
</script>