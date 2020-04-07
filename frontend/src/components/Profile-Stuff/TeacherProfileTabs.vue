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
        <router-link v-if="!isViewing" to="/calendar">
          <v-btn color="success" large>
            <v-icon left>mdi-plus</v-icon>AddAvailability
          </v-btn>
        </router-link>
        <ViewAvails :userData="userData" />
      </v-container>
    </v-tab-item>

    <v-tab-item>
      <v-btn v-if="!isViewing && !addingNoteSet" v-on:click="openNewNoteSet" color="success" large>
        <v-icon left>mdi-plus</v-icon>Add Note Set
      </v-btn>
      <NewNoteSet v-if="addingNoteSet" :submit="submitNoteSet" :cancel="submitNoteSet"/>
      <ViewNoteSets/>
    </v-tab-item>

    <v-tab-item v-if="!isViewing">
      <ViewBooked/>
    </v-tab-item>

    <v-tab-item v-if="!isViewing">
      <ViewRequests/>
    </v-tab-item>

    <v-tab-item>
      <v-btn v-if="isViewing && !addingReview && !alreadyReviewed" color="success" large v-on:click="openNewReview">
        <v-icon left>mdi-plus</v-icon>Add Review
      </v-btn>
      <NewReview :submit="submit" :cancel="submit" v-if="addingReview" :userData="userData"/>
      <ViewReviews :userData="userData"/>
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
  import NewReview from "./NewReview"
  import NewNoteSet from "../Data-Iterators/NewNoteSet"

	export default {
    data: () => ({
      addingReview: false,
      addingNoteSet: false,
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
      NewNoteSet,
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
      ...mapGetters(['reviewOneTeacherOneUser', 'isViewing', 'availabilitiesGetter', 'tutoringSessionsGetter', 'availabilitiesOneTeacher']),
      alreadyReviewed() {
        if (this.reviewOneTeacherOneUser(this.userData.id)) {
          return true
        }
        else {
          return false
        }
      },
    },

		methods: {
      openNewReview() {
        this.addingReview = true
      },
      submit() {
        this.addingReview = false
      },
      openNewNoteSet() {
        this.addingNoteSet = true
      },
      submitNoteSet() {
        this.addingNoteSet = false
      },
    },

  }
</script>