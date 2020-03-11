<template>
<v-content>
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
        <ViewAvails :availabilities="availabilities"/>
      </v-container>
    </v-tab-item>
    <v-tab-item>
      <ViewNoteSets/>
    </v-tab-item>
    <v-tab-item>
      <ViewEvents/>
    </v-tab-item>
  </v-tabs-items>
</v-content>
</template>

<script>
  import axios from "axios"
  import ViewAvails from "./ViewAvails"
  import ViewNoteSets from "./ViewNoteSets"
  import ViewEvents from "./ViewEvents"

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
		props: ['userData'],

    components: {
      ViewAvails,
      ViewNoteSets,
      ViewEvents
    },

		methods: {
			getAvailabilities: function () {
				axios.get('/api/availability/?userID=' + this.userData.id + "/")
						.then((response) => {
							console.log(response.data)
							this.availabilities = response.data
						})
						.catch((err) => {
							console.error(err.response)
						})
			}
		}
  }
</script>