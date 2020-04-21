<template>
  <v-container>
    <h1>View All Courses:</h1>

    <v-switch
      v-model="rainbowSwitch"
      label="Rainbow mode"
    ></v-switch>

    <v-data-iterator
      :items="courses"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row
          v-for="item in props.items"
          :key="item.name"
        >
          <v-col

            cols="12"
            sm="12"
            md="12"
            lg="12"
          >
            <v-card style="position: relative !important;" :id="rainbowSwitch ? 'courseCardRainbow' : 'courseCard'">

              <v-row align="center" justify="end" style="margin-right: 20px">

                <v-card-title style="color:black; margin-right: 20px; position: absolute !important; left: 0; top: 0; font-size: 40px;"> {{item.name}}</v-card-title>
                <v-card-subtitle style="color:black; margin-right: 20px; position: absolute !important; left: 0; top: 100px; font-size: 20px;">{{item.description}}</v-card-subtitle>

                <v-card style="margin: 10px;">
                  <v-card-title>Teachers:</v-card-title>
                  <ViewTeachersOfSubject :course="item"/>
                </v-card>
                <v-card style="margin: 10px;">
                  <v-card-title>Upcoming Lessons:</v-card-title>
                  <ViewLessonsOfSubject :course="item"/>
                </v-card>
                <v-card style="margin: 10px;">
                  <v-card-title>Recent Note Sets:</v-card-title>
                  <ViewNoteSetsOfSubject :course="item"/>
                </v-card>
              </v-row>
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
  import ViewTeachersOfSubject from "./ViewTeachersOfSubject"
  import ViewLessonsOfSubject from "./ViewLessonsOfSubject"
  import ViewNoteSetsOfSubject from "./ViewNoteSetsOfSubject"
  import {mapGetters, mapActions} from 'vuex'


  export default {
    components: {
      ViewTeachersOfSubject,
      ViewLessonsOfSubject,
      ViewNoteSetsOfSubject,
    },

    data: () => ({
      rainbowSwitch: false,
			itemsPerPageArray: [4, 8, 12],
			search: '',
			filter: {},
			sortDesc: false,
			page: 1,
			itemsPerPage: 4,
      keys: ['name']
		}),

    props: [],

		computed: {
      ...mapGetters(['subjectsGetter']),
      courses() {
        return this.subjectsGetter
      },
      numberOfPages () {
        return Math.ceil(this.courses.length / this.itemsPerPage)
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
		},


	}
</script>

<style scoped>

#courseCard {
  background-image: linear-gradient(to bottom right, #34acff, #8cf8ff);
}

#courseCardRainbow {
  animation-name: messengerBackground;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes messengerBackground {
  0% {
    background-color: #00d3ff;
  }
  20% {
    background-color: #7950ff;
  }
  40% {
    background-color: #de0007;
  }
  60% {
    background-color: #ffc500;
  }
  80% {
    background-color: #83ff15;
  }
  100% {
    background-color: #00d3ff;
  }
}

</style>