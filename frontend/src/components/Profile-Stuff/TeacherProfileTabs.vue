<template>
<v-container fluid>
  <v-tabs
    v-model="tab"
    background-color="transparent"
    color="primary"
    grow
  >
    <v-tab>
      Lesson Availabilities
    </v-tab>
    <v-tab>
      Note Sets
    </v-tab>
    <v-tab v-if="!isViewing">
    Lessons Booked
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
        <ViewAvails :userData="userData" :availabilities="availabilities"/>
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
      <ViewEvents/>
    </v-tab-item>

    <v-tab-item v-if="!isViewing">
      <ViewAvails :userData="userData" :availabilities="requests"/>
    </v-tab-item>

  </v-tabs-items>
</v-container>
</template>

<script>
  import axios from "axios"
  import {mapGetters, mapActions} from 'vuex'
  import ViewAvails from "./ViewAvails"
  import ViewNoteSets from "../Data-Iterators/ViewNoteSets"
  import ViewEvents from "../Data-Iterators/ViewEvents"

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
      ViewEvents
    },

    mounted() {
      this.getAvailabilities()
    },

    computed: {
      ...mapGetters(['isViewing', 'availabilitiesGetter', 'tutoringSessionsGetter', 'availabilitiesOneTeacher']),
    },

		methods: {
      getAvailabilities: function() {
          axios.get('/api/availability/')
            .then((response) => {
              console.log(response.data)
              this.availabilities=response.data;
            })
          .catch((err) => {
            console.error(err.response.data);
          })
    },

		},
  }
</script>