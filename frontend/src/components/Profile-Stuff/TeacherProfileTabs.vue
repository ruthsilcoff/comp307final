<template>
<v-container fluid>
  <v-tabs
    v-model="tab"
    background-color="transparent"
    color="primary"
    grow
  >
    <v-tab
      v-for="item in items"
      :key="item"
    >
      {{ item }}
    </v-tab>
  </v-tabs>

  <v-tabs-items v-model="tab">
    <v-tab-item>
      <v-container max-width="200px">
        <v-btn large v-on:click="AddAvailability">
              AddAvailability
        </v-btn>
        <ViewAvails :userData="userData" :availabilities="availabilities"/>
      </v-container>
    </v-tab-item>
    <v-tab-item>
      <ViewNoteSets/>
    </v-tab-item>
    <v-tab-item>
      <ViewEvents/>
    </v-tab-item>
  </v-tabs-items>
</v-container>
</template>

<script>
  import axios from "axios"
  import ViewAvails from "./ViewAvails"
  import ViewNoteSets from "../Data-Iterators/ViewNoteSets"
  import ViewEvents from "../Data-Iterators/ViewEvents"

	export default {
    data: () => ({
      tab: null,
			items: [
				'Lessons',
        'Note Sets',
        'Attending Events'
			],
			availabilities: [],
			noteSets: [],
    }),

		props: ['userData', 'onRequestLesson', 'AddAvailability'],

    components: {
      ViewAvails,
      ViewNoteSets,
      ViewEvents
    },

    mounted() {
      this.getAvailabilities()
    },

		methods: {
			getAvailabiliti: function () {
				axios.get('/api/availability/?userID=' + this.userData.id + "/")
						.then((response) => {
							console.log(response.data)
							this.availabilities = response.data
						})
						.catch((err) => {
							console.error(err.response)
						})
			},

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