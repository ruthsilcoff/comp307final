<template>
<v-container fluid>
  <v-tabs
    v-model="tab"
    background-color="transparent"
    color="primary"
    grow
  >
    <v-tab >
      Lesson Availabilities
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
  </v-tabs>

  <v-tabs-items v-model="tab">

    <v-tab-item>
      <v-container max-width="200px">
        <router-link v-if="!isViewing" to="/addAvailability">
          <v-btn large>
            AddAvailability
          </v-btn>
        </router-link>
        <ViewAvails :userData="userData" />
      </v-container>
    </v-tab-item>

    <v-tab-item>
      <router-link v-if="!isViewing" to="/newNoteSet">
          <v-btn large>
            Add Note Set
          </v-btn>
        </router-link>
      <ViewNoteSets/>
    </v-tab-item>

    <v-tab-item v-if="!isViewing">
    </v-tab-item>

    <v-tab-item v-if="!isViewing">
    </v-tab-item>

  </v-tabs-items>
</v-container>
</template>

<script>
  import axios from "axios"
  import {mapGetters, mapActions} from 'vuex'
  import ViewAvails from "./ViewAvails"
  import ViewNoteSets from "../Data-Iterators/ViewNoteSets"

	export default {
    data: () => ({
      tab: null,
			items: [
				'Lesson Availabilities',
        'Note Sets',
        'Lessons Booked',
                    'Lesson Requests'
			],
			availabilities: [],
			noteSets: [],
    }),

		props: ['userData', 'onRequestLesson', 'AddAvailability', 'requests'],

    components: {
      ViewAvails,
      ViewNoteSets,
    },

    mounted() {
    },

    computed: {
      ...mapGetters(['isViewing', 'availabilitiesGetter', 'tutoringSessionsGetter', 'availabilitiesOneTeacher']),
    },

		methods: {
    },

  }
</script>