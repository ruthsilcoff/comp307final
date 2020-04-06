<template>
<v-container fluid>
  <v-tabs
    v-model="tab"
    background-color="transparent"
    color="primary"
    grow
  >
    <v-tab >
      Availabilities
    </v-tab>
    <v-tab >
      Note Sets
    </v-tab>
    <v-tab v-if="!isViewing">
      Lessons booked
    </v-tab>
    <v-tab v-if="!isViewing">
      Lesson Requests
    </v-tab>
    <v-tab>
      Reviews
    </v-tab>
  </v-tabs>

  <v-tabs-items v-model="tab">

    <v-tab-item>
      <v-container max-width="200px">
        <router-link v-if="!isViewing" to="/addAvailability">
          <v-btn color="success" large>
            AddAvailability
          </v-btn>
        </router-link>
        <ViewAvails :userData="userData" />
      </v-container>
    </v-tab-item>

    <v-tab-item>
      <router-link v-if="!isViewing" to="/newNoteSet">
          <v-btn color="success" large>
            Add Note Set
          </v-btn>
        </router-link>
      <ViewNoteSets/>
    </v-tab-item>

    <v-tab-item v-if="!isViewing">
      <ViewBooked/>
    </v-tab-item>

    <v-tab-item v-if="!isViewing">
      <ViewRequests/>
    </v-tab-item>

    <v-tab-item>
      <v-btn  v-if="isViewing && !addingReview" color="success" large v-on:click="addingReview = true">
        Add Review
      </v-btn>
      <NewReview v-if="addingReview" :id="userData.id"/>
      <ViewReviews :userData="userData" :submitReview="submitReview" />
    </v-tab-item>

  </v-tabs-items>
</v-container>
</template>

<script>
  import axios from "axios"
  import {mapGetters, mapActions} from 'vuex'
  import ViewAvails from "./ViewAvails"
  import ViewNoteSets from "../Data-Iterators/ViewNoteSets"
  import ViewRequests from "./ViewRequests"
  import ViewBooked from "./ViewBookedTeacher"
  import ViewReviews from "./ViewReviews"
  import NewReview from "../Data-Iterators/NewReview"

	export default {
    data: () => ({
      addingReview: false,
      tab: null,
			items: [
				'Availabilities',
        'Note Sets',
        'Lessons Booked',
                    'Lesson Requests',
                    'Reviews',
			],
			availabilities: [],
			noteSets: [],
    }),

		props: ['userData', 'onRequestLesson', 'AddAvailability', 'requests'],

    components: {
      NewReview,
      ViewAvails,
      ViewNoteSets,
      ViewBooked,
      ViewRequests,
      ViewReviews,
    },

    mounted() {
    },

    computed: {
      ...mapGetters(['isViewing', 'availabilitiesGetter', 'tutoringSessionsGetter', 'availabilitiesOneTeacher']),
    },

		methods: {
      submitReview() {
        this.addingReview= false
      }
    },

  }
</script>